import VehicleCard from '../components/VehicleCard';

function BuyPage({ vehicles, favorites, onSelectVehicle, onToggleFavorite }) {
  return (
    <section className="catalog-shell">
      <div className="catalog-header">
        <h2>Encontre seu próximo carro</h2>

        <input className="search-input" type="text" placeholder="Buscar por marca, modelo ou cidade" />

        <div className="results-row">
          <span>{vehicles.length} veículos encontrados</span>
          <span>Ordenar por: Relevância</span>
        </div>
      </div>

      <div className="filter-grid">
        <select className="filter-select" defaultValue="">
          <option value="">Marca</option>
          <option value="Honda">Honda</option>
          <option value="Toyota">Toyota</option>
          <option value="Volkswagen">Volkswagen</option>
          <option value="Fiat">Fiat</option>
        </select>

        <select className="filter-select" defaultValue="">
          <option value="">Faixa de preço</option>
          <option value="ate-80k">Até R$ 80 mil</option>
          <option value="80k-120k">R$ 80 mil a R$ 120 mil</option>
          <option value="120k-180k">R$ 120 mil a R$ 180 mil</option>
          <option value="180k+">Acima de R$ 180 mil</option>
        </select>

        <select className="filter-select" defaultValue="">
          <option value="">Ano</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>

        <select className="filter-select" defaultValue="">
          <option value="">Câmbio</option>
          <option value="Manual">Manual</option>
          <option value="Automático">Automático</option>
        </select>
      </div>

      <div className="vehicle-list">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            isFavorite={favorites.includes(vehicle.id)}
            onSelect={onSelectVehicle}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export default BuyPage;
