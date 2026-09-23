import StatCard from '../components/StatCard';
import { vehicles } from '../data/vehicles';

function SellerDashboard({ onNavigate }) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-heading"><div><span className="section-kicker">Visão geral</span><h1>Olá, vendedor.</h1><p>Acompanhe o desempenho dos seus anúncios.</p></div><button type="button" className="primary-action" onClick={() => onNavigate('add-vehicle')}>+ Anunciar veículo</button></div>
      <div className="stats-grid"><StatCard label="Veículos anunciados" value="12" detail="+2 este mês" accent /><StatCard label="Visualizações" value="2.840" detail="+18% vs. mês anterior" /><StatCard label="Interessados" value="86" detail="24 novos contatos" /><StatCard label="Propostas recebidas" value="14" detail="5 aguardando resposta" /></div>
      <section className="dashboard-section"><div className="section-heading"><div><span className="section-kicker">Seu inventário</span><h2>Seus veículos</h2></div><button type="button" className="text-button" onClick={() => onNavigate('my-vehicles')}>Ver todos →</button></div><div className="seller-vehicles">{vehicles.slice(0, 3).map((vehicle) => <article className="seller-vehicle" key={vehicle.id}><img src={vehicle.image} alt="" /><div><strong>{vehicle.brand} {vehicle.model}</strong><span>{vehicle.year} · R$ {vehicle.price.toLocaleString('pt-BR')}</span></div><span className="listing-status">Ativo</span></article>)}</div></section>
    </div>
  );
}

export default SellerDashboard;
