import { navItems } from './navigationItems';

function SidebarNavigation({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Sidebar de navegação">
      <div className="sidebar__brand">
        <span className="brand-mark">AM</span>
        <span>AutoMatch AI</span>
      </div>

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
    </aside>
  );
}

export default SidebarNavigation;
