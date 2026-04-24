# Holyrics Control

Base inicial do app web para controlar o Holyrics via API em uma rede local. O projeto usa Vite, React, Fastify, TypeScript, pnpm workspaces, Tailwind CSS e shadcn/ui.

Esta etapa contém apenas a estrutura inicial. Ainda não há integração com Holyrics, autenticação ou features de músicas, Bíblia, playlists e apresentação.

## Instalar dependências

```bash
pnpm install
```

## Rodar em desenvolvimento

```bash
pnpm dev
```

Também é possível rodar cada app separadamente:

```bash
pnpm dev:web
pnpm dev:server
```

## Gerar build

```bash
pnpm build
```

## Iniciar o servidor local

Copie as variáveis de ambiente necessárias a partir de `.env.example` e execute:

```bash
pnpm start
```

Por padrão, o servidor lê `APP_PORT` e `APP_HOST`, expõe `GET /api/health` e serve o build estático do front-end gerado em `apps/web/dist`.
