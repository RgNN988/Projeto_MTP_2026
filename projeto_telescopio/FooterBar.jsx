// FooterBar.jsx — site footer

const FooterBar = () => (
  <footer
    style={{
      borderTop: '1px solid var(--border)',
      background:
        'radial-gradient(ellipse 60% 80% at 50% 110%, rgba(0,212,204,0.025), transparent), var(--bg-deep)',
      padding: '3rem 2.5rem',
    }}
  >
    <div
      style={{
        maxWidth: '1180px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
          }}
        >
          Projeto <em style={{ fontStyle: 'normal', color: 'var(--primary)' }}>Telescópio</em>
        </div>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: 'rgba(91,122,138,0.45)',
            marginTop: '0.4rem',
            textTransform: 'uppercase',
          }}
        >
          Projeto MTP-2026
        </p>
      </div>
      <ul
        style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {[
          ['Sobre', '#sobre'],
          ['Evolução', '#evolucao'],
          ['Entregáveis', '#entregaveis'],
          ['Documentação', '#documentacao'],
        ].map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: 'rgba(91,122,138,0.45)',
          margin: 0,
          textTransform: 'uppercase',
        }}
      >
        Construindo janelas para o universo
      </p>
    </div>
  </footer>
);

window.FooterBar = FooterBar;
