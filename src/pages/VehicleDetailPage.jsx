import MatchBadge from '../components/MatchBadge';

function VehicleDetailPage({ vehicle, isFavorite, onToggleFavorite, onBack }) {
  if (!vehicle) {
    return (
      <section className="page-card">
        <h2>Veículo não encontrado</h2>
        <p>Não foi possível carregar os detalhes deste veículo.</p>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <button type="button" className="ghost-button" onClick={onBack}>← Voltar</button>

      <img className="detail-page__image" src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />

      <div className="detail-page__content">
        <div className="detail-page__top">
          <div>
            <p className="vehicle-card__brand">{vehicle.brand}</p>
            <h2 className="detail-page__title">{vehicle.model}</h2>
          </div>
          <div className="detail-page__price">R$ {vehicle.price.toLocaleString('pt-BR')}</div>
        </div>

        <MatchBadge percentage={vehicle.matchPercentage} />

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-item__label">Versão</span>
            <span className="detail-item__value">{vehicle.version}</span>
          </div>
          <div className="detail-item">
            <span className="detail-item__label">Ano</span>
            <span className="detail-item__value">{vehicle.year}</span>
          </div>
          <div className="detail-item">
            <span className="detail-item__label">Quilometragem</span>
            <span className="detail-item__value">{vehicle.km.toLocaleString('pt-BR')} km</span>
          </div>
          <div className="detail-item">
            <span className="detail-item__label">Combustível</span>
            <span className="detail-item__value">{vehicle.fuel}</span>
          </div>
          <div className="detail-item">
            <span className="detail-item__label">Câmbio</span>
            <span className="detail-item__value">{vehicle.transmission}</span>
          </div>
          <div className="detail-item">
            <span className="detail-item__label">Localização</span>
            <span className="detail-item__value">{vehicle.city} - {vehicle.state}</span>
          </div>
        </div>

        <p className="detail-page__description">{vehicle.description}</p>

        <div className="detail-actions">
          <button type="button" className="primary-action">Tenho interesse</button>
          <button type="button" className="secondary-action">Fazer proposta</button>
          <button type="button" className="ghost-button" onClick={() => onToggleFavorite(vehicle.id)}>
            {isFavorite ? 'Favoritado' : 'Favoritar'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default VehicleDetailPage;
