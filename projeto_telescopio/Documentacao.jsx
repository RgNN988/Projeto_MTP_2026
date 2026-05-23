// Documentacao.jsx — vertical timeline with glowing stem

const DOC_ENTRIES = [
  {
    tag: 'Início',
    title: 'Projeto Iniciado',
    body: 'Início oficial do Projeto Telescópio. Foram definidos os parâmetros básicos do instrumento, o escopo de trabalho e os primeiros entregáveis: carta morfológica, fluxograma de montagem, mapa de personas e documento de objetivos. A fase de planejamento está em pleno andamento.',
  },
  {
    tag: 'Entregável',
    title: 'Fluxograma de Construção Concluído',
    body: 'O fluxograma completo com todos os processos de montagem foi finalizado — desde a definição do diâmetro do espelho primário até a apresentação do telescópio funcional. O documento mapeia decisões críticas, pontos de verificação e ramificações do processo construtivo.',
  },
  {
    tag: 'Entregável',
    title: 'Carta Morfológica e Personas Finalizadas',
    body: 'Concluídas a carta morfológica — com combinações de soluções para os subsistemas do telescópio — e a análise de personas, que identifica os diferentes perfis de usuários que poderão utilizar o instrumento após sua conclusão.',
  },
];

const DocEntry = ({ tag, title, body }) => (
  <div style={{ position: 'relative', paddingBottom: '3rem' }}>
    <span
      aria-hidden
      style={{
        position: 'absolute',
        left: '-2.25rem',
        top: '6px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'var(--primary)',
        border: '2px solid var(--bg-deep)',
        boxShadow: '0 0 12px rgba(0,212,204,0.5)',
      }}
    />
    <Tag>{tag}</Tag>
    <div
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '1.15rem',
        fontWeight: 700,
        color: 'var(--text)',
        letterSpacing: '-0.02em',
        marginBottom: '0.5rem',
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 300,
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        lineHeight: 1.78,
      }}
    >
      {body}
    </div>
  </div>
);

const Documentacao = () => {
  const isMobile = useIsMobile();
  return (
  <section id="documentacao" aria-labelledby="doc-h2">
    <div style={{ padding: isMobile ? '4.5rem 1.25rem' : '7rem 2.5rem', maxWidth: '1180px', margin: '0 auto' }}>
      <Eyebrow>04 — Registro</Eyebrow>
      <SectionTitle id="doc-h2">Documentação<br />do Projeto</SectionTitle>
      <SectionDesc>
        Registro cronológico das etapas, decisões e marcos ao longo do desenvolvimento.
      </SectionDesc>

      <div style={{ position: 'relative', paddingLeft: '2.25rem', marginTop: '3rem' }}>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: '1px',
            background:
              'linear-gradient(to bottom, var(--primary), rgba(0,212,204,0.12) 70%, transparent)',
          }}
        />
        {DOC_ENTRIES.map((e) => <DocEntry key={e.title} {...e} />)}
        <p
          aria-hidden
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: 'rgba(91,122,138,0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingTop: '0.5rem',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: '36px', height: '1px', background: 'currentColor', display: 'block' }} />
          Mais atualizações em breve
        </p>
      </div>
    </div>
  </section>
  );
};

window.Documentacao = Documentacao;
