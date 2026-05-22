// Nav.jsx — sticky top navigation
const NAV_LINKS = [
  { id: 'hero', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'evolucao', label: 'Evolução' },
  { id: 'entregaveis', label: 'Entregáveis' },
  { id: 'documentacao', label: 'Documentação' },
  { id: 'equipe', label: 'Equipe' },
];

const NavLink = ({ id, label, active, onClick }) => {
  const [hover, setHover] = React.useState(false);
  const isHot = hover || active;
  return (
    <li>
      <a
        href={'#' + id}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          fontFamily: "'Space Mono', monospace",
          fontSize: '10.5px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isHot ? 'var(--primary)' : 'var(--text-muted)',
          textDecoration: 'none',
          paddingBottom: '3px',
          transition: 'color 0.3s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {label}
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-1px',
            height: '1px',
            width: isHot ? '100%' : 0,
            background: 'var(--primary)',
            transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </a>
    </li>
  );
};

const Nav = ({ active }) => (
  <nav
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 500,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2.5rem',
      background: 'rgba(3,10,20,0.72)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid var(--border)',
    }}
    aria-label="Navegação principal"
  >
    <a
      href="#hero"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: '1rem',
        letterSpacing: '-0.02em',
        color: 'var(--text)',
        textDecoration: 'none',
      }}
    >
      <span style={{ color: 'var(--primary)', display: 'flex' }}>
        <Icons.TelescopeMark />
      </span>
      Projeto Telescópio
    </a>
    <ul
      style={{
        display: 'flex',
        gap: '2.25rem',
        listStyle: 'none',
        margin: 0, padding: 0,
      }}
    >
      {NAV_LINKS.map((link) => (
        <NavLink key={link.id} {...link} active={active === link.id} />
      ))}
    </ul>
  </nav>
);

window.Nav = Nav;
