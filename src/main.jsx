import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const ambientes = [
  { id: 'cozinha', nome: 'Cozinha', icone: '🍽️', frase: 'Planejada para seus melhores encontros.', classe: 'scene-kitchen' },
  { id: 'quarto', nome: 'Quarto', icone: '🛏️', frase: 'Organização que acolhe e inspira.', classe: 'scene-bedroom' },
  { id: 'sala', nome: 'Sala', icone: '🛋️', frase: 'Seu estilo em cada detalhe.', classe: 'scene-living' },
  { id: 'banheiro', nome: 'Banheiro', icone: '🪞', frase: 'Funcionalidade com sofisticação.', classe: 'scene-bath' },
  { id: 'escritorio', nome: 'Escritório', icone: '💻', frase: 'Produtividade no seu espaço.', classe: 'scene-office' },
  { id: 'outro', nome: 'Outro ambiente', icone: '✨', frase: 'Uma solução só sua.', classe: 'scene-other' }
];
const acabamentos = ['Amadeirado claro', 'Amadeirado escuro', 'Branco / off-white', 'Colorido / personalizado', 'Ainda não sei'];
const etapas = [
  { numero: '01', titulo: 'Conte sua ideia', descricao: 'Escolha o ambiente e descreva o móvel que deseja.' },
  { numero: '02', titulo: 'Planejamos juntos', descricao: 'Alinhamos medidas, materiais, estilo e detalhes.' },
  { numero: '03', titulo: 'Seu projeto ganha vida', descricao: 'Após a aprovação, o próximo passo é a produção.' }
];

function IconArrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow-icon">{diagonal ? '↗' : '→'}</span>;
}
function Brand() {
  return <a className="brand" href="#inicio" aria-label="D2 Móveis, voltar ao início"><span className="brand-mark">D<span>2</span></span><span className="brand-copy">MÓVEIS <small>SOB MEDIDA</small></span></a>;
}
function RoomVisual({ classe, icone, nome }) {
  return <div className={'room-visual ' + classe} role="img" aria-label={'Ilustração conceitual: ' + nome}>
    <div className="scene-arch" /><div className="scene-shadow" /><div className="scene-block block-left" /><div className="scene-block block-right" /><div className="scene-table" /><span className="scene-emblem" aria-hidden="true">{icone}</span>
  </div>;
}
function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [ambiente, setAmbiente] = useState('cozinha');
  const [acabamento, setAcabamento] = useState(acabamentos[0]);
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [profundidade, setProfundidade] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [mostrarResumo, setMostrarResumo] = useState(false);
  const selecionados = filtro === 'todos' ? ambientes.slice(0, 5) : ambientes.filter(item => item.id === filtro);
  const resumo = useMemo(() => {
    const local = ambientes.find(item => item.id === ambiente)?.nome || 'Não informado';
    return [
      'Olá! Gostaria de conversar sobre um projeto de móveis sob medida da D2 Móveis.',
      'Ambiente: ' + local,
      'Acabamento: ' + acabamento,
      'Largura aproximada: ' + (largura ? largura + ' cm' : 'A definir'),
      'Altura aproximada: ' + (altura ? altura + ' cm' : 'A definir'),
      'Profundidade aproximada: ' + (profundidade ? profundidade + ' cm' : 'A definir'),
      'Detalhes: ' + (detalhes.trim() || 'A definir'),
      'Gostaria de saber quais são os próximos passos para um orçamento.'
    ].join('\n');
  }, [ambiente, acabamento, largura, altura, profundidade, detalhes]);
  async function copiarResumo() {
    try {
      await navigator.clipboard.writeText(resumo);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
      window.prompt('Copie sua solicitação:', resumo);
    }
  }
  function prepararPedido(event) {
    event.preventDefault();
    setMostrarResumo(true);
    window.setTimeout(() => document.getElementById('resumo-pedido')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
  return <div id="inicio" className="app-shell">
    <div className="top-bar"><span>Um móvel exclusivo começa com uma boa ideia.</span><span className="top-star">✳</span><span>Feito para o seu espaço.</span></div>
    <header className="site-header">
      <div className="nav-wrap"><Brand />
        <button className="menu-toggle" type="button" aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuAberto} onClick={() => setMenuAberto(!menuAberto)}>{menuAberto ? '✕' : '☰'}</button>
        <nav className={menuAberto ? 'nav-links open' : 'nav-links'} aria-label="Navegação principal">
          <a href="#ambientes" onClick={() => setMenuAberto(false)}>Ambientes</a>
          <a href="#como-funciona" onClick={() => setMenuAberto(false)}>Como funciona</a>
          <a href="#sobre" onClick={() => setMenuAberto(false)}>Sobre a D2</a>
          <a className="nav-cta" href="#orcamento" onClick={() => setMenuAberto(false)}>Solicitar orçamento <IconArrow diagonal /></a>
        </nav>
      </div>
    </header>

    <main>
      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> D2 MÓVEIS • SOB MEDIDA</div>
          <h1>Seu espaço.<br /><em>Seu estilo.</em><br />Seu móvel.</h1>
          <p>Mais do que móveis planejados: criamos soluções que combinam beleza, praticidade e a sua personalidade em cada detalhe.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#orcamento">Quero meu projeto <IconArrow diagonal /></a><a className="text-link" href="#ambientes">Explorar ambientes <IconArrow /></a></div>
          <div className="hero-footnote"><span className="small-divider" /><span>Design pensado para você.<br />Cada centímetro importa.</span></div>
        </div>
        <div className="hero-art" role="img" aria-label="Ilustração de um ambiente com móveis planejados em tons naturais">
          <div className="hero-art-glow" /><div className="art-window"><span /><span /></div><div className="art-shelf"><i /><i /><i /></div><div className="art-counter"><div className="art-top" /><div className="art-drawers"><span /><span /><span /></div></div><div className="art-stool stool-one" /><div className="art-stool stool-two" /><div className="art-plant"><i /><i /><i /></div>
          <div className="hero-sticker"><span>✳</span> IDEIAS QUE<br />VIRAM LAR</div>
          <div className="art-caption">AMBIENTES QUE CONTAM SUA HISTÓRIA <span>↗</span></div>
        </div>
      </section>

      <section className="intro-band"><div className="page-width intro-inner"><span>FEITO PARA DURAR</span><span className="intro-separator">✳</span><span>PENSADO PARA ENCANTAR</span><span className="intro-separator">✳</span><span>DO SEU JEITO</span></div></section>

      <section id="ambientes" className="section page-width">
        <div className="section-heading"><div><span className="section-kicker">01 / INSPIRAÇÃO</span><h2>Um novo olhar para <em>cada ambiente.</em></h2></div><p>Todo espaço tem potencial para se tornar extraordinário. Escolha por onde quer começar.</p></div>
        <div className="filter-row" role="group" aria-label="Filtrar ambientes"><button className={filtro === 'todos' ? 'filter active' : 'filter'} onClick={() => setFiltro('todos')}>Todos os ambientes</button>{ambientes.slice(0, 5).map(item => <button key={item.id} className={filtro === item.id ? 'filter active' : 'filter'} onClick={() => setFiltro(item.id)}>{item.nome}</button>)}</div>
        <div className="rooms-grid">{selecionados.map((item, index) => <article className={'room-card ' + (index === 0 && filtro === 'todos' ? 'room-card-featured' : '')} key={item.id}><RoomVisual classe={item.classe} icone={item.icone} nome={item.nome}/><div className="room-description"><div><span>AMBIENTE / {String(index + 1).padStart(2, '0')}</span><h3>{item.nome}</h3><p>{item.frase}</p></div><a href="#orcamento" className="room-link" aria-label={'Criar projeto para ' + item.nome} onClick={() => { setAmbiente(item.id); setMostrarResumo(false); }}>↗</a></div></article>)}</div>
      </section>

      <section id="como-funciona" className="process-section"><div className="page-width"><div className="section-heading process-heading"><div><span className="section-kicker">02 / PROCESSO</span><h2>Da primeira ideia<br />ao <em>seu novo espaço.</em></h2></div><p>Um caminho simples, com atenção aos detalhes em cada etapa.</p></div><div className="steps">{etapas.map(item => <article className="step" key={item.numero}><span className="step-number">{item.numero}</span><span className="step-symbol">✳</span><h3>{item.titulo}</h3><p>{item.descricao}</p></article>)}</div></div></section>

      <section id="orcamento" className="quote-section page-width">
        <div className="quote-intro"><span className="section-kicker">03 / SEU PROJETO</span><h2>Vamos tirar sua ideia <em>do papel?</em></h2><p>Conte um pouco do que você imagina. Prepare uma descrição do projeto para compartilhar com a D2 Móveis.</p><div className="quote-tip"><span>✦</span><span>Não precisa ter todas as medidas agora. Esse é apenas o primeiro passo da conversa.</span></div></div>
        <div className="quote-card"><div className="form-header"><span>SOLICITAÇÃO DE PROJETO</span><span className="form-icon">↗</span></div><form onSubmit={prepararPedido}>
          <label htmlFor="ambiente">Qual ambiente você deseja planejar?</label><select id="ambiente" value={ambiente} onChange={event => { setAmbiente(event.target.value); setMostrarResumo(false); }}>{ambientes.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}</select>
          <label htmlFor="acabamento">Qual acabamento combina com você?</label><select id="acabamento" value={acabamento} onChange={event => { setAcabamento(event.target.value); setMostrarResumo(false); }}>{acabamentos.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <div className="dimensions-label">Medidas aproximadas (opcional)</div><div className="dimension-grid"><div><label htmlFor="largura">Largura (cm)</label><input id="largura" inputMode="decimal" type="number" min="1" max="10000" placeholder="Ex.: 250" value={largura} onChange={event => { setLargura(event.target.value); setMostrarResumo(false); }} /></div><div><label htmlFor="altura">Altura (cm)</label><input id="altura" inputMode="decimal" type="number" min="1" max="10000" placeholder="Ex.: 240" value={altura} onChange={event => { setAltura(event.target.value); setMostrarResumo(false); }} /></div><div><label htmlFor="profundidade">Prof. (cm)</label><input id="profundidade" inputMode="decimal" type="number" min="1" max="10000" placeholder="Ex.: 60" value={profundidade} onChange={event => { setProfundidade(event.target.value); setMostrarResumo(false); }} /></div></div>
          <label htmlFor="detalhes">Conte mais sobre seu projeto</label><textarea id="detalhes" rows="3" maxLength="1000" placeholder="Ex.: Preciso de um armário com portas de correr e espaço para sapatos..." value={detalhes} onChange={event => { setDetalhes(event.target.value); setMostrarResumo(false); }} />
          <button className="btn btn-primary form-submit" type="submit">Preparar minha solicitação <IconArrow diagonal /></button>
        </form>{mostrarResumo && <div className="quote-summary" id="resumo-pedido" role="status"><h3>Seu resumo está pronto!</h3><p>Confira a mensagem e compartilhe para solicitar seu orçamento.</p><pre>{resumo}</pre><div className="summary-actions"><button type="button" className="btn btn-outline" onClick={copiarResumo}>{copiado ? '✓ Copiado!' : 'Copiar mensagem'}</button><a className="btn btn-primary" href={'https://wa.me/?text=' + encodeURIComponent(resumo)} target="_blank" rel="noopener noreferrer">Compartilhar no WhatsApp ↗</a></div><small>O site não envia nem armazena esta solicitação. O WhatsApp abre sem destinatário definido; escolha o contato da D2 Móveis.</small></div>}</div>
      </section>

      <section id="sobre" className="about-section"><div className="page-width about-inner"><div className="about-emblem">D<span>2</span><small>MÓVEIS</small></div><div><span className="section-kicker">MAIS DO QUE MARCENARIA</span><h2>O melhor projeto é aquele que tem <em>a sua cara.</em></h2><p>Na D2 Móveis, acreditamos que cada ambiente merece um cuidado especial. Nosso foco é transformar necessidades em soluções sob medida, respeitando o jeito de viver de cada pessoa.</p><a className="text-link light-link" href="#orcamento">Comece seu projeto <IconArrow diagonal /></a></div></div></section>
    </main>
    <footer className="site-footer"><div className="page-width"><div className="footer-main"><Brand /><p>Seu espaço. Seu estilo. Seu móvel.</p><a href="#inicio" className="back-top">Voltar ao topo ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} D2 Móveis • Todos os direitos reservados.</span><span>Site demonstrativo • Formulário sem envio automático</span></div></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
