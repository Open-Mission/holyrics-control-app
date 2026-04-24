import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  fetchHolyricsMediaPlaylist,
  fetchHolyricsSongDetail,
  getMediaItemLabel,
  getMediaItemTone,
  presentHolyricsPlaylistItem
} from "./holyrics-playlist.js";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json" }
  });
}

describe("Holyrics playlist web helpers", () => {
  test("fetches the media playlist from the server", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({
        schedule: { type: "event", name: "Culto", datetime: null, notes: "" },
        groups: [],
        items: []
      });
    };

    const playlist = await fetchHolyricsMediaPlaylist(fetcher);

    assert.equal(playlist.schedule?.name, "Culto");
    assert.equal(calls[0][0], "/api/holyrics/media-playlist");
  });

  test("posts presentation action with JSON payload", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({ ok: true });
    };

    await presentHolyricsPlaylistItem("abc", fetcher);

    assert.equal(calls[0][0], "/api/holyrics/media-playlist/present");
    assert.equal(calls[0][1]?.method, "POST");
    assert.equal(calls[0][1]?.body, JSON.stringify({ id: "abc" }));
  });

  test("includes song name query when fetching song detail", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({
        id: "123",
        title: "Grandioso Es Tu",
        artist: "",
        author: "",
        key: "",
        bpm: null,
        sections: []
      });
    };

    await fetchHolyricsSongDetail("zpN4PwRqPHknb", "Grandioso Es Tu", fetcher);

    assert.equal(
      calls[0][0],
      "/api/holyrics/songs/zpN4PwRqPHknb?name=Grandioso%20Es%20Tu"
    );
  });

  test("maps item types to labels and tones", () => {
    assert.equal(getMediaItemLabel("song"), "Musica");
    assert.equal(getMediaItemLabel("automatic_presentation"), "Apresentacao");
    assert.equal(getMediaItemLabel("file"), "Arquivo");
    assert.equal(getMediaItemTone("song"), "primary");
    assert.equal(getMediaItemTone("file"), "muted");
  });
});
