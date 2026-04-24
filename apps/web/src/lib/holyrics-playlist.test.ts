import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  fetchCurrentPresentationState,
  fetchHolyricsMediaDetail,
  fetchHolyricsMediaPlaylist,
  fetchHolyricsMediaPlayerInfo,
  fetchPresentationModifiers,
  fetchHolyricsSongDetail,
  getImagePresentationIndex,
  getMediaItemLabel,
  getMediaItemTone,
  getSongPresentationIndex,
  mediaPlayerAction,
  presentAndPreviewHolyricsImage,
  presentHolyricsPlaylistItem,
  setHolyricsPresentationModifier,
  stopHolyricsPresentation
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

  test("posts stop presentation action", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({ ok: true });
    };

    await stopHolyricsPresentation(fetcher);

    assert.equal(calls[0][0], "/api/holyrics/presentation/stop");
    assert.equal(calls[0][1]?.method, "POST");
    assert.equal(calls[0][1]?.body, JSON.stringify({}));
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

  test("presentAndPreviewHolyricsImage posts the item id and returns the image presentation", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push({ url: typeof input === "string" ? input : input.toString(), init });
      return new Response(
        JSON.stringify({
          name: "02 - Agenda",
          slides: [{ index: 0, name: "aviso.jpg", thumbnail: "big-base64", width: null, height: null }]
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const image = await presentAndPreviewHolyricsImage("playlist-item-42", fetcher);

    assert.equal(calls[0]?.url, "/api/holyrics/images/present-and-preview");
    assert.equal(calls[0]?.init?.method, "POST");
    assert.equal(calls[0]?.init?.headers && (calls[0].init.headers as Record<string, string>)["Content-Type"], "application/json");
    assert.equal(calls[0]?.init?.body, JSON.stringify({ id: "playlist-item-42" }));
    assert.equal(image.name, "02 - Agenda");
    assert.equal(image.slides[0]?.thumbnail, "big-base64");
  });

  test("fetches the current presentation state", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({
        id: "song-1",
        type: "song",
        name: "Grandioso Es Tu",
        slideNumber: 2,
        totalSlides: 5,
        slideType: "default"
      });
    };

    const state = await fetchCurrentPresentationState(fetcher);

    assert.equal(calls[0][0], "/api/holyrics/presentation/state");
    assert.equal(state.name, "Grandioso Es Tu");
    assert.equal(state.slideNumber, 2);
  });

  test("fetches presentation modifiers", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({
        wallpaper: true,
        blank: false,
        black: true
      });
    };

    const modifiers = await fetchPresentationModifiers(fetcher);

    assert.equal(calls[0][0], "/api/holyrics/presentation/modifiers");
    assert.deepEqual(modifiers, {
      wallpaper: true,
      blank: false,
      black: true
    });
  });

  test("posts presentation modifier payload", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({ ok: true });
    };

    await setHolyricsPresentationModifier("blank", true, fetcher);

    assert.equal(calls[0][0], "/api/holyrics/presentation/modifiers");
    assert.equal(calls[0][1]?.method, "POST");
    assert.equal(
      calls[0][1]?.body,
      JSON.stringify({ key: "blank", enable: true })
    );
  });

  test("fetches media detail", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({
        type: "video",
        name: "entrada.mp4",
        thumbnail: "thumb64",
        width: 1920,
        height: 1080,
        durationMs: 321000,
        relativePath: "videos/entrada.mp4"
      });
    };

    const detail = await fetchHolyricsMediaDetail("video", "entrada.mp4", fetcher);

    assert.equal(
      calls[0][0],
      "/api/holyrics/media/detail?type=video&name=entrada.mp4"
    );
    assert.equal(detail.name, "entrada.mp4");
    assert.equal(detail.durationMs, 321000);
  });

  test("fetches media player info", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({
        name: "entrada.mp4",
        path: "/tmp/entrada.mp4",
        relativePath: "videos/entrada.mp4",
        playing: true,
        durationMs: 321000,
        timeMs: 12000,
        timeElapsed: "00:12",
        timeRemaining: "05:09",
        volume: 90,
        mute: false,
        repeat: false,
        executeSingle: false,
        shuffle: false,
        fullscreen: true
      });
    };

    const info = await fetchHolyricsMediaPlayerInfo(fetcher);

    assert.equal(calls[0][0], "/api/holyrics/media/player");
    assert.equal(info.playing, true);
    assert.equal(info.timeMs, 12000);
  });

  test("posts media player action payload", async () => {
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    const fetcher: typeof fetch = async (input, init) => {
      calls.push([input, init]);
      return jsonResponse({ ok: true });
    };

    await mediaPlayerAction({ action: "pause", fullscreen: false }, fetcher);

    assert.equal(calls[0][0], "/api/holyrics/media/player/action");
    assert.equal(calls[0][1]?.method, "POST");
    assert.equal(
      calls[0][1]?.body,
      JSON.stringify({ action: "pause", fullscreen: false })
    );
  });

  test("maps UI slide indexes to Holyrics presentation indexes", () => {
    assert.equal(getSongPresentationIndex(0), 1);
    assert.equal(getSongPresentationIndex(3), 4);
    assert.equal(getImagePresentationIndex(0), 0);
    assert.equal(getImagePresentationIndex(3), 3);
  });

  test("maps item types to labels and tones", () => {
    assert.equal(getMediaItemLabel("song"), "Musica");
    assert.equal(getMediaItemLabel("automatic_presentation"), "Apresentacao");
    assert.equal(getMediaItemLabel("file"), "Arquivo");
    assert.equal(getMediaItemTone("song"), "primary");
    assert.equal(getMediaItemTone("file"), "muted");
  });
});
