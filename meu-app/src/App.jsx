import { useState } from 'react';
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
};

function App() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [favorites, setFavorites] = useState([2]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

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

  const renderPage = () => {
    switch (currentPage) {
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
        return <HomePage onNavigate={setCurrentPage} vehicles={vehicles} />;
    }
  };

  return (
    <div className="app-shell">
      <SidebarNavigation currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="content-shell">
        <Header title={pageTitles[currentPage]} />
        <main className="main-content">{renderPage()}</main>
        <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
