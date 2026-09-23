import MatchBadge from './MatchBadge';

function VehicleCard({ vehicle, isFavorite, onSelect, onToggleFavorite }) {
  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onToggleFavorite(vehicle.id);
  };

  return (
    <article className="vehicle-card">
      <img className="vehicle-card__image" src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />

      <div className="vehicle-card__body">
        <div className="vehicle-card__top">
          <div>
            <p className="vehicle-card__brand">{vehicle.brand}</p>
            <h3 className="vehicle-card__title">{vehicle.model}</h3>
          </div>

          <button
            type="button"
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Favoritar veículo"
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        <MatchBadge percentage={vehicle.matchPercentage} />

        <div className="vehicle-card__meta">
          {vehicle.year} • {vehicle.km.toLocaleString('pt-BR')} km
        </div>

        <div className="vehicle-card__location">
          {vehicle.city} - {vehicle.state}
        </div>

        <div className="vehicle-card__footer">
          <div className="vehicle-card__price">R$ {vehicle.price.toLocaleString('pt-BR')}</div>
          <button type="button" className="link-button" onClick={() => onSelect(vehicle.id)}>
            Ver veículo
          </button>
        </div>
      </div>
    </article>
  );
}

export default VehicleCard;
