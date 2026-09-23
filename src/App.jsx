import { useState } from 'react';
import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RolePlaceholderPage from './pages/RolePlaceholderPage';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import SidebarNavigation from './components/SidebarNavigation';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import { vehicles as initialVehicles } from './data/vehicles';

const pageTitles = {
  home: 'Home',
  catalog: 'Comprar',
  detail: 'Detalhes',
  matches: 'Matches',
  favorites: 'Favoritos',
  profile: 'Perfil',
  dashboard: 'Dashboard',
  'my-vehicles': 'Meus veículos',
  'add-vehicle': 'Adicionar veículo',
  leads: 'Interessados',
  proposals: 'Propostas',
  users: 'Usuários',
  vehicles: 'Veículos',
  stores: 'Lojas',
  ads: 'Anúncios',
  reports: 'Relatórios',
  settings: 'Configurações',
  help: 'Ajuda',
};

function App() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [favorites, setFavorites] = useState([2]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [session, setSession] = useState(null);

  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId) || null;

  const toggleFavorite = (vehicleId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(vehicleId)) {
        return currentFavorites.filter((id) => id !== vehicleId);
      }

      return [...currentFavorites, vehicleId];
    });
  };

  const handleOpenVehicle = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setCurrentPage('detail');
  };

  const handleLogin = (user) => {
    setSession(user);
    setCurrentPage(user.role === 'client' ? 'home' : 'dashboard');
  };

  const handleLogout = () => {
    setSession(null);
    setCurrentPage('home');
  };

  if (!session) return <Login onLogin={handleLogin} />;

  const role = session.role;

  const renderPage = () => {
    if (role === 'seller') {
      if (currentPage === 'dashboard') return <SellerDashboard onNavigate={setCurrentPage} />;
      return <RolePlaceholderPage title={pageTitles[currentPage]} description="Organize sua operação de vendas e acompanhe cada oportunidade em um só lugar." />;
    }

    if (role === 'admin') {
      if (currentPage === 'dashboard') return <AdminDashboard />;
      return <RolePlaceholderPage title={pageTitles[currentPage]} description="Os controles desta área estarão disponíveis em uma próxima etapa da plataforma." />;
    }

    switch (currentPage) {
      case 'settings':
        return <section className="page-card placeholder-page"><span className="section-kicker">Preferências</span><h1>Configurações</h1><p>As preferências da sua conta estarão disponíveis em uma próxima etapa.</p></section>;
      case 'help':
        return <section className="page-card placeholder-page"><span className="section-kicker">Central AutoMatch</span><h1>Ajuda</h1><p>Encontre respostas e suporte para sua jornada de compra.</p></section>;
      case 'catalog':
        return (
          <BuyPage
            vehicles={vehicles}
            favorites={favorites}
            onSelectVehicle={handleOpenVehicle}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'detail':
        return (
          <VehicleDetailPage
            vehicle={selectedVehicle}
            isFavorite={selectedVehicle ? favorites.includes(selectedVehicle.id) : false}
            onToggleFavorite={toggleFavorite}
            onBack={() => setCurrentPage('catalog')}
          />
        );
      case 'matches':
        return (
          <section className="page-card">
            <h2>Matches</h2>
            <p>Seus matches aparecerão aqui.</p>
            <div className="catalog-list">
              <article className="mini-card match-card">
                <span className="mini-card__badge">Novo match</span>
                <h3>VW Gol 2022</h3>
                <p>Compra direta • 96% de compatibilidade</p>
              </article>
            </div>
          </section>
        );
      case 'favorites':
        return (
          <section className="page-card">
            <h2>Favoritos</h2>
            <p>Veículos salvos para comparar depois.</p>
            <div className="catalog-list">
              {vehicles
                .filter((vehicle) => favorites.includes(vehicle.id))
                .map((vehicle) => (
                  <article key={vehicle.id} className="mini-card">
                    <span className="mini-card__badge">Favorito</span>
                    <h3>{vehicle.model}</h3>
                    <p>{vehicle.year} • {vehicle.city}</p>
                    <strong>R$ {vehicle.price.toLocaleString('pt-BR')}</strong>
                  </article>
                ))}
            </div>
          </section>
        );
      case 'profile':
        return (
          <section className="page-card profile-card">
            <h2>Perfil</h2>
            <div className="profile-box">
              <div className="avatar">AM</div>
              <div>
                <h3>AutoMatch AI</h3>
                <p>Vendedor e comprador</p>
              </div>
            </div>
            <ul className="profile-list">
              <li>Veículos publicados: 4</li>
              <li>Matches recentes: 2</li>
              <li>Localização: São Paulo</li>
            </ul>
          </section>
        );
      case 'home':
      default:
        return <HomePage onNavigate={setCurrentPage} vehicles={vehicles} favorites={favorites} onSelectVehicle={handleOpenVehicle} onToggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <div className={`app-shell app-shell--${role}`}>
      <SidebarNavigation role={role} currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />

      <div className="content-shell">
        <Header title={pageTitles[currentPage]} role={role} userName={session.email === 'demo@automatch.ai' ? 'Ramon' : session.email?.split('@')[0] || 'Ramon'} onLogout={handleLogout} />
        <main className="main-content">{renderPage()}</main>
        {role === 'client' && <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} />}
      </div>
    </div>
  );
}

export default App;
