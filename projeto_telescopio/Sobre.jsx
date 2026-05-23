// Sobre.jsx — about + stat cards

const StatCard = ({ number, label, accent = 'primary', delay = 0 }) => {
  const [hover, setHover] = React.useState(false);
  const color = accent === 'secondary' ? 'var(--secondary)' : 'var(--primary)';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid ' + (hover ? 'rgba(0,212,204,0.38)' : 'var(--border)'),
        borderRadius: '8px',
        padding: '1.5rem 1.75rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hover
          ? '0 10px 48px rgba(0,0,0,0.4), 0 0 22px rgba(0,212,204,0.07)'
          : '0 2px 24px rgba(0,0,0,0.35)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        animationDelay: delay + 's',
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          opacity: 0.55,
        }}
      />
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '2.6rem',
          color,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '0.2rem',
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10.5px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const Sobre = () => {
  const isMobile = useIsMobile();
  return (
  <section id="sobre" style={{ position: 'relative', overflow: 'hidden' }} aria-labelledby="sobre-h2">
    {/* galaxy wash right side */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0, right: '-8%',
        width: '52%', height: '100%',
        backgroundImage: "url('./assets/photos/R.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.055,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to left, rgba(0,0,0,0.7), transparent)',
        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.7), transparent)',
      }}
    />
    <div
      style={{
        padding: isMobile ? '4.5rem 1.25rem' : '7rem 2.5rem',
        maxWidth: '1180px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2.5rem' : '5rem',
          alignItems: 'start',
        }}
      >
        <div>
          <Eyebrow>01 — Sobre</Eyebrow>
          <SectionTitle id="sobre-h2">Sobre o<br />Projeto</SectionTitle>
          <SectionDesc>
            O Projeto Telescópio é uma iniciativa escolar com objetivo de desenvolver um telescópio funcional do zero — desde o planejamento e seleção de materiais até a montagem, alinhamento óptico e calibração.
          </SectionDesc>
          <div style={{ marginTop: '1rem' }}>
            <SectionDesc>
              Unindo conceitos de óptica, engenharia e astronomia, o projeto documenta cada etapa construtiva com rigor técnico, servindo como base para pesquisa e apresentação acadêmica.
            </SectionDesc>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <StatCard number="02" label="Fase Atual — Adquirindo Peças" />
          <StatCard number="04" label="Entregáveis Produzidos" />
          <StatCard number="∞" label="Estrelas a Observar" accent="secondary" />
        </div>
      </div>
    </div>
  </section>
  );
};

window.Sobre = Sobre;
