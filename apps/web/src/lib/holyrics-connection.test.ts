import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  fetchHolyricsConnectionStatus,
  getHolyricsConnectionViewModel,
  type HolyricsConnectionStatus
} from "./holyrics-connection.js";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function createFetch(responses: Response[]) {
  const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
  const fetcher: typeof fetch = async (input, init) => {
    calls.push([input, init]);
    const response = responses.shift();

    if (!response) {
      throw new Error("Unexpected fetch call");
    }

    return response;
  };

  return { fetcher, calls };
}

describe("Holyrics connection status", () => {
  test("reports server offline when the app health check fails", async () => {
    const fetcher: typeof fetch = async () => {
      throw new Error("Failed to fetch");
    };

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "server-offline");
    assert.equal(status.detail, "Failed to fetch");
  });

  test("reports server offline when the app health check is not ok", async () => {
    const { fetcher, calls } = createFetch([jsonResponse({ status: "error" })]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "server-offline");
    assert.equal(calls.length, 1);
  });

  test("reports server offline when the app health check returns an HTTP error", async () => {
    const { fetcher, calls } = createFetch([jsonResponse({ error: "Health failed" }, { status: 503 })]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "server-offline");
    assert.equal(status.detail, "Health failed");
    assert.equal(calls.length, 1);
  });

  test("reports server offline when config cannot be read", async () => {
    const { fetcher, calls } = createFetch([
      jsonResponse({ status: "ok" }),
      jsonResponse({ error: "Config read failed" }, { status: 500 })
    ]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "server-offline");
    assert.equal(status.detail, "Config read failed");
    assert.equal(calls.length, 2);
  });

  test("reports server offline when the config request fails", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);

      if (calls.length === 1) {
        return jsonResponse({ status: "ok" });
      }

      throw new Error("Config fetch failed");
    };

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "server-offline");
    assert.equal(status.detail, "Config fetch failed");
    assert.equal(calls.length, 2);
  });

  test("stops at config when Holyrics is not configured", async () => {
    const { fetcher, calls } = createFetch([
      jsonResponse({ status: "ok" }),
      jsonResponse({
        configured: false,
        source: "none",
        baseUrl: null,
        tokenConfigured: false,
        tokenPreview: null
      })
    ]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "not-configured");
    assert.equal(calls.length, 2);
  });

  test("reports connected when health, config, and GetTokenInfo checks pass", async () => {
    const { fetcher, calls } = createFetch([
      jsonResponse({ status: "ok" }),
      jsonResponse({
        configured: true,
        source: "local",
        baseUrl: "http://127.0.0.1:8091",
        tokenConfigured: true,
        tokenPreview: "to*******en"
      }),
      jsonResponse({
        ok: true,
        version: "2.24.0",
        permissions: "GetTokenInfo"
      })
    ]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "connected");
    assert.equal(status.detail, "Holyrics 2.24.0");
    assert.deepEqual(
      calls.map(([input]) => input),
      ["/api/health", "/api/holyrics/config", "/api/holyrics/config/test"]
    );
    assert.equal(calls[2][1]?.method, "POST");
  });

  test("reports Holyrics offline when config test returns an API error", async () => {
    const { fetcher } = createFetch([
      jsonResponse({ status: "ok" }),
      jsonResponse({
        configured: true,
        source: "env",
        baseUrl: "http://127.0.0.1:8091",
        tokenConfigured: true,
        tokenPreview: "en*******en"
      }),
      jsonResponse({ error: "Holyrics respondeu com HTTP 401." }, { status: 502 })
    ]);

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "holyrics-offline");
    assert.equal(status.detail, "Holyrics respondeu com HTTP 401.");
  });

  test("reports Holyrics offline when the config test request fails", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);

      if (calls.length === 1) {
        return jsonResponse({ status: "ok" });
      }

      if (calls.length === 2) {
        return jsonResponse({
          configured: true,
          source: "local",
          baseUrl: "http://127.0.0.1:8091",
          tokenConfigured: true,
          tokenPreview: "to*******en"
        });
      }

      throw new Error("GetTokenInfo fetch failed");
    };

    const status = await fetchHolyricsConnectionStatus(fetcher);

    assert.equal(status.state, "holyrics-offline");
    assert.equal(status.detail, "GetTokenInfo fetch failed");
    assert.equal(calls[2][1]?.method, "POST");
  });

  test("maps status states to footer labels and tones", () => {
    const statuses: HolyricsConnectionStatus[] = [
      {
        state: "checking",
        message: "Verificando conexao",
        detail: "Consultando servidor local"
      },
      {
        state: "connected",
        message: "Conectado",
        detail: "Holyrics 2.24.0",
        baseUrl: "http://127.0.0.1:8091",
        version: "2.24.0"
      },
      {
        state: "not-configured",
        message: "Configurar Holyrics",
        detail: "URL e token ainda nao foram definidos"
      },
      {
        state: "holyrics-offline",
        message: "Holyrics indisponivel",
        detail: "Holyrics respondeu com HTTP 401.",
        baseUrl: "http://127.0.0.1:8091"
      }
    ];

    assert.deepEqual(
      statuses.map((status) => getHolyricsConnectionViewModel(status).tone),
      ["neutral", "success", "warning", "danger"]
    );
  });
});
