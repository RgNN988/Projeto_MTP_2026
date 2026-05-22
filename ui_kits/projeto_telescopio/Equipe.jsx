// Equipe.jsx — team avatar grid

const TEAM = [
  { name: 'Rogério De Lima Faria', photo: '../../assets/photos/foto_rogerio.png' },
  { name: 'Arthur Tomé',           photo: '../../assets/photos/WhatsApp Image 2026-05-21 at 19.31.00.jpeg' },
  { name: 'Augusto Castilione',    photo: '../../assets/photos/foto_augusto.png' },
  { name: 'Ewerton Gomes',         photo: '../../assets/photos/foto_ewerton.png' },
  { name: 'Jean Grossi',           photo: '../../assets/photos/foto_jean.png' },
  { name: 'Gabriel Kaiuca',        photo: '../../assets/photos/foto_gabriel.png' },
  { name: 'João Cardozo',          photo: '../../assets/photos/WhatsApp Image 2026-05-21 at 19.57.50.jpeg' },
  { name: 'Lucas Oshiro',          photo: '../../assets/photos/WhatsApp Image 2026-05-21 at 23.07.57.jpeg' },
  { name: 'Renné Bonson',          photo: '../../assets/photos/foto_renné.png' },
  { name: 'Vinícius Maciel',       photo: '../../assets/photos/WhatsApp Image 2026-05-21 at 22.08.03.jpeg' },
];

const MemberCard = ({ name, photo, initials }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid ' + (hover ? 'rgba(0,212,204,0.38)' : 'var(--border)'),
        borderRadius: '12px',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.85rem',
        textAlign: 'center',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,212,204,0.07)'
          : 'none',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--primary-dim)',
          border: '1.5px solid rgba(0,212,204,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--primary)',
          letterSpacing: '0.05em',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {photo
          ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          : initials}
      </div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {name}
      </div>
    </div>
  );
};

const Equipe = () => (
  <section id="equipe" aria-labelledby="equipe-h2">
    <div style={{ padding: '7rem 2.5rem', maxWidth: '1180px', margin: '0 auto' }}>
      <Eyebrow>05 — Membros</Eyebrow>
      <SectionTitle id="equipe-h2">Equipe do<br />Projeto</SectionTitle>
      <SectionDesc>
        Os integrantes responsáveis pelo desenvolvimento do Projeto Telescópio.
      </SectionDesc>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1.25rem',
          marginTop: '3rem',
        }}
      >
        {TEAM.map((m) => <MemberCard key={m.name} {...m} />)}
      </div>
    </div>
  </section>
);

window.Equipe = Equipe;
