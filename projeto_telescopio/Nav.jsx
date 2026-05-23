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

const Nav = ({ active }) => {
  const isMobile = useIsMobile(900);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Close menu on nav link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <React.Fragment>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 500,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          background: 'rgba(3,10,20,0.85)',
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
            flexShrink: 0,
          }}
        >
          <span style={{ color: 'var(--primary)', display: 'flex' }}>
            <Icons.TelescopeMark />
          </span>
          Projeto Telescópio
        </a>

        {isMobile ? (
          // Hamburger button
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-muted)',
              width: '38px',
              height: '38px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  background: 'var(--text-muted)',
                  borderRadius: '2px',
                  transformOrigin: 'center',
                  transition: 'transform 0.25s ease, opacity 0.25s ease',
                  transform: menuOpen
                    ? i === 1 ? 'scaleX(0)' : i === 0 ? 'translateY(6.5px) rotate(45deg)' : 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        ) : (
          <ul style={{ display: 'flex', gap: '2.25rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.id} {...link} active={active === link.id} />
            ))}
          </ul>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 499,
            background: 'rgba(3,10,20,0.97)',
            backdropFilter: 'blur(18px)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            padding: menuOpen ? '1rem 0' : 0,
            maxHeight: menuOpen ? '400px' : 0,
            overflow: 'hidden',
            transition: 'max-height 0.35s cubic-bezier(0.22,1,0.36,1), padding 0.25s ease',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={'#' + link.id}
              onClick={handleLinkClick}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: active === link.id ? 'var(--primary)' : 'var(--text-muted)',
                textDecoration: 'none',
                padding: '0.85rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

window.Nav = Nav;
