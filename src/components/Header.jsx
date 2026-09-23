function Header({ title, role, userName = 'Ramon', onLogout }) {
  const isClient = role === 'client';

  return (
    <header className="topbar">
      {isClient && <label className="topbar__search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Pesquisar marca, modelo ou veículo..." aria-label="Pesquisar veículos" /></label>}
      {!isClient && <div className="brand-block">
        <span className="brand-mark">AM</span>
        <div>
          <p className="brand-name">AutoMatch <em>AI</em></p>
          <span className="brand-subtitle">Marketplace inteligente</span>
        </div>
      </div>}

      <div className="topbar__actions">{!isClient && <div className="topbar__title">{title}</div>}{isClient && <button type="button" className="topbar__notification" aria-label="Notificações">♢<i /></button>}{isClient && <span className="topbar__avatar">{userName.slice(0, 1).toUpperCase()}</span>}{isClient && <span className="topbar__user">{userName}<small>Cliente</small></span>}<span className="topbar__role">{role === 'admin' ? 'Administrador' : role === 'seller' ? 'Vendedor' : 'Cliente'}</span><button type="button" className="mobile-logout" onClick={onLogout} aria-label="Sair">↪</button></div>
    </header>
  );
}

export default Header;
