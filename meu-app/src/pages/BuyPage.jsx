import { useMemo, useState } from 'react';
import VehicleCard from '../components/VehicleCard';

const quickTypes = ['Todos', 'SUV', 'Sedan', 'Hatch', 'Pickup', 'Elétrico'];
const brands = ['Chevrolet', 'Fiat', 'Volkswagen', 'Toyota', 'Honda', 'Hyundai', 'Jeep'];
const bodyTypes = ['Hatch', 'Sedan', 'SUV', 'Pickup', 'Coupé'];
const categoryByModel = { Civic: 'Sedan', 'Corolla Cross': 'SUV', 'Gol Trend': 'Hatch', Pulse: 'SUV', Onix: 'Hatch', Creta: 'SUV', Renegade: 'SUV', '320i': 'Sedan' };
const initialFilters = { brand: '', model: '', minPrice: '', maxPrice: '', minYear: '', maxYear: '', maxKm: '', transmission: '', fuel: '', body: '', state: '', city: '', minMatch: '' };

function BuyPage({ vehicles, favorites, onSelectVehicle, onToggleFavorite }) {
  const [search, setSearch] = useState('');
  const [quickType, setQuickType] = useState('Todos');
  const [filters, setFilters] = useState(initialFilters);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sort, setSort] = useState('relevance');
  const updateDraft = (key, value) => setDraftFilters((current) => ({ ...current, [key]: value }));
  const applyFilters = () => { setFilters(draftFilters); setIsFilterOpen(false); };
  const clearFilters = () => { setFilters(initialFilters); setDraftFilters(initialFilters); setQuickType('Todos'); setSearch(''); };
  const removeFilter = (key) => { const next = { ...filters, [key]: '' }; setFilters(next); setDraftFilters(next); };
  const filteredVehicles = useMemo(() => {
    const result = vehicles.filter((vehicle) => {
      const text = `${vehicle.brand} ${vehicle.model} ${vehicle.city} ${vehicle.state}`.toLowerCase();
      const category = categoryByModel[vehicle.model] || '';
      return (!search || text.includes(search.toLowerCase())) && (quickType === 'Todos' || category === quickType) && (!filters.brand || vehicle.brand === filters.brand) && (!filters.model || vehicle.model === filters.model) && (!filters.minPrice || vehicle.price >= Number(filters.minPrice)) && (!filters.maxPrice || vehicle.price <= Number(filters.maxPrice)) && (!filters.minYear || vehicle.year >= Number(filters.minYear)) && (!filters.maxYear || vehicle.year <= Number(filters.maxYear)) && (!filters.maxKm || vehicle.km <= Number(filters.maxKm)) && (!filters.transmission || vehicle.transmission === filters.transmission) && (!filters.fuel || vehicle.fuel === filters.fuel) && (!filters.body || category === filters.body) && (!filters.state || vehicle.state.toLowerCase() === filters.state.toLowerCase()) && (!filters.city || vehicle.city.toLowerCase().includes(filters.city.toLowerCase())) && (!filters.minMatch || vehicle.matchPercentage >= Number(filters.minMatch));
    });
    return [...result].sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'match' ? b.matchPercentage - a.matchPercentage : sort === 'km' ? a.km - b.km : b.matchPercentage - a.matchPercentage);
  }, [vehicles, search, quickType, filters, sort]);
  const chips = Object.entries(filters).filter(([, value]) => value).map(([key, value]) => ({ key, label: key === 'minMatch' ? `${value}%+ Match` : key === 'maxPrice' ? `Até R$ ${Number(value).toLocaleString('pt-BR')}` : key === 'maxKm' ? `Até ${Number(value).toLocaleString('pt-BR')} km` : value }));
  const field = (key, label, options) => <label className="filter-field">{label}<select value={draftFilters[key]} onChange={(event) => updateDraft(key, event.target.value)}><option value="">Todos</option>{[...new Set(options)].map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;

  return <section className="buy-page">
    <div className="buy-heading"><div><span className="section-kicker">Marketplace AutoMatch</span><h1>Comprar</h1><p>Encontre o veículo ideal para você.</p></div><button type="button" className="filter-trigger" onClick={() => setIsFilterOpen(true)}>⚙ Filtros</button></div>
    <div className="buy-toolbar"><label className="catalog-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar veículo..." aria-label="Buscar veículo" /></label><button type="button" className="filter-trigger filter-trigger--mobile" onClick={() => setIsFilterOpen(true)}>⚙ Filtros</button></div>
    <div className="quick-filters" aria-label="Tipos de veículo">{quickTypes.map((type) => <button type="button" key={type} className={quickType === type ? 'active' : ''} onClick={() => setQuickType(type)}>{type}</button>)}</div>
    <div className="active-filters">{chips.map((chip) => <button type="button" className="filter-chip" key={chip.key} onClick={() => removeFilter(chip.key)}>{chip.label} ×</button>)}{chips.length > 0 && <button type="button" className="clear-inline" onClick={clearFilters}>Limpar tudo</button>}</div>
    <div className="buy-results-heading"><div><h2>Veículos disponíveis</h2><span>{filteredVehicles.length} veículos encontrados</span></div><label className="sort-control">Ordenar por:<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevance">Mais relevantes</option><option value="match">Maior Match</option><option value="price-low">Menor preço</option><option value="price-high">Maior preço</option><option value="km">Menor quilometragem</option></select></label></div>
    {filteredVehicles.length > 0 ? <div className="vehicle-list">{filteredVehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} isFavorite={favorites.includes(vehicle.id)} onSelect={onSelectVehicle} onToggleFavorite={onToggleFavorite} />)}</div> : <div className="empty-results"><strong>Nenhum veículo encontrado</strong><p>Experimente alterar ou remover alguns filtros.</p><button type="button" className="primary-action" onClick={clearFilters}>Limpar filtros</button></div>}
    {isFilterOpen && <div className="filter-overlay" onClick={() => setIsFilterOpen(false)}><aside className="filter-drawer" onClick={(event) => event.stopPropagation()}><div className="filter-drawer__header"><div><span className="section-kicker">Refine sua busca</span><h2>Filtros</h2></div><button type="button" onClick={() => setIsFilterOpen(false)} aria-label="Fechar filtros">×</button></div><div className="filter-drawer__body"><div className="filter-range"><label className="filter-field">Preço mínimo<input type="number" value={draftFilters.minPrice} onChange={(event) => updateDraft('minPrice', event.target.value)} placeholder="R$ 0" /></label><label className="filter-field">Preço máximo<input type="number" value={draftFilters.maxPrice} onChange={(event) => updateDraft('maxPrice', event.target.value)} placeholder="R$ 300.000" /></label></div>{field('brand', 'Marca', brands)}{field('model', 'Modelo', draftFilters.brand ? vehicles.filter((vehicle) => vehicle.brand === draftFilters.brand).map((vehicle) => vehicle.model) : vehicles.map((vehicle) => vehicle.model))}<div className="filter-range"><label className="filter-field">Ano mínimo<input type="number" value={draftFilters.minYear} onChange={(event) => updateDraft('minYear', event.target.value)} placeholder="2018" /></label><label className="filter-field">Ano máximo<input type="number" value={draftFilters.maxYear} onChange={(event) => updateDraft('maxYear', event.target.value)} placeholder="2024" /></label></div>{field('maxKm', 'Quilometragem máxima', ['25000', '50000', '75000', '100000', '150000'])}{field('transmission', 'Câmbio', ['Automático', 'Manual'])}{field('fuel', 'Combustível', ['Gasolina', 'Flex', 'Diesel', 'Híbrido', 'Elétrico'])}{field('body', 'Carroceria', bodyTypes)}{field('minMatch', 'Match mínimo', ['70', '80', '90'])}<div className="filter-range"><label className="filter-field">Estado<input value={draftFilters.state} onChange={(event) => updateDraft('state', event.target.value)} placeholder="SC" /></label><label className="filter-field">Cidade<input value={draftFilters.city} onChange={(event) => updateDraft('city', event.target.value)} placeholder="Lages" /></label></div></div><div className="filter-drawer__footer"><button type="button" className="ghost-button" onClick={clearFilters}>Limpar filtros</button><button type="button" className="primary-action" onClick={applyFilters}>Mostrar resultados</button></div></aside></div>}
  </section>;
}

export default BuyPage;
