import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  getCurrentPresentationState,
  getHolyricsMediaDetail,
  getHolyricsMediaPlaylist,
  getHolyricsMediaPlayerInfo,
  getHolyricsImagePresentation,
  getPresentationModifiers,
  getHolyricsSongDetail,
  goToPresentationIndex,
  mediaPlayerAction,
  presentMediaPlaylistItem,
  presentSong,
  setPresentationModifier,
  stopPresentation
} from "./service.js";

describe("Holyrics playlist service", () => {
  test("normalizes active schedule media playlist with title groups", async () => {
    const calls: Array<[string, Record<string, unknown>]> = [];
    const playlist = await getHolyricsMediaPlaylist({
      executeAction: async (action, body) => {
        calls.push([action, body ?? {}]);
        return [
          {
            type: "event",
            name: "Culto Domingo",
            datetime: "2026-04-26 19:00",
            notes: "Santa ceia",
            media_playlist: [
              { id: "t1", type: "title", name: "Abertura" },
              { id: "playlist-item-1", song_id: "s1", type: "song", name: "Grandioso Es Tu" },
              { id: "i1", type: "image", name: "aviso.jpg" },
              { id: "t2", type: "title", name: "Palavra" },
              { id: "f1", type: "file", name: "roteiro.pdf" }
            ]
          }
        ];
      }
    });

    assert.deepEqual(calls, [["GetCurrentSchedule", {}]]);
    assert.equal(playlist.schedule?.name, "Culto Domingo");
    assert.equal(playlist.items.length, 5);
    assert.equal(playlist.groups[0].title, "Abertura");
    assert.deepEqual(
      playlist.groups[0].items.map((item) => item.name),
      ["Grandioso Es Tu", "aviso.jpg"]
    );
    assert.equal(playlist.items[0].executable, false);
    assert.equal(playlist.items[1].executable, true);
    assert.equal(playlist.items[1].id, "playlist-item-1");
    assert.equal(playlist.items[1].songId, "s1");
    assert.equal(playlist.items[4].executable, false);
  });

  test("extracts event name from metadata when schedule name is empty", async () => {
    const playlist = await getHolyricsMediaPlaylist({
      executeAction: async () => [
        {
          type: "event",
          name: "",
          datetime: "2026-04-26 19:00",
          notes: "",
          media_playlist: [],
          metadata: {
            event: {
              id: "evt-123",
              name: "Culto Especial"
            }
          }
        }
      ]
    });

    assert.equal(playlist.schedule?.name, "Culto Especial");
    assert.equal(playlist.schedule?.eventId, "evt-123");
  });

  test("falls back to GetMediaPlaylist when current schedule has no media_playlist", async () => {
    const actions: string[] = [];
    const playlist = await getHolyricsMediaPlaylist({
      executeAction: async (action) => {
        actions.push(action);
        if (action === "GetCurrentSchedule") {
          return null;
        }

        return [{ id: "v1", type: "video", name: "entrada.mp4" }];
      }
    });

    assert.deepEqual(actions, ["GetCurrentSchedule", "GetMediaPlaylist"]);
    assert.equal(playlist.schedule, null);
    assert.equal(playlist.items[0].type, "video");
  });

  test("extracts song sections from lyrics slides", async () => {
    const song = await getHolyricsSongDetail("s1", undefined, {
      executeAction: async () => ({
        id: "s1",
        title: "Grandioso Es Tu",
        artist: "Tradicional",
        author: "Autor",
        key: "G",
        bpm: 72,
        slides: [
          { text: "Verso linha 1\nVerso linha 2", slide_description: "Verse 1" },
          { text: "Coro linha 1", slide_description: "Chorus" }
        ]
      })
    });

    assert.equal(song.title, "Grandioso Es Tu");
    assert.deepEqual(
      song.sections.map((section) => [section.index, section.name, section.tag, section.text]),
      [
        [0, "Verse 1", null, "Verso linha 1\nVerso linha 2"],
        [1, "Chorus", null, "Coro linha 1"]
      ]
    );
  });

  test("falls back to SearchSong and GetLyrics when media playlist id is not a song id", async () => {
    const actions: string[] = [];
    const song = await getHolyricsSongDetail("zpN4PwRqPHknb", "Grandioso Es Tu", {
      executeAction: async (action) => {
        actions.push(action);
        if (action === "GetLyrics") {
          if (actions.length === 1) {
            throw new Error('For input string: "zpN4PwRqPHknb"');
          }

          return {
            id: "123",
            title: "Grandioso Es Tu",
            artist: "Tradicional",
            author: "Autor",
            key: "G",
            bpm: 72,
            slides: [{ text: "Verso", slide_description: "Verse 1" }]
          };
        }

        if (action === "SearchSong") {
          return [
            {
              id: "123",
              title: "Grandioso Es Tu",
              artist: "Tradicional",
              author: "Autor",
              key: "G",
              bpm: 72
            }
          ];
        }

        return null;
      }
    });

    assert.deepEqual(actions, ["GetLyrics", "SearchSong", "GetLyrics"]);
    assert.equal(song.id, "123");
    assert.equal(song.title, "Grandioso Es Tu");
    assert.equal(song.sections.length, 1);
  });

  test("falls back to current schedule lyrics playlist when SearchSong does not resolve", async () => {
    const actions: string[] = [];
    const song = await getHolyricsSongDetail("zpN4PwRqPHknb", "Grandioso Es Tu", {
      executeAction: async (action) => {
        actions.push(action);
        if (action === "GetLyrics") {
          throw new Error('For input string: "zpN4PwRqPHknb"');
        }

        if (action === "SearchSong") {
          return [];
        }

        return {
          lyrics_playlist: [
            {
              id: "123",
              title: "Grandioso Es Tu",
              artist: "Tradicional",
              author: "Autor",
              key: "G",
              bpm: 72,
              slides: [{ text: "Verso", slide_description: "Verse 1" }]
            }
          ]
        };
      }
    });

    assert.deepEqual(actions, ["GetLyrics", "SearchSong", "GetCurrentSchedule"]);
    assert.equal(song.id, "123");
    assert.equal(song.title, "Grandioso Es Tu");
    assert.equal(song.sections.length, 1);
  });

  test("sends action payloads for presentation commands", async () => {
    const calls: Array<[string, Record<string, unknown>]> = [];
    const executeAction = async (action: string, body?: Record<string, unknown>) => {
      calls.push([action, body ?? {}]);
      return null;
    };

    await presentMediaPlaylistItem("abc", { executeAction });
    await presentSong("s1", 2, { executeAction });
    await goToPresentationIndex(3, { executeAction });
    await stopPresentation({ executeAction });

    assert.deepEqual(calls, [
      ["MediaPlaylistAction", { id: "abc" }],
      ["ShowSong", { id: "s1", initial_index: 2 }],
      ["ActionGoToIndex", { index: 3 }],
      ["CloseCurrentPresentation", {}]
    ]);
  });

  test("presents the playlist item and returns the current presentation preview", async () => {
    const actions: Array<[string, Record<string, unknown>]> = [];
    const image = await getHolyricsImagePresentation("playlist-item-42", {
      executeAction: async (action, body) => {
        actions.push([action, body ?? {}]);

        if (action === "MediaPlaylistAction") {
          return null;
        }

        if (action === "GetCurrentPresentation") {
          return {
            id: "pres-1",
            type: "image",
            name: "02 - Agenda",
            slide_number: 1,
            total_slides: 2,
            slides: [
              { number: 1, text: "IMG-20260412-WA0008.jpg", preview: "base64-1" },
              { number: 2, text: "IMG-20260412-WA0009.jpg", preview: "base64-2" }
            ]
          };
        }

        return null;
      }
    });

    assert.deepEqual(actions, [
      ["MediaPlaylistAction", { id: "playlist-item-42" }],
      [
        "GetCurrentPresentation",
        {
          include_slides: true,
          include_slide_preview: true,
          slide_preview_size: "640x360"
        }
      ]
    ]);
    assert.equal(image.name, "02 - Agenda");
    assert.deepEqual(image.slides, [
      { index: 0, name: "IMG-20260412-WA0008.jpg", thumbnail: "base64-1", width: null, height: null },
      { index: 1, name: "IMG-20260412-WA0009.jpg", thumbnail: "base64-2", width: null, height: null }
    ]);
  });

  test("returns an empty slide list when nothing is being presented", async () => {
    const image = await getHolyricsImagePresentation("playlist-item-42", {
      executeAction: async (action) => {
        if (action === "MediaPlaylistAction") {
          return null;
        }
        if (action === "GetCurrentPresentation") {
          return null;
        }
        return null;
      }
    });

    assert.equal(image.name, "");
    assert.deepEqual(image.slides, []);
  });

  test("maps song section click indexes to holyrics blank-first-slide offset via current presentation", async () => {
    const state = await getCurrentPresentationState({
      executeAction: async () => ({
        id: "song-1",
        type: "song",
        name: "Grandioso Es Tu",
        slide_number: 3,
        total_slides: 5,
        slide_type: "default"
      })
    });

    assert.deepEqual(state, {
      id: "song-1",
      type: "song",
      name: "Grandioso Es Tu",
      slideNumber: 2,
      totalSlides: 5,
      slideType: "default"
    });
  });

  test("supports wrapped current presentation responses", async () => {
    const state = await getCurrentPresentationState({
      executeAction: async () => ({
        data: {
          id: "video-1",
          type: "video",
          name: "Entrada",
          slide_number: 1,
          total_slides: 1,
          slide_type: "default"
        }
      })
    });

    assert.deepEqual(state, {
      id: "video-1",
      type: "video",
      name: "Entrada",
      slideNumber: 0,
      totalSlides: 1,
      slideType: "default"
    });
  });

  test("normalizes unknown and invalid current presentation types to shared-safe values", async () => {
    const unknownState = await getCurrentPresentationState({
      executeAction: async () => ({
        id: "presentation-1",
        type: "custom_type",
        name: "Custom Media",
        slide_number: 1,
        total_slides: 1,
        slide_type: "custom_slide_type"
      })
    });

    const invalidState = await getCurrentPresentationState({
      executeAction: async () => ({
        id: "presentation-2",
        type: 123,
        name: "Broken Media",
        slide_number: 1,
        total_slides: 1,
        slide_type: false
      })
    });

    assert.equal(unknownState.type, "unknown");
    assert.equal(unknownState.slideType, "unknown");
    assert.equal(invalidState.type, null);
    assert.equal(invalidState.slideType, null);
  });

  test("returns presentation modifier states", async () => {
    const calls: string[] = [];
    const modifiers = await getPresentationModifiers({
      executeAction: async (action) => {
        calls.push(action);
        if (action === "GetF8") return true;
        if (action === "GetF9") return false;
        if (action === "GetF10") return true;
        return null;
      }
    });

    assert.deepEqual(calls, ["GetF8", "GetF9", "GetF10"]);
    assert.deepEqual(modifiers, { wallpaper: true, blank: false, black: true });
  });

  test("returns presentation modifier states from wrapped booleans", async () => {
    const modifiers = await getPresentationModifiers({
      executeAction: async (action) => {
        if (action === "GetF8") return { data: true };
        if (action === "GetF9") return { data: false };
        if (action === "GetF10") return { data: true };
        return null;
      }
    });

    assert.deepEqual(modifiers, { wallpaper: true, blank: false, black: true });
  });

  test("sends modifier action mapped by key", async () => {
    const calls: Array<[string, Record<string, unknown>]> = [];
    await setPresentationModifier("blank", true, {
      executeAction: async (action, body) => {
        calls.push([action, body ?? {}]);
        return null;
      }
    });

    assert.deepEqual(calls, [["SetF9", { enable: true }]]);
  });

  test("returns video metadata and thumbnail from holyrics file action", async () => {
    const detail = await getHolyricsMediaDetail("video", "entrada.mp4", {
      executeAction: async (action) => {
        assert.equal(action, "GetVideo");
        return {
          data: {
            name: "entrada.mp4",
            width: 1920,
            height: 1080,
            duration_ms: 321000,
            thumbnail: "thumb64"
          }
        };
      }
    });

    assert.deepEqual(detail, {
      type: "video",
      name: "entrada.mp4",
      thumbnail: "thumb64",
      width: 1920,
      height: 1080,
      durationMs: 321000,
      relativePath: null
    });
  });

  test("returns media detail from direct holyrics file response", async () => {
    const detail = await getHolyricsMediaDetail("audio", "trilha.mp3", {
      executeAction: async (action) => {
        assert.equal(action, "GetAudio");
        return {
          name: "trilha.mp3",
          duration_ms: 185000,
          relative_path: "audio/trilha.mp3"
        };
      }
    });

    assert.deepEqual(detail, {
      type: "audio",
      name: "trilha.mp3",
      thumbnail: null,
      width: null,
      height: null,
      durationMs: 185000,
      relativePath: "audio/trilha.mp3"
    });
  });

  test("returns media player info and executes play pause actions", async () => {
    const calls: Array<[string, Record<string, unknown>]> = [];
    const executeAction = async (action: string, body?: Record<string, unknown>) => {
      calls.push([action, body ?? {}]);
      if (action === "GetMediaPlayerInfo") {
        return {
          name: "entrada.mp4",
          path: "C:/Holyrics/files/media/video/entrada.mp4",
          relative_path: "video/entrada.mp4",
          playing: false,
          duration_ms: 123000,
          time_ms: 0,
          time_elapsed: "00:00",
          time_remaining: "02:03",
          volume: 80,
          mute: false,
          repeat: false,
          execute_single: true,
          shuffle: false,
          fullscreen: false
        };
      }
      return null;
    };

    const info = await getHolyricsMediaPlayerInfo({ executeAction });
    await mediaPlayerAction({ action: "play" }, { executeAction });
    await mediaPlayerAction({ action: "pause" }, { executeAction });

    assert.equal(info.name, "entrada.mp4");
    assert.deepEqual(calls.slice(1), [
      ["MediaPlayerAction", { action: "play" }],
      ["MediaPlayerAction", { action: "pause" }]
    ]);
  });

  test("returns media player info from wrapped holyrics response", async () => {
    const info = await getHolyricsMediaPlayerInfo({
      executeAction: async (action) => {
        assert.equal(action, "GetMediaPlayerInfo");
        return {
          data: {
            name: "entrada.mp4",
            path: "C:/Holyrics/files/media/video/entrada.mp4",
            relative_path: "video/entrada.mp4",
            playing: true,
            duration_ms: 123000,
            time_ms: 21000,
            time_elapsed: "00:21",
            time_remaining: "01:42",
            volume: 65,
            mute: false,
            repeat: true,
            execute_single: false,
            shuffle: true,
            fullscreen: true
          }
        };
      }
    });

    assert.deepEqual(info, {
      name: "entrada.mp4",
      path: "C:/Holyrics/files/media/video/entrada.mp4",
      relativePath: "video/entrada.mp4",
      playing: true,
      durationMs: 123000,
      timeMs: 21000,
      timeElapsed: "00:21",
      timeRemaining: "01:42",
      volume: 65,
      mute: false,
      repeat: true,
      executeSingle: false,
      shuffle: true,
      fullscreen: true
    });
  });
});
