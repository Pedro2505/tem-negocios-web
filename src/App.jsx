import { useState } from 'react';
import './index.css';
import logo from './assets/logo.png';

function App() {
  const imoveisData = [
    { 
      id: 1, 
      tipo: 'Casa de Alto Padrão', 
      local: 'Jardins, SP', 
      preco: 'R$ 2.500.000', 
      quartos: 4, 
      banheiros: 5, 
      vagas: 3, 
      area: '320m²',
      imagem: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
      tag: 'Exclusividade'
    },
    { 
      id: 2, 
      tipo: 'Apartamento Moderno', 
      local: 'Centro, RJ', 
      preco: 'R$ 850.000', 
      quartos: 2, 
      banheiros: 2, 
      vagas: 1, 
      area: '85m²',
      imagem: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
      tag: 'Oportunidade'
    },
    { 
      id: 3, 
      tipo: 'Cobertura Duplex', 
      local: 'Savassi, MG', 
      preco: 'R$ 1.800.000', 
      quartos: 3, 
      banheiros: 4, 
      vagas: 2, 
      area: '210m²',
      // Adeus elefante! Nova foto de cobertura de luxo:
      imagem: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600',
      tag: 'Lançamento'
    },
  ];

  // Estados da Aplicação
  const [buscaLocal, setBuscaLocal] = useState('');
  const [imoveisFiltrados, setImoveisFiltrados] = useState(imoveisData);
  const [favoritos, setFavoritos] = useState([]); // Array para guardar os IDs favoritos
  const [painelAtivo, setPainelAtivo] = useState(false);

  // Lógica de Busca
  const realizarBusca = () => {
    const resultado = imoveisData.filter((imovel) =>
      imovel.local.toLowerCase().includes(buscaLocal.toLowerCase())
    );
    setImoveisFiltrados(resultado);
  };

  // Lógica de Favoritar
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id)); // Remove se já tiver
    } else {
      setFavoritos([...favoritos, id]); // Adiciona se não tiver
    }
  };

  return (
    <div className="app-container">
      {/* Botão de Alternância do Painel */}
      <button 
        onClick={() => setPainelAtivo(!painelAtivo)} 
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, padding: '12px 24px', backgroundColor: '#008080', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
      >
        {painelAtivo ? "Voltar ao Site" : "Acessar Painel"}
      </button>

      {painelAtivo ? (
        <section className="painel-admin" style={{ padding: '100px 10%', minHeight: '80vh', textAlign: 'center' }}>
          <h2>Painel do Corretor</h2>
          <p>Área exclusiva para gestão de imóveis.</p>
        </section>
      ) : (
        <>
          {/* AQUI VAI TODO O SEU CÓDIGO ATUAL QUE JÁ ESTÁ FUNCIONANDO */}
          <nav className="navbar">
            <img src={logo} alt="Logo Tem Negócios Imobiliários" className="logo-nav" />
            <ul className="nav-links">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#imoveis">Imóveis</a></li>
              <li><a href="#sobre">Sobre a Rede</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>

          <main id="inicio" className="hero-dividido">
            <div className="hero-texto">
              <h1>Conectamos sonhos a grandes negócios.</h1>
              <p>Mais método. Mais confiança. Mais vendas. Um ecossistema de alta eficiência.</p>
            </div>
            <div className="hero-imagem">
              <img src={logo} alt="Logo Tem Negócios" className="logo-gigante" />
            </div>
          </main>

          <div className="busca-wrapper">
            <form className="busca-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Digite a cidade ou bairro..." className="busca-input" value={buscaLocal} onChange={(e) => setBuscaLocal(e.target.value)} />
              <button type="button" className="btn-buscar" onClick={realizarBusca}>Buscar</button>
            </form>
          </div>

          <section id="imoveis" className="vitrine">
            <h2>Imóveis em Destaque</h2>
            <div className="grid-imoveis">
              {imoveisFiltrados.map((imovel) => {
                const isFavorito = favoritos.includes(imovel.id);
                return (
                  <div key={imovel.id} className="card-imovel">
                    <div className="card-imagem-wrapper">
                      <span className="card-badge">{imovel.tag}</span>
                      <button className={`btn-favorito ${isFavorito ? 'ativo' : ''}`} onClick={() => toggleFavorito(imovel.id)}>
                        {isFavorito ? '❤️' : '🤍'}
                      </button>
                      <img src={imovel.imagem} alt={imovel.tipo} className="card-foto-img" />
                    </div>
                    <div className="card-info">
                      <h3>{imovel.tipo}</h3>
                      <p className="local">{imovel.local}</p>
                      <div className="detalhes-imovel">
                        <span>🛏️ {imovel.quartos}</span><span>🚿 {imovel.banheiros}</span><span>🚗 {imovel.vagas}</span>
                      </div>
                      <p className="preco">{imovel.preco}</p>
                      <button className="btn-detalhes">Mais Detalhes</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="sobre" className="sobre-rede">
            <h2>O Método Tem Negócios</h2>
            <div className="sobre-grid">
              <div className="sobre-card"><h3>Inteligência Artificial</h3><p>Tecnologia que multiplica seu tempo.</p></div>
              <div className="sobre-card"><h3>Gestão (CRM)</h3><p>Organize relacionamentos e resultados.</p>
              </div>
            </div>
          </section>

          <footer id="contato" className="footer">
            <img src={logo} alt="Logo" className="footer-logo" />
            <p>&copy; 2026 Tem Negócios Imobiliários.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;