import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const modules = [
  { title: 'Clientes', description: 'Cadastros e contatos', icon: '👥' },
  { title: 'Orçamentos', description: 'Propostas e valores', icon: '📋' },
  { title: 'Pedidos', description: 'Acompanhamento de produção', icon: '📦' },
  { title: 'Projetos', description: 'Móveis sob medida', icon: '📐' },
];

function App() {
  return <main className="container">
    <header><div className="brand">D2 <span>Móveis</span></div><span className="tag">Protótipo inicial</span></header>
    <section className="hero"><p>PAINEL DE GESTÃO</p><h1>Organize sua marcenaria em um só lugar.</h1><p>Estrutura inicial do aplicativo D2 Móveis. Os módulos abaixo serão implementados nas próximas etapas.</p></section>
    <section className="cards" aria-label="Módulos planejados">{modules.map(item => <article className="card" key={item.title}><span className="emoji" aria-hidden="true">{item.icon}</span><h2>{item.title}</h2><p>{item.description}</p><small>Em desenvolvimento</small></article>)}</section>
    <footer>Versão inicial demonstrativa — sem login, banco de dados ou dados reais.</footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
