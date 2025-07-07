# 🚀 Crypto Dashboard

> Um dashboard moderno e responsivo para acompanhar criptomoedas em tempo real, desenvolvido com React, TypeScript e Tailwind CSS.

## 📸 Preview

<!-- Adicione aqui o screenshot da homepage do projeto -->
![Homepage Preview](./docs/homepage-preview.png)

## 🎯 Sobre o Projeto

O Crypto Dashboard é uma aplicação web moderna que permite aos usuários acompanhar o mercado de criptomoedas em tempo real. O projeto foi desenvolvido com foco em performance, acessibilidade e experiência do usuário, utilizando as melhores práticas de desenvolvimento frontend.

### ✨ Funcionalidades

- 📊 **Visualização em tempo real** de preços de criptomoedas
- 💱 **Múltiplas moedas** (USD, EUR, BRL) com conversão automática
- 📈 **Gráficos interativos** com diferentes períodos ( 7D, 30D, 1A)
- 🌙 **Tema claro/escuro** com persistência de preferências
- 📱 **Design responsivo** para desktop, tablet e mobile
- ⚡ **Performance otimizada** com cache inteligente
- ♿ **Acessibilidade** seguindo padrões WCAG
- 🔄 **Atualizações automáticas** dos dados de mercado
- 💾 **Persistência de estado** das preferências do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Biblioteca para animações

### UI Components
- **HeroUI** - Sistema de componentes modernos
- **Lucide React** - Ícones SVG otimizados
- **React Hot Toast** - Notificações elegantes

### Estado e Dados
- **Zustand** - Gerenciamento de estado global
- **TanStack Query** - Cache e sincronização de dados
- **Axios** - Cliente HTTP para APIs

### Gráficos e Visualização
- **ApexCharts** - Biblioteca de gráficos interativos
- **React ApexCharts** - Wrapper React para ApexCharts

### Testes
- **Cypress** - Testes end-to-end
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

### APIs
- **CoinGecko API** - Dados de criptomoedas
- **ExchangeRate API** - Taxas de câmbio

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gildairmoreira/crypto-dash.git

# Entre no diretório
cd crypto-dashb

# Instale as dependências
pnpm install

# Execute o projeto em modo de desenvolvimento
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview

# Linting
pnpm lint

# Testes E2E
pnpm test:e2e
pnpm test:e2e:open
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Dashboard.tsx    # Componente principal do dashboard
│   ├── Header.tsx       # Cabeçalho com seletor de moeda
│   ├── MarketChart.tsx  # Gráfico de mercado
│   └── ...
├── hooks/              # Custom hooks
├── queries/            # Queries do TanStack Query
├── store/              # Estado global (Zustand)
├── service/            # Serviços de API
├── utils/              # Funções utilitárias
├── constants/          # Constantes da aplicação
└── interfaces.ts       # Tipos TypeScript
```

## 🎨 Design System

- **Cores**: Paleta moderna com suporte a tema claro/escuro
- **Tipografia**: Inter font para melhor legibilidade
- **Espaçamento**: Sistema consistente baseado em múltiplos de 4px
- **Componentes**: Reutilizáveis e acessíveis
- **Responsividade**: Mobile-first approach

## 📊 Funcionalidades Técnicas

### Performance
- ⚡ Lazy loading de componentes
- 🗄️ Cache inteligente com TanStack Query
- 📦 Code splitting automático
- 🖼️ Otimização de imagens

### Acessibilidade
- ♿ Navegação por teclado
- 🔊 Screen reader friendly
- 🎨 Alto contraste
- 📱 Suporte a zoom até 200%

### SEO
- 🏷️ Meta tags otimizadas
- 📱 Responsive design
- ⚡ Core Web Vitals otimizados

## 🧪 Testes

O projeto inclui uma suíte completa de testes E2E com Cypress:

- ✅ Testes de fluxo principal
- ✅ Testes de componentes individuais
- ✅ Testes de responsividade
- ✅ Testes de acessibilidade
- ✅ Testes de mudança de tema
- ✅ Testes de seleção de moeda

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**gildair**
- GitHub: [@gildairmoreira](https://github.com/g)
- LinkedIn: [gildair](https://linkedin.com/in/gildair-moreira)
- Email: gildair457@gmail.com

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!

---

*Desenvolvido com ❤️ e muito ☕*
