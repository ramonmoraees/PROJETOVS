function HomePage({ onNavigate, vehicles }) {
  const highlightVehicle = vehicles[0];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Marketplace inteligente</span>
          <h1>Seu carro encontra o comprador ideal.</h1>
          <p>
            Compre, venda e troque veículos com mais rapidez, confiança e
            inteligência.
          </p>
        </div>

        <div className="hero-actions">
          <button type="button" className="primary-btn" onClick={() => onNavigate('catalog')}>
            Comprar
          </button>
          <button type="button" className="secondary-btn" onClick={() => onNavigate('profile')}>
            Vender
          </button>
        </div>
      </section>

      <section className="quick-access">
        <button type="button" className="chip" onClick={() => onNavigate('catalog')}>
          Comprar
        </button>
        <button type="button" className="chip" onClick={() => onNavigate('profile')}>
          Vender
        </button>
        <button type="button" className="chip" onClick={() => onNavigate('matches')}>
          Matches
        </button>
        <button type="button" className="chip" onClick={() => onNavigate('favorites')}>
          Favoritos
        </button>
        <button type="button" className="chip" onClick={() => onNavigate('profile')}>
          Perfil
        </button>
      </section>

      <section className="featured-card">
        <div className="featured-card__header">
          <span className="status-badge">Destaque</span>
          <span className="rating-badge">4.9</span>
        </div>

        <img src={highlightVehicle.image} alt={highlightVehicle.model} />

        <div className="featured-card__body">
          <div>
            <p className="car-brand">{highlightVehicle.brand}</p>
            <h3>{highlightVehicle.model}</h3>
          </div>
          <strong>R$ {highlightVehicle.price.toLocaleString('pt-BR')}</strong>
        </div>

        <div className="featured-meta">
          <span>{highlightVehicle.year}</span>
          <span>{highlightVehicle.fuel}</span>
          <span>{highlightVehicle.km} km</span>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
