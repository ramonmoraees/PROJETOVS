import { clientNavItems as navItems } from './navigationItems';

function BottomNavigation({ currentPage, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavigation;
