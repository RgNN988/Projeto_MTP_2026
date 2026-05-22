// Evolucao.jsx — build-phase timeline

const PHASES = [
  { num: 'Fase 01', name: 'Planejamento',         desc: 'Parâmetros ópticos, seleção de materiais e fluxo de construção', status: 'active', icon: 'PlanBlueprint',  badge: 'Em andamento' },
  { num: 'Fase 02', name: 'Aquisição de Peças',   desc: 'Compra de lentes, espelhos, tubos e ferragens',                  status: 'active', icon: 'PartsBlueprint', badge: 'Em andamento' },
  { num: 'Fase 03', name: 'Montagem',             desc: 'Construção da estrutura, colagem óptica e alinhamento',         status: 'locked', icon: 'Locked',         badge: 'Bloqueado' },
  { num: 'Fase 04', name: 'Telescópio Funcional', desc: 'Calibração final, testes ópticos e primeira observação',         status: 'locked', icon: 'Locked',         badge: 'Bloqueado' },
];

const PhaseCard = ({ num, name, desc, status, icon, badge }) => {
  const isActive = status === 'active';
  const IconCmp = Icons[icon];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 1.25rem 2.5rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
          background: isActive ? 'rgba(0,212,204,0.10)' : 'rgba(11,21,36,0.8)',
          border: isActive ? '1.5px solid rgba(0,212,204,0.55)' : '1px solid rgba(91,122,138,0.18)',
          boxShadow: isActive
            ? '0 0 0 8px rgba(0,212,204,0.055), 0 0 28px rgba(0,212,204,0.22)'
            : 'none',
          animation: isActive ? 'pulse-glow 3.2s ease-in-out infinite' : 'none',
        }}
      >
        <IconCmp />
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '0.4rem',
          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          marginBottom: '0.45rem',
          color: isActive ? 'var(--text)' : 'rgba(91,122,138,0.7)',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '0.75rem',
        }}
      >
        {desc}
      </div>
      <Badge status={status}>{badge}</Badge>
    </div>
  );
};

const Evolucao = () => (
  <div
    style={{
      background:
        'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(0,25,45,0.8) 0%, transparent 70%), var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}
  >
    <section
      id="evolucao"
      style={{
        padding: '7rem 2.5rem',
        maxWidth: '1180px',
        margin: '0 auto',
      }}
      aria-labelledby="evo-h2"
    >
      <div style={{ textAlign: 'center' }}>
        <Eyebrow centered>02 — Progresso</Eyebrow>
        <SectionTitle centered id="evo-h2">Evolução do<br />Telescópio</SectionTitle>
        <SectionDesc centered>
          Acompanhe cada fase da construção. Conforme o projeto avança, o telescópio ganha vida.
        </SectionDesc>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          marginTop: '4rem',
          position: 'relative',
        }}
      >
        {/* Connector line */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '76px',
            left: '12.5%',
            right: '12.5%',
            height: '1px',
            background:
              'linear-gradient(90deg, var(--primary) 0%, var(--primary) 36%, rgba(0,212,204,0.4) 50%, rgba(91,122,138,0.15) 72%, transparent 100%)',
            zIndex: 0,
          }}
        />
        {PHASES.map((p) => <PhaseCard key={p.num} {...p} />)}
      </div>
    </section>
  </div>
);

window.Evolucao = Evolucao;
