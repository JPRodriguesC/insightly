# Insightly - Aplicação Frontend

Aplicação Next.js para gerenciamento de perfis de usuários e sistema de feedback, integrada com Auth0 para autenticação e uma API NestJS backend.

## 🏗️ Arquitetura

Este projeto é o frontend de uma aplicação full-stack que inclui:

- **Frontend**: Next.js 16 com App Router e TypeScript
- **Autenticação**: Auth0 com middleware personalizado
- **Backend**: API NestJS (container separado)
- **Containerização**: Docker com multi-stage builds

## 🛠️ Tecnologias Principais

- **Framework**: Next.js 16 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Autenticação**: Auth0 (@auth0/nextjs-auth0)
- **Containerização**: Docker (Node.js 20 Alpine)
- **Proxy/Middleware**: Middleware personalizado para Auth0

## 📋 Pré-requisitos para Build

Antes de construir a imagem Docker, certifique-se de ter:

- Docker instalado (versão 20.10+)
- Docker Compose (opcional, para orquestração)
- Acesso às variáveis de ambiente necessárias

## ⚙️ Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Auth0 Configuration
AUTH0_SECRET='[use: openssl rand -hex 32 para gerar]'
APP_BASE_URL='http://localhost:80'
AUTH0_DOMAIN='https://seu-dominio.auth0.com'
AUTH0_CLIENT_ID='seu_client_id_auth0'
AUTH0_CLIENT_SECRET='seu_client_secret_auth0'

# API Configuration
API_BASE_URL='http://api:3001'  # Para comunicação interna entre containers
NEXT_PUBLIC_API_BASE_URL='http://localhost:3001'  # Para cliente
```

### Explicação das Variáveis:

- **AUTH0_SECRET**: Chave secreta de 32 bytes para criptografia de sessão
- **AUTH0_DOMAIN**: Domínio do seu tenant Auth0
- **AUTH0_CLIENT_ID/SECRET**: Credenciais da aplicação Auth0
- **API_BASE_URL**: URL interna para comunicação com a API NestJS
- **NEXT_PUBLIC_API_BASE_URL**: URL pública da API para requisições client-side

## 🐳 Build da Imagem Docker

### Build Simples
```bash
docker build -t insightly-app .
```

### Build com Argumentos Customizados
```bash
docker build \
  --build-arg NODE_ENV=production \
  --tag insightly-app:latest \
  .
```

### Executar Container
```bash
docker run -d \
  --name insightly-app \
  --env-file .env.local \
  -p 80:80 \
  insightly-app:latest
```

## 🔧 Middleware e Proxy

A aplicação utiliza um middleware personalizado (`proxy.ts`) que:

### Rotas Públicas (sem autenticação):
- `/[username]` - Perfis públicos de usuários
- `/[username]/nao-encontrado` - Página de usuário não encontrado
- `/api/users/*/feedback` - Submissão de feedback (POST)
- `/api/users/*` - Busca de usuários (GET)
- Arquivos estáticos (`/_next/*`, `.css`, `.js`, etc.)

### Rotas Protegidas (com Auth0):
- `/profile/*` - Páginas de edição de perfil
- `/auth/*` - Rotas de autenticação Auth0
- Outras rotas da aplicação

### Lógica do Middleware:
1. **Bypass para assets estáticos** - CSS, JS, imagens
2. **Rotas públicas** - Perfis de usuários e APIs de leitura
3. **Integração Auth0** - Autenticação automática para rotas protegidas
4. **Redirecionamento** - Login automático para usuários não autenticados

## 🏃‍♂️ Desenvolvimento Local

### Pré-requisitos
```bash
npm install
```

### Servidor de Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
npm start
```

## 🔗 Integração com Backend

A aplicação se comunica com uma API NestJS que deve estar executando em:
- **Desenvolvimento**: `http://localhost:3001`
- **Docker**: `http://api:3001` (nome do service)

### Endpoints Principais:
- `GET /usuario/:username` - Buscar perfil de usuário
- `PUT /usuario/:username` - Atualizar perfil
- `POST /usuario/:username/feedback` - Adicionar feedback
- `GET /usuario/:username/feedbacks` - Listar feedbacks

## 🚀 Deploy e Produção

### Características do Container de Produção:
- **Imagem Base**: Node.js 20 Alpine (otimizada)
- **Multi-stage Build**: Reduz tamanho da imagem final
- **Usuário não-root**: Executa como `nextjs:nodejs` (UID 1001)
- **Build Otimizado**: Standalone output para máxima eficiência
- **Cache de Dependências**: Layers otimizadas para rebuild rápido

### Estrutura do Dockerfile:
1. **deps**: Instala todas as dependências
2. **prod-deps**: Apenas dependências de produção
3. **builder**: Build da aplicação Next.js
4. **runner**: Imagem final otimizada para produção

### Portas e Exposição:
- **Porta Interna**: 80
- **Hostname**: 0.0.0.0 (aceita conexões externas)
- **Comando**: `node server.js` (standalone mode)

## 🔒 Segurança

### Autenticação:
- **Auth0**: Gerenciamento completo de usuários
- **Middleware**: Proteção automática de rotas sensíveis
- **Session Management**: Cookies seguros e criptografados

### Variáveis Sensíveis:
- Todas as credenciais em variáveis de ambiente
- Secrets não commitados no repositório
- Configuração separada por ambiente

## 📝 Estrutura de Arquivos

```
app/
├── Dockerfile              # Configuração Docker multi-stage
├── proxy.ts               # Middleware Auth0 personalizado
├── .env.local             # Variáveis de ambiente (não versionar)
├── app/                   # Código da aplicação Next.js
│   ├── [username]/        # Rotas públicas de perfil
│   ├── profile/           # Rotas protegidas de edição
│   ├── api/              # API routes do Next.js
│   └── components/       # Componentes reutilizáveis
├── lib/                   # Configurações Auth0
└── public/               # Assets estáticos
```

## 🔧 Troubleshooting

### Problemas Comuns:

1. **Erro 307 Redirect**: Verifique configuração do proxy
2. **Auth0 Loop**: Confirme CLIENT_ID e SECRET corretos
3. **API Connection**: Verifique se backend está executando
4. **Container Fails**: Valide todas as variáveis de ambiente

### Logs úteis:
```bash
docker logs insightly-app
docker logs -f insightly-app  # Follow mode
```

## 📚 Recursos Adicionais

- [Next.js App Router](https://nextjs.org/docs/app)
- [Auth0 Next.js SDK](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Docker Multi-stage Builds](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/)
- [TypeScript](https://www.typescriptlang.org/docs/)
