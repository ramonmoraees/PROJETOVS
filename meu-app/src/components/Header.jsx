function Header({ title }) {
  return (
    <header className="topbar">
      <div className="brand-block">
        <span className="brand-mark">AM</span>
        <div>
          <p className="brand-name">AutoMatch AI</p>
          <span className="brand-subtitle">Marketplace inteligente</span>
        </div>
      </div>

      <div className="topbar__title">{title}</div>
    </header>
  );
}

export default Header;
