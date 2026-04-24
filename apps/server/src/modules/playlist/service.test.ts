import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  getHolyricsMediaPlaylist,
  getHolyricsSongDetail,
  goToPresentationIndex,
  presentMediaPlaylistItem,
  presentSong
} from "./service.js";

describe("Holyrics playlist service", () => {
  test("normalizes active schedule media playlist with title groups", async () => {
    const calls: Array<[string, Record<string, unknown>]> = [];
    const playlist = await getHolyricsMediaPlaylist({
      executeAction: async (action, body) => {
        calls.push([action, body ?? {}]);
        return {
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
        };
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

    assert.deepEqual(calls, [
      ["MediaPlaylistAction", { id: "abc" }],
      ["ShowSong", { id: "s1", initial_index: 2 }],
      ["ActionGoToIndex", { index: 3 }]
    ]);
  });
});
