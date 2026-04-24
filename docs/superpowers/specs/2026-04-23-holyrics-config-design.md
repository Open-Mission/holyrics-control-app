# Holyrics Config Design

## Goal

Allow the local control app to configure the Holyrics API base URL and token through the server and web UI, while keeping all direct Holyrics calls inside the Fastify server.

## Current Context

- The server is a Fastify app in `apps/server/src/index.ts`.
- The web app is a React/Vite app in `apps/web/src`.
- `apps/server/docs/holyrics-api/README.md` states that future integrations must be centralized in the server using `HOLYRICS_BASE_URL` and `HOLYRICS_TOKEN`.
- `apps/server/docs/holyrics-api/01-local-requests-and-auth.md` documents local requests as `http://[IP]:[PORT]/api/{action}?token=abcdef`.
- `apps/server/docs/holyrics-api/actions-auth-and-permissions.md` documents `GetTokenInfo` as a useful token validation action.
- `SettingsPage` is currently a placeholder.

## Chosen Approach

Use a hybrid configuration source:

1. Environment variables are the highest-priority source:
   - `HOLYRICS_BASE_URL`
   - `HOLYRICS_TOKEN`
2. If either environment variable is missing, the server falls back to a local JSON config file.
3. The web UI can save the local JSON config through server endpoints.
4. The server never returns the raw token to the browser.

## Server Design

Create a focused Holyrics config module under `apps/server/src/modules/holyrics`.

Responsibilities:

- Normalize the base URL by trimming whitespace and removing trailing slashes.
- Validate the base URL with the standard `URL` parser and accept only `http:` or `https:`.
- Validate token presence by trimming whitespace and rejecting an empty token.
- Resolve active config using environment variables first, then local file fallback.
- Return status responses that include `configured`, `source`, `baseUrl`, `tokenConfigured`, and a masked token preview.
- Save local config to a JSON file.
- Validate connectivity with Holyrics through `GetTokenInfo` from the server only.

The local config file path defaults to `.holyrics-config.json` at the project runtime root, with optional override by `HOLYRICS_CONFIG_FILE`.

## API Design

Add these Fastify routes:

- `GET /api/holyrics/config`
  - Returns whether config is complete.
  - Returns the active source as `env`, `local`, or `none`.
  - Returns the active base URL when present.
  - Returns masked token metadata only.

- `PUT /api/holyrics/config`
  - Accepts `{ "baseUrl": string, "token": string }`.
  - Saves local config.
  - Returns the same safe status payload.
  - Does not override environment variables; if env config exists, it remains the active source.

- `POST /api/holyrics/config/test`
  - Resolves active config and calls `POST {baseUrl}/api/GetTokenInfo?token={token}` with `{}`.
  - Returns `{ "ok": true, "version": string | null, "permissions": string | null }` for Holyrics `status=ok`.
  - Returns a controlled error response for missing config, invalid URL, connection failure, or Holyrics `status=error`.

## Shared Types

Extend `packages/shared/src/index.ts` with public API types:

- `HolyricsConfigSource`
- `HolyricsConfigStatus`
- `SaveHolyricsConfigRequest`
- `HolyricsConfigTestResult`

These types must not expose the raw token in any response type.

## Web Design

Update `apps/web/src/pages/SettingsPage.tsx` from placeholder to a functional configuration screen:

- On load, fetch `GET /api/holyrics/config`.
- If not configured, show fields for URL and token.
- If configured, show base URL, source, and masked token.
- Allow saving local config with `PUT /api/holyrics/config`.
- Allow testing the active config with `POST /api/holyrics/config/test`.
- Show inline success/error state without exposing token text after save.

Update `apps/web/src/pages/HomePage.tsx` to fetch the same config status and show whether the Holyrics integration is configured.

## Error Handling

- Front-end network errors show concise user-facing messages.
- Server validation errors return HTTP 400.
- Missing active config for test returns HTTP 409.
- Holyrics connectivity failures return HTTP 502.
- All Holyrics response payloads are treated as external data and narrowed before use.

## Testing

Use Node's built-in test runner with `tsx` for server module tests:

- Resolve env config before local config.
- Resolve local config when env is missing.
- Report missing config safely.
- Reject invalid URL.
- Save local config and return masked token.

Run full verification with:

- `pnpm --filter @holyrics-control/server exec node --import tsx --test src/modules/holyrics/config.test.ts`
- `pnpm build`
- `pnpm lint`

## Scope Exclusions

- Do not implement broad Holyrics action wrappers beyond the config test call.
- Do not send Holyrics requests directly from the browser.
- Do not implement encrypted-at-rest token storage in this pass.
- Do not implement user accounts or auth gates in this pass.
