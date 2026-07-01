# Roblox Condo

Um site exclusivo de Roblox Condo com interface interativa, efeitos sonoros e logging integrado ao Discord.

## Características

- 🎮 Interface moderna com design cyber/deep space
- 🔐 Sistema de geração de tokens para acesso aos jogos
- 📊 Logging em tempo real para Discord webhook
- 🌍 Suporte a múltiplos idiomas (EN, ES, PT, RU)
- 📱 Design responsivo
- ⚡ Otimizado para performance

## Stack Tecnológico

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Logging**: Discord Webhook Integration
- **Hospedagem**: Vercel

## Instalação Local

### Pré-requisitos
- Node.js 18+
- pnpm

### Setup

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Preview da build
pnpm run preview
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` com as seguintes variáveis:

```env
VITE_ANALYTICS_ENDPOINT=seu_endpoint
VITE_ANALYTICS_WEBSITE_ID=seu_website_id
VITE_APP_ID=seu_app_id
VITE_APP_LOGO=sua_logo_url
VITE_APP_TITLE=Roblox Condo
VITE_FRONTEND_FORGE_API_KEY=sua_api_key
VITE_FRONTEND_FORGE_API_URL=sua_api_url
VITE_OAUTH_PORTAL_URL=seu_oauth_url
```

## Logging do Discord

O site envia eventos em tempo real para um webhook do Discord, incluindo:

- Page views
- Token generation
- Game access attempts
- User interactions
- Application events

### Configurar Webhook

Edite o arquivo `client/src/lib/discord-logger.ts` e substitua a URL do webhook:

```typescript
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/SEU_WEBHOOK_ID/SEU_WEBHOOK_TOKEN';
```

## Deploy no Vercel

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. O deploy acontecerá automaticamente em cada push

## Estrutura do Projeto

```
├── client/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── pages/       # Páginas React
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── lib/         # Utilitários (discord-logger.ts)
│   │   └── index.css    # Estilos globais
│   └── index.html       # HTML principal
├── server/              # Backend (placeholder)
├── shared/              # Código compartilhado
├── vercel.json          # Configuração do Vercel
└── vite.config.ts       # Configuração do Vite
```

## Licença

MIT

## Suporte

Para suporte, abra uma issue no repositório GitHub.
