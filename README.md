# D2 Móveis — Gestão

Aplicativo web responsivo para gestão da D2 Móveis: clientes, orçamentos, pedidos e projetos.

## Estado
Estrutura inicial do projeto. Não está publicado e ainda não possui autenticação ou persistência de dados.

## Desenvolvimento
Requisitos: Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

## Produção
```bash
npm run build
```
A pasta `dist/` pode ser publicada como site estático no Render. Configure a regra de rewrite `/* -> /index.html` se adicionar rotas no cliente.

## Próximas etapas
- Autenticação no servidor e autorização por usuário
- Banco de dados e API para clientes, orçamentos, pedidos e projetos
- Validação, testes e implantação no Render

**Importante:** os dados atuais são apenas demonstrativos. Não inserir dados reais de clientes até existir backend seguro.
