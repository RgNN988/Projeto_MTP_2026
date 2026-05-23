// Hero.jsx — title, gradient stack, decorative telescope SVG

const TelescopeArt = () => (
  <svg viewBox="0 0 280 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <line x1="140" y1="265" x2="55" y2="380" stroke="#1a3a5a" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="140" y1="265" x2="225" y2="380" stroke="#1a3a5a" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="140" y1="265" x2="140" y2="378" stroke="#1a3a5a" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="85" y1="330" x2="195" y2="330" stroke="#152e48" strokeWidth="1.8" strokeLinecap="round" />
    <ellipse cx="140" cy="264" rx="20" ry="9" fill="#0a1f38" />
    <rect x="128" y="237" width="24" height="29" rx="3" fill="#0a1f38" />
    <rect x="122" y="220" width="36" height="19" rx="4" fill="#0f2a46" />
    <rect x="130" y="208" width="20" height="14" rx="3" fill="#0a2040" />
    <rect x="72" y="132" width="136" height="48" rx="7" fill="#0a1f38" stroke="#183452" strokeWidth="1.4" />
    <rect x="72" y="132" width="136" height="6" rx="3" fill="#183452" opacity="0.5" />
    <ellipse cx="72" cy="156" rx="11" ry="24" fill="#080f22" stroke="#00d4cc" strokeWidth="1.4" />
    <ellipse cx="72" cy="156" rx="5.5" ry="14" fill="#040c1e" stroke="rgba(0,212,204,0.3)" strokeWidth="0.5" />
    <ellipse cx="208" cy="156" rx="7.5" ry="16" fill="#080f22" stroke="#183452" strokeWidth="1.2" />
    <rect x="92" y="118" width="58" height="15" rx="3" fill="#080f22" stroke="#183452" strokeWidth="1" />
    <ellipse cx="72" cy="156" rx="14" ry="27" fill="none" stroke="rgba(0,212,204,0.12)" strokeWidth="3" />
    <circle cx="28" cy="95" r="1.4" fill="#00d4cc" opacity="0.9" />
    <circle cx="255" cy="75" r="1" fill="#ffffff" opacity="0.55" />
    <circle cx="35" cy="190" r="0.9" fill="#ffffff" opacity="0.4" />
    <circle cx="248" cy="190" r="1.4" fill="#ff8c42" opacity="0.45" />
    <circle cx="18" cy="145" r="0.7" fill="#ffffff" opacity="0.3" />
    <circle cx="265" cy="130" r="0.7" fill="#a8d8ea" opacity="0.5" />
  </svg>
);

const Hero = () => {
  const isMobile = useIsMobile(900);
  // Robust entry animation via React state — inline CSS `animation` with
  // delays can hang in some embed contexts (startTime stays null).
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);
  const entry = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  // ─── Tweakable atmosphere + density ───────────────────────────
  const ctx = (typeof useTweaksCtx === 'function') ? useTweaksCtx() : null;
  const atmos = (ctx && ctx.atmos) || {
    primary: '#00d4cc',
    secondary: '#ff8c42',
    bgPrimary: 'rgba(0,55,75,0.6)',
    bgWarm: 'rgba(255,140,66,0.07)',
    bgCool: 'rgba(0,212,204,0.05)',
    bodyTop: '#030a14', bodyMid: '#030f1e', bodyBot: '#020a18',
    photoWash: 'screen',
    primaryGlow: 'rgba(0,212,204,',
  };
  const density = (ctx && ctx.t && typeof ctx.t.density === 'number') ? ctx.t.density / 100 : 0.7;
  // Title gradient takes the atmosphere's primary so the headline retones too
  const titleGradient = `linear-gradient(145deg, #ffffff 0%, #e6edef 30%, ${atmos.primary} 72%, ${atmos.primaryGlow}0.55) 100%)`;
  return (
  <section
    id="hero"
    style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      overflow: 'hidden',
    }}
    aria-labelledby="hero-h1"
  >
    {/* layered radial gradient background — re-tones with atmosphere */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: [
          `radial-gradient(ellipse 90% 70% at 50% 35%, ${atmos.bgPrimary} 0%, transparent 65%)`,
          `radial-gradient(ellipse 45% 35% at 78% 18%, ${atmos.bgWarm} 0%, transparent 55%)`,
          `radial-gradient(ellipse 55% 45% at 18% 78%, ${atmos.bgCool} 0%, transparent 55%)`,
          `linear-gradient(180deg, ${atmos.bodyTop} 0%, ${atmos.bodyMid} 60%, ${atmos.bodyBot} 100%)`,
        ].join(', '),
        transition: 'background 1.4s cubic-bezier(0.22,1,0.36,1)',
      }}
    />
    {/* telescope photo wash — fades with density */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        backgroundImage: "url('../../assets/photos/telescopio-e1576107221750.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        opacity: 0.04 + density * 0.10,
        mixBlendMode: atmos.photoWash,
        transition: 'opacity 0.6s ease, mix-blend-mode 0.4s linear',
      }}
    />
    {/* nebula spinner — fades with density */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: '-8%', top: '8%',
        zIndex: 2,
        width: 'clamp(220px, 32vw, 520px)',
        aspectRatio: '1',
        backgroundImage: "url('../../assets/photos/7077.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: density * 0.16,
        borderRadius: '50%',
        animation: 'spin-slow 140s linear infinite',
        filter: 'blur(2px)',
        transition: 'opacity 0.6s ease',
      }}
    />

    <div
      style={{
        position: 'relative',
        zIndex: 10,
        textAlign: isMobile ? 'center' : 'left',
        padding: isMobile ? '0 1.5rem' : '0 1.5rem 0 5rem',
        maxWidth: isMobile ? '100%' : '620px',
        marginRight: isMobile ? 'auto' : 'auto',
        marginLeft: isMobile ? 'auto' : undefined,
        width: '100%',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-start',
          gap: '14px',
          marginBottom: '1.75rem',
        ...entry(0.3),
      }}
      >
        <span style={{ width: '36px', height: '1px', background: 'currentColor', opacity: 0.45 }} />
        Projeto MTP-2026 · 2026
        <span style={{ width: '36px', height: '1px', background: 'currentColor', opacity: 0.45 }} />
      </div>

      <h1
        id="hero-h1"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 9vw, 5rem)',
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          color: '#ffffff',
          textShadow: `0 0 28px ${atmos.primaryGlow}0.45), 0 0 4px ${atmos.primaryGlow}0.20)`,
          padding: '0.1em 0.1em',
          marginBottom: '1.4rem',
          ...entry(0.5),
        }}
      >
        Projeto<br />Telescópio
      </h1>

      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'var(--text-muted)',
          letterSpacing: '0.02em',
          marginBottom: '2.75rem',
          ...entry(0.7),
        }}
      >
        Construindo janelas para o universo
      </p>

      <div style={entry(0.9)}>
        <ButtonCta href="#sobre" icon={<Icons.Info />}>
          Explorar o Projeto
        </ButtonCta>
      </div>
    </div>

    {/* interactive 3D telescope — hidden on mobile */}
    {!isMobile && <div
      style={{
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 5,
        width: 'clamp(320px, 42vw, 640px)',
        height: 'clamp(380px, 56vh, 720px)',
        filter: `drop-shadow(0 0 28px ${atmos.primaryGlow}0.22))`,
        transition: 'filter 0.8s ease',
      }}
    >
      <Telescope3D
        finish={(ctx && ctx.t && ctx.t.finish) || 'wireframe'}
        density={density}
        edgeColor={atmos.primary}
        accentColor={atmos.secondary}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '6px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(0,212,204,0.55)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ width: '20px', height: '1px', background: 'currentColor', display: 'block' }} />
        Arraste para girar
      </div>
    </div>}

    {/* scroll hint */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        ...entry(1.6),
      }}
    >
      <div
        style={{
          width: '20px',
          height: '34px',
          border: '1px solid rgba(91,122,138,0.45)',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '5px',
        }}
      >
        <div
          style={{
            width: '2.5px',
            height: '7px',
            background: 'var(--primary)',
            borderRadius: '2px',
            animation: 'scroll-wheel 1.6s ease-in-out infinite',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9.5px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        Rolar
      </span>
    </div>
  </section>
  );
};

window.Hero = Hero;
