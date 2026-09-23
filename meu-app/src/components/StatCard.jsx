function StatCard({ label, value, detail, accent = false }) {
  return (
    <article className={`stat-card ${accent ? 'accent' : ''}`}>
      <span className="stat-card__label">{label}</span>
      <strong>{value}</strong>
      <span className="stat-card__detail">{detail}</span>
    </article>
  );
}

export default StatCard;
