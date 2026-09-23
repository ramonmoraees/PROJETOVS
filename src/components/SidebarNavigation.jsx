import { adminNavItems, clientNavItems, sellerNavItems } from './navigationItems';

function SidebarNavigation({ role, currentPage, onNavigate, onLogout }) {
  const navItems = role === 'seller' ? sellerNavItems : role === 'admin' ? adminNavItems : clientNavItems;
  const roleLabel = role === 'seller' ? 'Vendedor' : role === 'admin' ? 'Administrador' : 'Cliente';

  return (
    <aside className="sidebar" aria-label="Sidebar de navegação">
      <div className="sidebar__brand">
        <span className="brand-mark">AM</span>
        <span>AutoMatch <em>AI</em></span>
      </div>
      <div className="sidebar__profile"><span className="avatar small">{role === 'admin' ? 'AD' : role === 'seller' ? 'VE' : 'CL'}</span><div><strong>{roleLabel}</strong><span>Acesso demonstrativo</span></div></div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar__item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar__icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      {role === 'client' && <div className="sidebar__secondary"><button type="button" className={`sidebar__item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => onNavigate('settings')}><span className="sidebar__icon">⚙</span><span>Configurações</span></button><button type="button" className={`sidebar__item ${currentPage === 'help' ? 'active' : ''}`} onClick={() => onNavigate('help')}><span className="sidebar__icon">?</span><span>Ajuda</span></button></div>}
      <button type="button" className="sidebar__logout" onClick={onLogout}><span>↪</span> Sair</button>
    </aside>
  );
}

export default SidebarNavigation;
