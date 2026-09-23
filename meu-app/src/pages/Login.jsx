import { useState } from 'react';

const profiles = [
  { id: 'client', label: 'Cliente', icon: '◉', description: 'Encontre o carro ideal para você.' },
  { id: 'seller', label: 'Vendedor', icon: '▣', description: 'Anuncie e encontre compradores.' },
];

function Login({ onLogin }) {
  const [selectedProfile, setSelectedProfile] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isDevelopmentAdmin = email.trim() === 'admin1' && password === 'admin1';
    onLogin({ role: isDevelopmentAdmin ? 'admin' : selectedProfile, email: email || 'demo@automatch.ai' });
  };

  return (
    <main className="login-page login-page--reference">
      <section className="login-intro">
        <div className="login-brand login-brand--reference"><img src="/favicon.svg" alt="" /><span>AutoMatch <em>AI</em></span></div>
        <div className="login-intro__copy">
          <span className="login-rule" aria-hidden="true" />
          <span className="eyebrow">Marketplace inteligente</span>
          <h1>Seu carro<br />encontra o<br /><strong>comprador ideal.</strong></h1>
          <p>Uma experiência mais simples para descobrir, anunciar e negociar veículos.</p>
        </div>
        <div className="login-intro__lower">
          <div className="login-benefits">
            <div><span>♢</span><p><strong>Mais segurança</strong><small>em cada negócio</small></p></div>
            <div><span>ϟ</span><p><strong>Conexões reais</strong><small>entre pessoas</small></p></div>
            <div><span>▥</span><p><strong>O mercado automotivo</strong><small>mais inteligente</small></p></div>
          </div>
          <div className="login-intro__note"><span /> Conectando pessoas aos carros certos</div>
        </div>
        <div className="login-car-placeholder" aria-hidden="true" />
      </section>

      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-panel__header">
          <span className="section-kicker">Acesso seguro</span>
          <h2 id="login-title">Bem-vindo de volta</h2>
          <p>Escolha seu perfil para continuar.</p>
        </div>

        <div className="profile-options">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              className={`profile-option ${selectedProfile === profile.id ? 'selected' : ''}`}
              onClick={() => setSelectedProfile(profile.id)}
            >
              <span className="profile-option__icon" aria-hidden="true">{profile.id === 'client' ? '♙' : '▱'}</span>
              <span><strong>{profile.label}</strong><small>{profile.description}</small></span>
              <span className="profile-option__check" aria-hidden="true">{selectedProfile === profile.id ? '✓' : ''}</span>
            </button>
          ))}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <div className="login-input-wrap"><span aria-hidden="true">✉</span><input id="email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Digite seu e-mail" /></div>
          <label htmlFor="password">Senha</label>
          <div className="login-input-wrap"><span aria-hidden="true">♙</span><input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Digite sua senha" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>{showPassword ? '◉' : '◌'}</button></div>
          <button type="submit" className="primary-action login-submit">Entrar <span aria-hidden="true">→</span></button>
        </form>

        <div className="login-links"><button type="button">Esqueceu sua senha?</button></div>
        <div className="login-create"><span /> <p>Não possui conta? <button type="button">Criar conta</button></p> <span /></div>
      </section>
    </main>
  );
}

export default Login;
