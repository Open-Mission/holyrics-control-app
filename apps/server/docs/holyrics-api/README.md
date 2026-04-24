# Documentação da API do Holyrics

Esta pasta contém a documentação da API do Holyrics separada por contexto para facilitar consulta por devs e por IA.

Fonte original usada para gerar estes arquivos:

```txt
/Users/claudio/Downloads/holyrics-api.md
```

Os arquivos foram recortados mecanicamente a partir da documentação original e preservam o conteúdo dos endpoints/classes.

## Como usar

- Comece por `00-overview.md` e `01-local-requests-and-auth.md` para entender o padrão de requisição local.
- Use `04-actions-index.md` para localizar o nome de uma ação.
- Consulte os arquivos `actions-*.md` para detalhes dos endpoints.
- Consulte os arquivos `classes-*.md` para formatos de dados retornados ou enviados pela API.

## Arquivos por contexto

- `00-overview.md`: visão geral do API Server.
- `01-local-requests-and-auth.md`: chamadas locais, token, hash, `sid`, `rid`, `dtoken` e nonce.
- `02-internet-requests.md`: chamadas via `api.holyrics.com.br`.
- `03-custom-javascript-handler.md`: redirecionamento para handler JavaScript no Holyrics.
- `04-actions-index.md`: índice original das ações disponíveis.
- `actions-auth-and-permissions.md`: token e permissões.
- `actions-songs-lyrics-texts.md`: letras, músicas, textos e versículos.
- `actions-media-files.md`: áudios, vídeos, imagens e arquivos.
- `actions-messages-quiz-quick-presentations.md`: avisos, mensagens customizadas, quiz, countdown e apresentação rápida.
- `actions-automatic-presentations-and-players.md`: apresentações automáticas e players.
- `actions-playlists.md`: playlists de músicas e mídia.
- `actions-apis-scripts-modules.md`: favoritos, APIs, scripts, módulos e ações compostas.
- `actions-presentation-control.md`: apresentação atual, navegação, F8/F9/F10, tema, fundo e thumbnails.
- `actions-schedules-history-groups.md`: alertas, agendas, históricos, grupos, equipes, eventos, avisos e módulos.
- `actions-communication-panel.md`: painel de comunicação.
- `actions-display-wallpaper-and-presets.md`: wallpaper, display, transições, traduções, logos e presets.
- `actions-bible-runtime-and-system.md`: Bíblia, runtime, sync, input, versão, plano e API Server.
- `actions-triggers-rules-and-global-settings.md`: apresentação rápida, gatilhos, tarefas agendadas, configurações globais, modelos, MIDI e regras.
- `actions-items-and-schedule-mutations.md`: templates de transição, criação/edição/exclusão de itens e alterações de agenda.
- `classes-content-and-library.md`: classes de conteúdo, biblioteca e entidades operacionais.
- `classes-display-bible-and-settings.md`: classes de display, Bíblia e configurações.
- `classes-add-items.md`: classes `AddItem`.
- `classes-info-and-events.md`: classes de informações e eventos.

## Regras para implementação futura

- Não integrar com a API do Holyrics diretamente a partir do front-end.
- Centralizar chamadas futuras no server, usando `HOLYRICS_BASE_URL` e `HOLYRICS_TOKEN`.
- Tratar todas as respostas como payload externo não confiável.
- Preferir tipos explícitos em `packages/shared` apenas quando a feature correspondente for implementada.
