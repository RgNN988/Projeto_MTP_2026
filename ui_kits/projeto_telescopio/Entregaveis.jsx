// Entregaveis.jsx — deliverable card grid

const DELIVERABLES = [
  {
    id: 'carta-morfologica',
    title: 'Carta Morfológica',
    desc: 'Mapeamento das soluções construtivas e combinações possíveis para cada subsistema do telescópio.',
    icon: 'Doc',
    accent: 'primary',
    contentType: 'placeholder',
    contentLabel: 'PDF · carta morfológica',
  },
  {
    id: 'fluxograma',
    title: 'Fluxograma de Montagem',
    desc: 'Diagrama com todos os processos sequenciais de construção — do início ao telescópio pronto para apresentação.',
    icon: 'Flow',
    accent: 'primary',
    contentType: 'image',
    contentSrc: '../../assets/telescope_flowchart.png',
  },
  {
    id: 'personas',
    title: 'Personas do Projeto',
    desc: 'Perfis detalhados dos usuários que poderão utilizar o telescópio — objetivos, contextos e necessidades identificadas.',
    icon: 'People',
    accent: 'primary',
    contentType: 'placeholder',
    contentLabel: 'PDF · personas',
  },
  {
    id: 'objetivos',
    title: 'Objetivos do Projeto',
    desc: 'Metas e diretrizes estabelecidas para o desenvolvimento do telescópio, com critérios de sucesso e escopo técnico definido.',
    icon: 'Target',
    accent: 'secondary',
    contentType: 'placeholder',
    contentLabel: 'PDF · objetivos',
  },
];

const EntregavelCard = ({ d, onOpen }) => {
  const [hover, setHover] = React.useState(false);
  const isSecondary = d.accent === 'secondary';
  const IconCmp = Icons[d.icon];
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(d)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(d);
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid ' + (hover ? 'rgba(0,212,204,0.32)' : 'var(--border)'),
        borderRadius: '12px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hover
          ? '0 14px 56px rgba(0,0,0,0.4), 0 0 28px rgba(0,212,204,0.055)'
          : '0 2px 24px rgba(0,0,0,0.28)',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          transform: hover ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.42s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isSecondary ? 'var(--secondary-dim)' : 'var(--primary-dim)',
          border: '1px solid ' + (isSecondary ? 'rgba(255,140,66,0.18)' : 'rgba(0,212,204,0.18)'),
          flexShrink: 0,
        }}
      >
        <IconCmp />
      </div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
        }}
      >
        {d.title}
      </div>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: '0.87rem',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          flex: 1,
          margin: 0,
        }}
      >
        {d.desc}
      </p>
      <ButtonSm variant={isSecondary ? 'secondary' : 'default'}>Visualizar</ButtonSm>
    </div>
  );
};

const Entregaveis = ({ onOpen }) => {
  const isMobile = useIsMobile();
  return (
  <section id="entregaveis" aria-labelledby="ent-h2">
    <div style={{ padding: isMobile ? '4.5rem 1.25rem' : '7rem 2.5rem', maxWidth: '1180px', margin: '0 auto' }}>
      <Eyebrow>03 — Trabalhos</Eyebrow>
      <SectionTitle id="ent-h2">Entregáveis<br />do Projeto</SectionTitle>
      <SectionDesc>
        Documentos produzidos ao longo do desenvolvimento. Clique em qualquer card para visualizar.
      </SectionDesc>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginTop: '3rem',
        }}
      >
        {DELIVERABLES.map((d) => (
          <EntregavelCard key={d.id} d={d} onOpen={onOpen} />
        ))}
      </div>
    </div>
  </section>
  );
};

window.Entregaveis = Entregaveis;
window.DELIVERABLES = DELIVERABLES;
