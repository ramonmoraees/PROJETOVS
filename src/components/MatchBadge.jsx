function MatchBadge({ percentage }) {
  const getTone = () => {
    if (percentage >= 90) return 'high';
    if (percentage >= 80) return 'medium';
    return 'low';
  };

  return <span className={`match-badge ${getTone()}`}>{percentage}% Match</span>;
}

export default MatchBadge;
