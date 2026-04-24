import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { executeHolyricsAction } from "./client.js";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json" }
  });
}

describe("executeHolyricsAction", () => {
  test("posts action body with configured token", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({ status: "ok", data: [{ id: "abc" }] });
    };

    const data = await executeHolyricsAction("GetMediaPlaylist", { include: true }, {
      fetcher,
      configResolver: async () => ({
        source: "local",
        config: { baseUrl: "http://127.0.0.1:8091", token: "secret token" }
      })
    });

    assert.deepEqual(data, [{ id: "abc" }]);
    assert.equal(String(calls[0][0]), "http://127.0.0.1:8091/api/GetMediaPlaylist?token=secret+token");
    assert.equal(calls[0][1]?.method, "POST");
    assert.equal(calls[0][1]?.body, JSON.stringify({ include: true }));
  });

  test("rejects when Holyrics is not configured", async () => {
    await assert.rejects(
      () =>
        executeHolyricsAction("GetMediaPlaylist", {}, {
          configResolver: async () => ({ source: "none", config: null })
        }),
      /Configure a URL e o token/
    );
  });

  test("maps non-ok HTTP responses to useful errors", async () => {
    await assert.rejects(
      () =>
        executeHolyricsAction("GetMediaPlaylist", {}, {
          fetcher: async () => jsonResponse({ error: "Unauthorized" }, { status: 401 }),
          configResolver: async () => ({
            source: "env",
            config: { baseUrl: "http://localhost:8091", token: "bad" }
          })
        }),
      /Holyrics respondeu com HTTP 401/
    );
  });

  test("maps Holyrics API status errors", async () => {
    await assert.rejects(
      () =>
        executeHolyricsAction("GetMediaPlaylist", {}, {
          fetcher: async () => jsonResponse({ status: "error", error: "Invalid action" }),
          configResolver: async () => ({
            source: "env",
            config: { baseUrl: "http://localhost:8091", token: "token" }
          })
        }),
      /Invalid action/
    );
  });
});
