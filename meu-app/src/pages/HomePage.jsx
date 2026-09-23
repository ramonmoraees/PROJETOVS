import VehicleCard from '../components/VehicleCard';

const summaryItems = [
  { icon: '♡', value: '8', label: 'Favoritos' },
  { icon: '✦', value: '12', label: 'Matches' },
  { icon: '◌', value: '3', label: 'Propostas' },
  { icon: '◉', value: '15', label: 'Visualizados recentemente' },
];

function HomePage({ onNavigate, vehicles, favorites, onSelectVehicle, onToggleFavorite }) {
  return (
    <div className="client-home">
      <section className="client-welcome"><div><span className="section-kicker">Seu espaço AutoMatch</span><h1>Olá, Ramon <span aria-hidden="true">👋</span></h1><p>Vamos encontrar seu próximo carro?</p></div><button type="button" className="primary-action" onClick={() => onNavigate('catalog')}>Encontrar meu carro <span aria-hidden="true">→</span></button></section>
      <section className="ai-search-card"><div className="ai-search-card__copy"><span className="ai-sparkle">✦</span><div><span className="section-kicker">Busca AutoMatch AI</span><h2>Encontre o carro ideal para você</h2><p>Conte ao AutoMatch AI o que você está procurando.</p></div></div><div className="ai-search-card__form"><input type="search" placeholder="Ex: Quero um SUV automático até R$ 100 mil..." aria-label="Descreva o carro ideal" /><button type="button" className="primary-action" onClick={() => onNavigate('catalog')}>✦ Buscar com AutoMatch AI</button></div></section>
      <section className="client-summary" aria-label="Resumo do usuário">{summaryItems.map((item) => <article className="summary-card" key={item.label}><span className="summary-card__icon">{item.icon}</span><div><strong>{item.value}</strong><span>{item.label}</span></div></article>)}</section>
      <section className="recommendations-section"><div className="client-section-heading"><div><span className="section-kicker">Seleção personalizada</span><h2>Recomendados para você</h2><p>Veículos que combinam com o seu perfil.</p></div><button type="button" className="text-button" onClick={() => onNavigate('catalog')}>Ver todos <span aria-hidden="true">→</span></button></div><div className="recommended-grid">{vehicles.slice(0, 4).map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} isFavorite={favorites.includes(vehicle.id)} onSelect={onSelectVehicle} onToggleFavorite={onToggleFavorite} />)}</div></section>
    </div>
  );
}

export default HomePage;
