// Modal.jsx — deliverable preview modal

const Modal = ({ open, deliverable, onClose }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 800,
        background: 'rgba(2,6,14,0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.32s ease',
      }}
    >
      <div
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: open ? 'scale(1)' : 'scale(0.94)',
          transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
          boxShadow:
            '0 28px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,212,204,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 1.75rem',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}
          >
            {deliverable ? deliverable.title : 'Entregável'}
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icons.Close />
          </button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', minHeight: '300px' }}>
          {deliverable && deliverable.contentType === 'image' ? (
            <img
              src={deliverable.contentSrc}
              alt={deliverable.title}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain', padding: '1rem', maxHeight: '78vh' }}
            />
          ) : (
            <div
              style={{
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                padding: '3rem 2rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '60px', height: '60px',
                  borderRadius: '12px',
                  background: 'var(--primary-dim)',
                  border: '1px solid rgba(0,212,204,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Icons.Doc width="28" height="28" />
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                }}
              >
                {deliverable && deliverable.contentLabel}
              </div>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.95rem',
                  maxWidth: '420px',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {deliverable && deliverable.desc}
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(91,122,138,0.5)',
                  marginTop: '14px',
                }}
              >
                PDF não disponível neste kit de demonstração
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

window.Modal = Modal;
