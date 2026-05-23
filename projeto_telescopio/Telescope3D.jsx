// Telescope3D.jsx — interactive procedural telescope built with Three.js
// Props:
//   finish      'wireframe' (dark shell + bright edges) | 'blueprint' (no fill, dashed-looking, grid background) | 'hologram' (translucent glowing shells)
//   density     0..1 — drives star count, pulse intensity, edge brightness
//   edgeColor   CSS color string for the primary edge color (drives atmosphere retoning)
//   accentColor CSS color string for the spark stars
// Drag to rotate · scroll/zoom disabled · auto-rotates slowly when idle.

const Telescope3D = ({ finish = 'wireframe', density = 0.7, edgeColor = '#00d4cc', accentColor = '#ff8c42' }) => {
  const mountRef = React.useRef(null);
  // Keep density mutable without rebuilding the whole scene
  const densityRef = React.useRef(density);
  React.useEffect(() => { densityRef.current = density; }, [density]);

  React.useEffect(() => {
    if (!mountRef.current || !window.THREE) return;
    const THREE = window.THREE;
    const mount = mountRef.current;

    // ── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene + camera ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(4.6, 2.8, 6.5);
    camera.lookAt(0, 0.4, 0);

    // ── Material palette — driven by finish ────────────────────
    const edgeColorHex = new THREE.Color(edgeColor);
    const accentColorHex = new THREE.Color(accentColor);
    // Pick a dim variant for soft lines — desaturate edgeColor toward dark
    const edgeSoft = edgeColorHex.clone().multiplyScalar(0.32);

    // shellMat — the body fill of solid parts
    // edgeMat — bright primary edges
    // edgeDimMat — softer secondary edges
    let shellMat, edgeMat, edgeDimMat, isBlueprint, isHologram, isAnimate;

    isBlueprint = finish === 'blueprint';
    isHologram = finish === 'hologram';
    isAnimate = finish === 'animate';

    if (isAnimate) {
      // ANIMATE — additive throughout. Per-frame tick mutates opacities
      // to morph blueprint → hologram → wireframe in a continuous loop.
      shellMat = new THREE.MeshBasicMaterial({
        color: edgeColorHex.clone().multiplyScalar(0.85),
        transparent: true,
        opacity: 0,                   // starts invisible — fades in during phase
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      edgeMat = new THREE.LineBasicMaterial({
        color: edgeColorHex.clone().lerp(new THREE.Color(0xffffff), 0.20),
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      edgeDimMat = new THREE.LineBasicMaterial({
        color: edgeColorHex,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
    } else if (isBlueprint) {
      // BLUEPRINT — no fill, only edges. Reads as a technical diagram.
      shellMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0, depthWrite: false });
      edgeMat = new THREE.LineBasicMaterial({ color: edgeColorHex, transparent: true, opacity: 0.95 });
      edgeDimMat = new THREE.LineBasicMaterial({ color: edgeColorHex, transparent: true, opacity: 0.32 });
    } else if (isHologram) {
      // HOLOGRAM — translucent shells with additive glow + bright edges.
      shellMat = new THREE.MeshBasicMaterial({
        color: edgeColorHex.clone().multiplyScalar(0.85),
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      edgeMat = new THREE.LineBasicMaterial({
        color: edgeColorHex.clone().lerp(new THREE.Color(0xffffff), 0.25),
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
      });
      edgeDimMat = new THREE.LineBasicMaterial({
        color: edgeColorHex,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
      });
    } else {
      // WIREFRAME (default) — dark shell + glowing edge lines.
      shellMat = new THREE.MeshBasicMaterial({ color: 0x0a1f38, transparent: true, opacity: 0.92 });
      edgeMat = new THREE.LineBasicMaterial({ color: edgeColorHex, transparent: true, opacity: 0.85 });
      edgeDimMat = new THREE.LineBasicMaterial({ color: edgeSoft, transparent: true, opacity: 0.65 });
    }

    // Helper: wraps a solid mesh + its edge lines into a Group
    const wireShell = (geo, material = shellMat, lineMaterial = edgeMat) => {
      const g = new THREE.Group();
      const mesh = new THREE.Mesh(geo, material);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 18), lineMaterial);
      g.add(mesh, edges);
      return g;
    };

    // ── ROOT GROUP — everything in one node so we can spin it ──
    const root = new THREE.Group();
    scene.add(root);

    // ── Blueprint grid plane (visible in blueprint + animate modes) ──
    let gridGroup = null;
    let gridMat = null;
    if (isBlueprint || isAnimate) {
      gridGroup = new THREE.Group();
      gridMat = new THREE.LineBasicMaterial({ color: edgeColorHex, transparent: true, opacity: 0.10 });
      const gridSize = 8;
      const gridStep = 0.5;
      for (let i = -gridSize; i <= gridSize; i += gridStep) {
        const v = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i, -gridSize, -3), new THREE.Vector3(i, gridSize, -3),
        ]);
        const h = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-gridSize, i, -3), new THREE.Vector3(gridSize, i, -3),
        ]);
        gridGroup.add(new THREE.Line(v, gridMat));
        gridGroup.add(new THREE.Line(h, gridMat));
      }
      scene.add(gridGroup);
    }

    // ── TELESCOPE ASSEMBLY ─────────────────────────────────────
    const tele = new THREE.Group();
    root.add(tele);

    // Main tube — horizontal cylinder
    const tube = wireShell(new THREE.CylinderGeometry(0.55, 0.55, 3.0, 32, 1, true));
    tube.rotation.z = Math.PI / 2;
    tube.position.set(0, 1.6, 0);
    tele.add(tube);

    // Tube cap rings (front + back) — visible because tube is open
    const ringFront = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 64 }, (_, i) => {
          const a = (i / 64) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0);
        })
      ),
      edgeMat
    );
    ringFront.position.set(1.5, 1.6, 0);
    ringFront.rotation.y = Math.PI / 2;
    tele.add(ringFront);

    const ringBack = ringFront.clone();
    ringBack.position.set(-1.5, 1.6, 0);
    tele.add(ringBack);

    // Lens (front) — inner ring at the objective end
    const lensRing = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 48 }, (_, i) => {
          const a = (i / 48) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0);
        })
      ),
      new THREE.LineBasicMaterial({ color: edgeColorHex, transparent: true, opacity: 0.55 })
    );
    lensRing.position.set(1.51, 1.6, 0);
    lensRing.rotation.y = Math.PI / 2;
    tele.add(lensRing);

    // Crosshair inside the front lens (subtle alignment reticle)
    const crossGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -0.42), new THREE.Vector3(0, 0, 0.42),
      new THREE.Vector3(0, -0.42, 0), new THREE.Vector3(0, 0.42, 0),
    ]);
    const cross = new THREE.LineSegments(
      crossGeom,
      new THREE.LineBasicMaterial({ color: edgeColorHex, transparent: true, opacity: 0.35 })
    );
    cross.position.set(1.52, 1.6, 0);
    tele.add(cross);

    // Decorative bands on the tube (3 thin rings)
    [-0.7, 0, 0.8].forEach((x) => {
      const band = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 48 }, (_, i) => {
            const a = (i / 48) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a) * 0.56, Math.sin(a) * 0.56, 0);
          })
        ),
        edgeDimMat
      );
      band.position.set(x, 1.6, 0);
      band.rotation.y = Math.PI / 2;
      tele.add(band);
    });

    // Eyepiece (small tube sticking out the top-back)
    const eyepiece = wireShell(new THREE.CylinderGeometry(0.18, 0.18, 0.55, 24, 1, true));
    eyepiece.position.set(-0.9, 2.25, 0);
    tele.add(eyepiece);

    // Eyepiece cap
    const eyeCap = wireShell(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24));
    eyeCap.position.set(-0.9, 2.55, 0);
    tele.add(eyeCap);

    // Finder scope (small parallel tube on top)
    const finder = wireShell(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 20, 1, true));
    finder.rotation.z = Math.PI / 2;
    finder.position.set(0.3, 2.3, 0);
    tele.add(finder);

    // Finder mounting clamps
    [-0.1, 0.7].forEach((x) => {
      const clamp = wireShell(new THREE.BoxGeometry(0.05, 0.5, 0.08));
      clamp.position.set(x, 2.0, 0);
      tele.add(clamp);
    });

    // Mount yoke — vertical piece connecting tube to tripod
    const yoke = wireShell(new THREE.BoxGeometry(0.42, 0.8, 0.42));
    yoke.position.set(0, 1.0, 0);
    tele.add(yoke);

    // ── TRIPOD ────────────────────────────────────────────────
    const tripod = new THREE.Group();
    root.add(tripod);

    // Top hub
    const hub = wireShell(new THREE.CylinderGeometry(0.32, 0.32, 0.18, 12));
    hub.position.set(0, 0.55, 0);
    tripod.add(hub);

    // Three legs
    const legAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
    legAngles.forEach((angle) => {
      const leg = new THREE.Group();
      const cyl = wireShell(
        new THREE.CylinderGeometry(0.06, 0.045, 2.2, 8),
        shellMat,
        edgeDimMat
      );
      cyl.position.set(0, -1.1, 0);
      leg.add(cyl);

      // Foot cap
      const foot = wireShell(
        new THREE.CylinderGeometry(0.08, 0.08, 0.07, 8),
        shellMat,
        edgeDimMat
      );
      foot.position.set(0, -2.2, 0);
      leg.add(foot);

      // Lean the leg outward
      leg.rotation.x = Math.sin(angle) * 0.32;
      leg.rotation.z = Math.cos(angle) * -0.32;
      leg.position.set(0, 0.5, 0);
      tripod.add(leg);
    });

    // Spreader (cross-braces between legs at mid-height)
    const braceY = -0.4;
    const braceR = 0.5;
    for (let i = 0; i < 3; i++) {
      const a1 = legAngles[i];
      const a2 = legAngles[(i + 1) % 3];
      const p1 = new THREE.Vector3(Math.cos(a1) * braceR, braceY, Math.sin(a1) * braceR);
      const p2 = new THREE.Vector3(Math.cos(a2) * braceR, braceY, Math.sin(a2) * braceR);
      const brace = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([p1, p2]),
        edgeDimMat
      );
      tripod.add(brace);
    }

    // ── DECORATIVE STARS — count & intensity driven by density tweak
    const starGroup = new THREE.Group();
    // Base set of stars (always present at minimum opacity)
    const baseStars = [
      [-3.0,  3.2, -1.5, edgeColorHex.getHex()],
      [ 3.2,  3.0, -2.0, 0xffffff],
      [-3.5,  0.5,  1.2, 0xffffff],
      [ 3.4, -0.2,  0.8, accentColorHex.getHex()],
      [-2.0, -1.4, -2.2, edgeColorHex.getHex()],
      [ 2.0,  3.6,  1.6, 0xa8d8ea],
    ];
    // Extra stars that materialise at higher density (deterministic seed)
    const extraStars = [];
    const seed = (n) => {
      const x = Math.sin(n * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 24; i++) {
      const r = 3.6 + seed(i * 7) * 1.8;
      const t1 = seed(i * 11) * Math.PI * 2;
      const t2 = (seed(i * 13) - 0.5) * Math.PI * 0.9;
      const colorPick = [edgeColorHex.getHex(), 0xffffff, accentColorHex.getHex(), 0xa8d8ea][Math.floor(seed(i * 17) * 4)];
      extraStars.push([
        r * Math.cos(t2) * Math.cos(t1),
        r * Math.sin(t2),
        r * Math.cos(t2) * Math.sin(t1),
        colorPick,
        seed(i * 19) * 0.04 + 0.02, // size
      ]);
    }
    [...baseStars, ...extraStars].forEach(([x, y, z, color, size]) => {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(size || 0.04, 8, 8),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.9,
          blending: isHologram ? THREE.AdditiveBlending : THREE.NormalBlending,
        })
      );
      star.position.set(x, y, z);
      star.userData.baseSize = size || 0.04;
      starGroup.add(star);
    });
    scene.add(starGroup);

    // ── PART WRAPPING — wrap every child of tele in its own Group so we can
    // scale each part independently (per-part assembly animation). Sort
    // by Y position so the assembly reads bottom-up: tripod first, then
    // body, then accessories on top.
    let wrappedParts = [];
    if (isAnimate) {
      const childrenSorted = [...tele.children].sort((a, b) => {
        // Use the part's position.y as a proxy for "height" — braces stay
        // near 0 (hub level), legs near 0.5, tube at 1.6, eyepiece highest.
        return (a.position.y || 0) - (b.position.y || 0);
      });
      wrappedParts = childrenSorted.map((child) => {
        const wrap = new THREE.Group();
        wrap.position.copy(child.position);
        wrap.rotation.copy(child.rotation);
        wrap.scale.copy(child.scale);
        child.position.set(0, 0, 0);
        child.rotation.set(0, 0, 0);
        child.scale.set(1, 1, 1);
        tele.remove(child);
        wrap.add(child);
        wrap.scale.setScalar(0);    // start invisible — assembly will scale up
        tele.add(wrap);
        return wrap;
      });
    }

    // ── CONTROLS — custom drag-to-rotate (no OrbitControls dep) ──
    // Camera orbits a target on a sphere. We track theta (azimuth) and
    // phi (polar), damp them, and let user pointer-drag override autoRotate.
    const target = new THREE.Vector3(0, 0.8, 0);
    const radius = camera.position.distanceTo(target);
    let theta = Math.atan2(camera.position.x - target.x, camera.position.z - target.z);
    let phi = Math.acos((camera.position.y - target.y) / radius);
    let thetaTarget = theta;
    let phiTarget = phi;

    const PHI_MIN = Math.PI * 0.18;
    const PHI_MAX = Math.PI * 0.78;
    const DAMPING = 0.12;
    const AUTO_SPEED = 0.0013; // radians per frame — slower, contemplative spin

    let userInteracting = false;
    let autoRotate = true;
    let resumeTimer = null;
    let lastX = 0, lastY = 0;
    let pointerId = null;

    const applyCamera = () => {
      const sinPhi = Math.sin(phi);
      camera.position.set(
        target.x + radius * sinPhi * Math.sin(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * sinPhi * Math.cos(theta)
      );
      camera.lookAt(target);
    };

    const onPointerDown = (e) => {
      if (pointerId !== null) return;
      pointerId = e.pointerId;
      renderer.domElement.setPointerCapture(e.pointerId);
      userInteracting = true;
      autoRotate = false;
      clearTimeout(resumeTimer);
      lastX = e.clientX;
      lastY = e.clientY;
      mount.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const k = 0.008;
      thetaTarget -= dx * k;
      phiTarget -= dy * k;
      phiTarget = Math.max(PHI_MIN, Math.min(PHI_MAX, phiTarget));
    };

    const onPointerUp = (e) => {
      if (e.pointerId !== pointerId) return;
      try { renderer.domElement.releasePointerCapture(e.pointerId); } catch (_) {}
      pointerId = null;
      userInteracting = false;
      mount.style.cursor = 'grab';
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        if (!userInteracting) autoRotate = true;
      }, 2400);
    };

    const dom = renderer.domElement;
    dom.style.touchAction = 'none';
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);

    // ── RESIZE ─────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── ANIMATE ────────────────────────────────────────────────
    let frame = 0;
    let rafId;
    // Cache base star count + base 6 (always visible) so the rest fade with density
    const baseStarCount = 6;
    const totalStars = starGroup.children.length;

    // ── Assembly-cycle keyframes (used only when finish === 'animate') ──
    // Cycle structure:
    //   0%   →  45%  Assembly — parts appear bottom-up, blueprint material
    //   45%  →  62%  Hologram — translucent glow shells materialize over the assembled body
    //   62%  →  80%  Wireframe — fuller body, sharper edges, grid gone
    //   80%  → 100%  Disassembly — parts dissolve in reverse order, back to empty
    const CYCLE_MS = 26000; // total loop length — gives ~11s to assemble 20 parts
    const startTime = performance.now();
    const smoothstep = (t) => t * t * (3 - 2 * t);
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const lerp = (a, b, t) => a + (b - a) * t;

    // Material phase keyframes — t=0 blueprint, t=1 hologram, t=2 wireframe-bright
    const KEYFRAMES = [
      { shellOp: 0.00, edgeOp: 0.98, dimOp: 0.36, gridOp: 0.12 }, // Blueprint
      { shellOp: 0.20, edgeOp: 1.00, dimOp: 0.55, gridOp: 0.03 }, // Hologram
      { shellOp: 0.48, edgeOp: 0.92, dimOp: 0.50, gridOp: 0.00 }, // Wireframe
    ];

    // Phase boundaries within the cycle
    const PHASES = {
      assembly:    [0.00, 0.45],  // morph keyframe 0 → 0 (stay blueprint)
      blueToHolo:  [0.45, 0.55],  // morph keyframe 0 → 1
      hologram:    [0.55, 0.62],  // hold keyframe 1
      holoToWire:  [0.62, 0.72],  // morph keyframe 1 → 2
      wireframe:   [0.72, 0.80],  // hold keyframe 2
      dissolve:    [0.80, 1.00],  // disassemble parts in reverse
    };

    const pickMaterials = (t) => {
      // Returns interpolated { shellOp, edgeOp, dimOp, gridOp } for this cycle t.
      if (t < PHASES.blueToHolo[0])      return KEYFRAMES[0];
      if (t < PHASES.blueToHolo[1])      {
        const u = smoothstep((t - PHASES.blueToHolo[0]) / (PHASES.blueToHolo[1] - PHASES.blueToHolo[0]));
        return {
          shellOp: lerp(KEYFRAMES[0].shellOp, KEYFRAMES[1].shellOp, u),
          edgeOp:  lerp(KEYFRAMES[0].edgeOp,  KEYFRAMES[1].edgeOp,  u),
          dimOp:   lerp(KEYFRAMES[0].dimOp,   KEYFRAMES[1].dimOp,   u),
          gridOp:  lerp(KEYFRAMES[0].gridOp,  KEYFRAMES[1].gridOp,  u),
        };
      }
      if (t < PHASES.hologram[1])        return KEYFRAMES[1];
      if (t < PHASES.holoToWire[1])      {
        const u = smoothstep((t - PHASES.holoToWire[0]) / (PHASES.holoToWire[1] - PHASES.holoToWire[0]));
        return {
          shellOp: lerp(KEYFRAMES[1].shellOp, KEYFRAMES[2].shellOp, u),
          edgeOp:  lerp(KEYFRAMES[1].edgeOp,  KEYFRAMES[2].edgeOp,  u),
          dimOp:   lerp(KEYFRAMES[1].dimOp,   KEYFRAMES[2].dimOp,   u),
          gridOp:  lerp(KEYFRAMES[1].gridOp,  KEYFRAMES[2].gridOp,  u),
        };
      }
      return KEYFRAMES[2];
    };

    const partScaleAt = (t, i, N) => {
      // Returns 0..1 — how much of this part is "built" at cycle position t.
      if (t < PHASES.assembly[1]) {
        // Each part gets a window inside the assembly phase, staggered.
        // Windows overlap slightly for a cascading, fluid feel.
        const assembleLen = PHASES.assembly[1] - PHASES.assembly[0];
        const w = assembleLen / N;                  // per-part slot
        const partStart = PHASES.assembly[0] + i * w * 0.85;
        const partEnd = partStart + w * 1.8;        // 80% overlap with next
        return smoothstep(clamp01((t - partStart) / (partEnd - partStart)));
      }
      if (t < PHASES.dissolve[0]) return 1; // fully built — hologram & wireframe phases

      // Dissolve in REVERSE order (last-built first to dissolve)
      const rIdx = N - 1 - i;
      const dissolveLen = PHASES.dissolve[1] - PHASES.dissolve[0];
      const w = dissolveLen / N;
      const partStart = PHASES.dissolve[0] + rIdx * w * 0.85;
      const partEnd = partStart + w * 1.8;
      return 1 - smoothstep(clamp01((t - partStart) / (partEnd - partStart)));
    };

    const applyAnimateFrame = (cycleT) => {
      // Material phase
      const m = pickMaterials(cycleT);
      shellMat.opacity   = m.shellOp;
      edgeMat.opacity    = m.edgeOp;
      edgeDimMat.opacity = m.dimOp;
      if (gridMat) gridMat.opacity = m.gridOp;

      // Per-part scale (assembly / dissolve)
      const N = wrappedParts.length;
      wrappedParts.forEach((wrap, i) => {
        const s = partScaleAt(cycleT, i, N);
        wrap.scale.setScalar(s);
      });
    };

    const tick = () => {
      frame++;
      const d = densityRef.current; // 0..1, live-readable

      // auto-rotate when idle
      if (autoRotate && !userInteracting) {
        thetaTarget -= AUTO_SPEED;
      }
      theta += (thetaTarget - theta) * DAMPING;
      phi += (phiTarget - phi) * DAMPING;
      applyCamera();

      // Animate-mode: morph through the 3 finish keyframes continuously
      if (isAnimate) {
        const elapsed = performance.now() - startTime;
        applyAnimateFrame((elapsed % CYCLE_MS) / CYCLE_MS);
      }

      // Star pulse + density-driven visibility:
      // first 6 stars always visible (pulse 0.3-0.9 * baseGlow)
      // extras fade in proportionally to density (after threshold)
      starGroup.children.forEach((s, i) => {
        const phase = frame * 0.02 + i * 1.3;
        const pulse = 0.6 + Math.sin(phase) * 0.3;
        if (i < baseStarCount) {
          s.material.opacity = pulse * (0.45 + d * 0.55);
        } else {
          // Fade extras in over the 0..1 density range
          const localT = Math.max(0, (i - baseStarCount) / (totalStars - baseStarCount));
          const reveal = Math.max(0, d - localT * 0.85);
          s.material.opacity = pulse * reveal * 1.2;
          s.visible = reveal > 0.02;
        }
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      ro.disconnect();
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [finish, edgeColor, accentColor]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
        touchAction: 'none',
      }}
      onMouseDown={(e) => { e.currentTarget.style.cursor = 'grabbing'; }}
      onMouseUp={(e) => { e.currentTarget.style.cursor = 'grab'; }}
      onMouseLeave={(e) => { e.currentTarget.style.cursor = 'grab'; }}
    />
  );
};

window.Telescope3D = Telescope3D;
