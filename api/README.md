# Insightly API - Backend NestJS

API backend para sistema de gerenciamento de perfis de usuários e feedback, construída com NestJS, TypeORM e PostgreSQL. Fornece endpoints RESTful para operações CRUD de usuários, links sociais e sistema de feedback.

## 🏗️ Arquitetura

Esta API serve como backend para a aplicação Insightly, oferecendo:

- **Framework**: NestJS 11 com TypeScript
- **Banco de Dados**: PostgreSQL via TypeORM
- **Documentação**: Swagger/OpenAPI automática
- **Testes**: Jest com cobertura completa
- **Containerização**: Docker multi-stage otimizado
- **Validação**: DTOs com decorators do class-validator

## 🛠️ Stack Tecnológico

- **NestJS**: Framework progressivo para Node.js
- **TypeORM**: ORM para TypeScript e JavaScript
- **PostgreSQL**: Banco de dados relacional
- **Swagger**: Documentação automática da API
- **Jest**: Framework de testes
- **Docker**: Containerização com Alpine Linux
- **ESLint/Prettier**: Linting e formatação de código

## 📋 Pré-requisitos

- **Node.js**: versão 20+
- **npm**: versão 10+
- **PostgreSQL**: versão 13+ (ou acesso ao Supabase)
- **Docker**: versão 20.10+ (opcional)

## ⚙️ Configuração do Ambiente

### Variáveis de Ambiente (.env)

```bash
# Configuração do Banco de Dados
DATABASE_HOST=seu-host-de-postgres
DATABASE_PORT=0000
DATABASE_USER=usuario-postgres
DATABASE_PASSWORD=password-postgres
DATABASE_NAME=postgres
DATABASE_POOL_SIZE=10

# Configuração da Aplicação
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Explicação das Variáveis:

- **DATABASE_***: Configurações de conexão com PostgreSQL
- **DATABASE_POOL_SIZE**: Número máximo de conexões simultâneas
- **PORT**: Porta onde a API será executada
- **FRONTEND_URL**: URL do frontend para configuração de CORS

## 🚀 Instalação e Execução

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo debug
npm run start:debug
```

### Build de Produção

```bash
# Build da aplicação
npm run build

# Executar versão de produção
npm run start:prod
```

## 🐳 Docker

### Build da Imagem

```bash
# Build simples
docker build -t insightly-api .

# Build com tag específica
docker build -t insightly-api:latest .
```

### Execução do Container

```bash
# Executar container
docker run -d \
  --name insightly-api \
  --env-file .env \
  -p 3001:3001 \
  insightly-api:latest

# Via Docker Compose (recomendado)
docker-compose up -d api
```

### Características do Dockerfile:

- **Multi-stage build**: Otimizado para produção
- **Alpine Linux**: Imagem base leve (Node.js 20)
- **Usuário não-root**: Segurança com `nestjs:nodejs` (UID 1001)
- **Health Check**: Monitoramento automático da saúde da API
- **Cache otimizado**: Layers separadas para dependências

## 📖 Documentação da API

### Swagger UI
Acesse `http://localhost:3001/api` para visualizar a documentação interativa.

### Endpoints Principais

#### Usuários
- `POST /usuario` - Criar novo usuário
- `GET /usuario/:username` - Buscar usuário por username
- `GET /usuario/id/:id` - Buscar usuário por ID
- `PUT /usuario/:username` - Atualizar usuário

#### Feedback
- `POST /usuario/:username/feedback` - Adicionar feedback
- `GET /usuario/:username/feedbacks` - Listar feedbacks do usuário

### Exemplos de Requisições

#### Criar Usuário
```bash
POST /usuario
Content-Type: application/json

{
  "nome": "João Silva",
  "biografia": "Desenvolvedor apaixonado por tecnologia",
  "userName": "joaosilva",
  "email": "joao@example.com",
  "links": [
    {
      "titulo": "LinkedIn",
      "url": "https://linkedin.com/in/joaosilva"
    }
  ]
}
```

#### Adicionar Feedback
```bash
POST /usuario/joaosilva/feedback
Content-Type: application/json

{
  "descricao": "Ótimo perfil profissional!"
}
```

## 🗃️ Estrutura do Banco de Dados

### Entidades

#### Usuario
- `Id`: Chave primária
- `Nome`: Nome do usuário
- `Biografia`: Biografia (opcional)
- `UserName`: Nome de usuário único
- `Email`: Email do usuário
- `DataCriacao`: Timestamp de criação

#### Links
- `Id`: Chave primária
- `Titulo`: Título do link social
- `URL`: URL do link
- `UsuarioId`: Referência ao usuário

#### Feedback
- `Id`: Chave primária
- `Descricao`: Texto do feedback
- `DataCriacao`: Timestamp de criação
- `UsuarioId`: Referência ao usuário

### Relacionamentos
- Usuario 1:N Links
- Usuario 1:N Feedbacks

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes com debug
npm run test:debug
```

### Estrutura de Testes

A aplicação possui cobertura completa de testes:

- **Unit Tests**: Testes isolados dos controllers e services
- **Mocks**: Objetos simulados para isolamento de testes

### Exemplo de Teste (usuario.controller.spec.ts):

```typescript
describe('UsuarioController', () => {
  it('deve criar um novo usuário com sucesso', async () => {
    const createUsuarioDto: CreateUsuarioDto = {
      nome: 'João Silva',
      biografia: 'Desenvolvedor apaixonado por tecnologia',
      userName: 'joaosilva',
      email: 'joao@example.com',
      links: [
        { titulo: 'LinkedIn', url: 'https://linkedin.com/in/joaosilva' },
      ],
    };

    mockUsuarioService.create.mockResolvedValue(mockUsuario);

    const result = await controller.create(createUsuarioDto);

    expect(result).toEqual(mockUsuario);
    expect(mockUsuarioService.create).toHaveBeenCalledWith(createUsuarioDto);
    expect(mockUsuarioService.create).toHaveBeenCalledTimes(1);
  });
});
```

## 📁 Estrutura do Projeto

```
api/
├── Dockerfile              # Container multi-stage otimizado
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências e scripts
├── src/
│   ├── app.module.ts      # Módulo principal da aplicação
│   ├── main.ts            # Entry point da aplicação
│   └── usuario/           # Módulo de usuários
│       ├── usuario.controller.ts    # Controller REST
│       ├── usuario.service.ts       # Lógica de negócio
│       ├── usuario.module.ts        # Configuração do módulo
│       ├── dto/                     # Data Transfer Objects
│       │   ├── create-usuario.dto.ts
│       │   ├── update-usuario.dto.ts
│       │   └── add-feedback.dto.ts
│       ├── entities/                # Entidades TypeORM
│       │   ├── usuario.entity.ts
│       │   ├── links.entity.ts
│       │   └── feedback.entity.ts
│       └── mocks/                   # Dados de teste
│           ├── usuario.mock.ts
│           ├── feedback.mock.ts
│           └── service.mock.ts
```

## 🔧 Configuração de Desenvolvimento

### Scripts Disponíveis

```bash
npm run build          # Compilar TypeScript
npm run format         # Formatar código com Prettier
npm run start          # Iniciar aplicação
npm run start:dev      # Modo desenvolvimento com hot-reload
npm run start:debug    # Modo debug
npm run start:prod     # Modo produção
npm run lint           # Executar linting
npm run test           # Testes unitários
npm run test:watch     # Testes em modo watch
```

### Configuração do TypeScript

A aplicação usa configurações otimizadas do TypeScript:
- `tsconfig.json`: Configuração base
- `tsconfig.build.json`: Configuração de build
- **Strict mode**: Ativado para maior segurança de tipos
- **Decorators**: Suporte completo para decorators do NestJS

## 🚀 Deploy e Produção

### Docker Compose

```yaml
services:
  api:
    build:
      context: ./api
    env_file:
      - ./api/.env
    ports:
      - 3001:3001
```

### Health Check

A aplicação inclui health check automático:
- **Endpoint**: `/health` (configurar no controller se necessário)
- **Interval**: 30 segundos
- **Timeout**: 3 segundos
- **Retries**: 3 tentativas

### Otimizações de Produção

- **Build otimizado**: Apenas arquivos necessários na imagem final
- **Node.js production mode**: `NODE_ENV=production`
- **Security**: Execução com usuário não-root
- **Performance**: Connection pooling configurado
- **Monitoring**: Health checks integrados

## 🔒 Segurança

### Configurações de Segurança

- **CORS**: Configurado para frontend específico
- **Validation Pipes**: Validação automática de entrada
- **Environment Variables**: Credenciais em variáveis de ambiente
- **TypeORM**: Proteção contra SQL injection
- **Rate Limiting**: Pode ser configurado via middleware

### Variáveis Sensíveis

```bash
# Nunca commitar no repositório
DATABASE_PASSWORD=*****
# Usar secrets em produção
# Configurar via Docker secrets ou K8s secrets
```

## 📊 Monitoramento

### Logs

```bash
# Logs do container
docker logs insightly-api

# Logs em tempo real
docker logs -f insightly-api
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**:
   ```bash
   # Verificar variáveis de ambiente
   docker exec insightly-api printenv | grep DATABASE
   ```

2. **Port já em uso**:
   ```bash
   # Verificar processo usando a porta
   lsof -i :3001
   ```

3. **Build fails**:
   ```bash
   # Limpar cache do npm
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode

```bash
# Executar com debug
npm run start:debug

# Debug com Docker
docker run -p 3001:3001 -p 9229:9229 insightly-api npm run start:debug
```

## 📚 Recursos e Referências

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
