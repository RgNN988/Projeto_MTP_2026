// ============================================================
// Primitives — shared building blocks for the Telescópio UI kit
// ============================================================

const Eyebrow = ({ children, centered = false }) => (
  <div
    className="eyebrow-row"
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: '11px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--primary, #00d4cc)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      justifyContent: centered ? 'center' : 'flex-start',
      marginBottom: '12px',
    }}
  >
    <span style={{ width: '22px', height: '1px', background: 'currentColor', display: 'block' }} />
    {children}
  </div>
);

const SectionTitle = ({ children, centered = false, id }) => (
  <h2
    id={id}
    style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      fontSize: 'clamp(2.1rem, 5vw, 3.6rem)',
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      color: 'var(--text)',
      marginBottom: '20px',
      textAlign: centered ? 'center' : 'left',
    }}
  >
    {children}
  </h2>
);

const SectionDesc = ({ children, centered = false, maxWidth = 580 }) => (
  <p
    style={{
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 300,
      fontSize: '1rem',
      color: 'var(--text-muted)',
      lineHeight: 1.8,
      maxWidth: maxWidth + 'px',
      margin: centered ? '0 auto' : 0,
      textAlign: centered ? 'center' : 'left',
    }}
  >
    {children}
  </p>
);

const Divider = () => (
  <div
    style={{
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
    }}
  />
);

const Tag = ({ children, variant = 'default' }) => {
  const styles = {
    default: { bg: 'rgba(0,212,204,0.07)', color: 'var(--primary)', border: 'rgba(0,212,204,0.18)' },
    warning: { bg: 'rgba(255,140,66,0.07)', color: 'var(--secondary)', border: 'rgba(255,140,66,0.18)' },
  }[variant];
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "'Space Mono', monospace",
        fontSize: '9.5px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '2px 9px',
        borderRadius: '20px',
        background: styles.bg,
        color: styles.color,
        border: '1px solid ' + styles.border,
        marginBottom: '10px',
      }}
    >
      {children}
    </span>
  );
};

const Badge = ({ children, status = 'active' }) => {
  const styles = {
    active: {
      bg: 'rgba(0,212,204,0.10)',
      color: 'var(--primary)',
      border: 'rgba(0,212,204,0.28)',
    },
    locked: {
      bg: 'rgba(11,21,36,0.5)',
      color: 'var(--text-muted)',
      border: 'rgba(91,122,138,0.12)',
    },
  }[status];
  return (
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '9.5px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '3px 10px',
        borderRadius: '20px',
        background: styles.bg,
        color: styles.color,
        border: '1px solid ' + styles.border,
      }}
    >
      {children}
    </span>
  );
};

const ButtonCta = ({ children, icon, onClick, href }) => {
  const [hover, setHover] = React.useState(false);
  const inner = (
    <React.Fragment>
      {icon}
      {children}
    </React.Fragment>
  );
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0.9rem 2.2rem',
    background: hover ? 'rgba(0,212,204,0.18)' : 'rgba(0,212,204,0.10)',
    border: '1px solid ' + (hover ? 'var(--primary)' : 'rgba(0,212,204,0.38)'),
    borderRadius: '4px',
    color: hover ? '#fff' : 'var(--primary)',
    fontFamily: "'Space Mono', monospace",
    fontSize: '12px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
    transform: hover ? 'translateY(-3px)' : 'translateY(0)',
    boxShadow: hover
      ? '0 6px 30px rgba(0,212,204,0.18), inset 0 1px 0 rgba(255,255,255,0.08)'
      : '0 0 28px rgba(0,212,204,0.07), inset 0 1px 0 rgba(255,255,255,0.04)',
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick,
  };
  if (href) return <a href={href} style={style} {...handlers}>{inner}</a>;
  return <button style={style} {...handlers}>{inner}</button>;
};

const ButtonSm = ({ children, variant = 'default', tabIndex }) => {
  const colors = {
    default: { border: 'rgba(0,212,204,0.28)', color: 'var(--primary)' },
    secondary: { border: 'rgba(255,140,66,0.28)', color: 'var(--secondary)' },
  }[variant];
  return (
    <span
      tabIndex={tabIndex}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        alignSelf: 'flex-start',
        padding: '0.45rem 1.1rem',
        border: '1px solid ' + colors.border,
        borderRadius: '4px',
        background: 'transparent',
        color: colors.color,
        fontFamily: "'Space Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
      }}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3.5M7.5 1.5V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {children}
    </span>
  );
};

// ── ICON SET ─────────────────────────────────────────────────
const Icons = {
  TelescopeMark: (props) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <line x1="5" y1="19" x2="13" y2="11" />
      <line x1="13" y1="11" x2="19" y2="5" />
      <line x1="9" y1="22" x2="5" y2="19" />
      <circle cx="5" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <line x1="1.5" y1="17.5" x2="5" y2="19" />
      <line x1="3" y1="21" x2="5" y2="19" />
    </svg>
  ),
  Doc: (props) => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#00d4cc" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="12" y2="16" />
    </svg>
  ),
  Flow: (props) => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#00d4cc" strokeWidth="1.5" {...props}>
      <rect x="1" y="3" width="7" height="4" rx="1" />
      <rect x="8.5" y="10" width="7" height="4" rx="1" />
      <rect x="16" y="17" width="7" height="4" rx="1" />
      <polyline points="4.5,7 4.5,10.5 12,10.5" strokeWidth="1" />
      <polyline points="12,14 12,17.5 16,17.5" strokeWidth="1" />
    </svg>
  ),
  People: (props) => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#00d4cc" strokeWidth="1.5" {...props}>
      <circle cx="9" cy="7" r="3" />
      <circle cx="15" cy="7" r="3" />
      <path d="M3 19c0-3.3 2.7-6 6-6h2" />
      <path d="M13 13h2c3.3 0 6 2.7 6 6" />
    </svg>
  ),
  Target: (props) => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ff8c42" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="#ff8c42" />
      <line x1="12" y1="3" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="21" />
      <line x1="3" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="21" y2="12" />
    </svg>
  ),
  Close: (props) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ArrowOut: (props) => (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" {...props}>
      <path d="M1.5 7.5L7.5 1.5M7.5 1.5H3.5M7.5 1.5V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Info: (props) => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" {...props}>
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6.5 4V6.5M6.5 8.5V8.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // ── Blueprint mode (active phase markers) ──
  PlanBlueprint: (props) => (
    <svg viewBox="0 0 40 40" width="26" height="26" fill="none" {...props}>
      <rect x="6" y="17" width="28" height="8" rx="2" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="3,1.8" />
      <line x1="6" y1="21" x2="4" y2="21" stroke="#00d4cc" strokeWidth="1.3" />
      <ellipse cx="3.5" cy="21" rx="2.5" ry="5" stroke="#00d4cc" strokeWidth="1.1" strokeDasharray="2,1.5" />
      <line x1="34" y1="21" x2="37" y2="21" stroke="#00d4cc" strokeWidth="1" strokeDasharray="2,1.5" />
      <line x1="20" y1="25" x2="20" y2="30" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="3,1.8" />
      <line x1="13" y1="30" x2="27" y2="30" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="3,1.8" />
      <line x1="13" y1="30" x2="10" y2="37" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="3,1.8" />
      <line x1="27" y1="30" x2="30" y2="37" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="3,1.8" />
      <line x1="2" y1="13" x2="38" y2="13" stroke="rgba(0,212,204,0.18)" strokeWidth="0.5" />
      <line x1="20" y1="3" x2="20" y2="37" stroke="rgba(0,212,204,0.1)" strokeWidth="0.5" />
    </svg>
  ),
  PartsBlueprint: (props) => (
    <svg viewBox="0 0 40 40" width="26" height="26" fill="none" {...props}>
      <rect x="10" y="22" width="20" height="12" rx="2" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="3,1.8" />
      <polyline points="10,22 20,16 30,22" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="3,1.8" />
      <line x1="20" y1="16" x2="20" y2="22" stroke="#00d4cc" strokeWidth="1.3" strokeDasharray="2,1.5" />
      <line x1="14" y1="26" x2="26" y2="26" stroke="#00d4cc" strokeWidth="0.9" strokeDasharray="2,1.5" />
      <circle cx="30" cy="13" r="4.5" stroke="#00d4cc" strokeWidth="1.1" strokeDasharray="2,1.5" />
      <line x1="30" y1="10" x2="30" y2="16" stroke="rgba(0,212,204,0.35)" strokeWidth="0.7" />
      <line x1="27" y1="13" x2="33" y2="13" stroke="rgba(0,212,204,0.35)" strokeWidth="0.7" />
    </svg>
  ),
  Locked: (props) => (
    <svg viewBox="0 0 40 40" width="22" height="22" fill="none" {...props}>
      <rect x="10" y="19" width="20" height="15" rx="2.5" stroke="#5b7a8a" strokeWidth="1.3" />
      <path d="M14 19v-5a6 6 0 1 1 12 0v5" stroke="#5b7a8a" strokeWidth="1.3" />
      <circle cx="20" cy="27" r="2" fill="#5b7a8a" />
    </svg>
  ),
};

// Responsive hook — returns true when screen width < breakpoint (default 768px)
const useIsMobile = (bp = 768) => {
  const [v, setV] = React.useState(() => window.innerWidth < bp);
  React.useEffect(() => {
    const fn = () => setV(window.innerWidth < bp);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, [bp]);
  return v;
};

Object.assign(window, {
  Eyebrow, SectionTitle, SectionDesc, Divider,
  Tag, Badge, ButtonCta, ButtonSm, Icons, useIsMobile,
});
