import type {
  HolyricsActiveSchedule,
  HolyricsCurrentPresentationState,
  HolyricsMediaDetail,
  HolyricsImagePresentation,
  HolyricsMediaPlayerInfo,
  HolyricsMediaPlaylistItem,
  HolyricsMediaPlaylistResponse,
  HolyricsPresentationModifierKey,
  HolyricsPresentationItemType,
  HolyricsPresentationModifiers,
  HolyricsPresentationSlideType,
  HolyricsSongDetail,
  HolyricsSongSection,
  MediaPlayerActionRequest
} from "@holyrics-control/shared";

import { executeHolyricsAction } from "../holyrics/client.js";

type ExecuteAction = (action: string, body?: Record<string, unknown>) => Promise<unknown>;

export type HolyricsPlaylistServiceOptions = {
  executeAction?: ExecuteAction;
};

type RawEvent = {
  id?: unknown;
  name?: unknown;
};

type RawSchedule = {
  type?: unknown;
  name?: unknown;
  datetime?: unknown;
  notes?: unknown;
  media_playlist?: unknown;
  metadata?: {
    event?: RawEvent;
  };
};

type RawInterfaceInput = string;

type RawPlaylistItem = {
  id?: unknown;
  song_id?: unknown;
  type?: unknown;
  name?: unknown;
};

type RawPresentationSlide = {
  number?: unknown;
  text?: unknown;
  slide_description?: unknown;
  preview?: unknown;
};

type RawCurrentPresentation = {
  id?: unknown;
  type?: unknown;
  name?: unknown;
  slide_number?: unknown;
  total_slides?: unknown;
  slide_type?: unknown;
  slides?: unknown;
};

type RawSong = {
  id?: unknown;
  title?: unknown;
  artist?: unknown;
  author?: unknown;
  key?: unknown;
  bpm?: unknown;
  slides?: unknown;
};

type RawSongSummary = {
  id?: unknown;
  title?: unknown;
  artist?: unknown;
  author?: unknown;
  key?: unknown;
  bpm?: unknown;
  slides?: unknown;
};

type RawScheduleWithLyrics = {
  lyrics_playlist?: unknown;
};

type RawSlide = {
  text?: unknown;
  slide_description?: unknown;
};

type RawWrappedResponse<T> = {
  data?: T;
};

type RawMediaFile = {
  name?: unknown;
  thumbnail?: unknown;
  width?: unknown;
  height?: unknown;
  duration_ms?: unknown;
  relative_path?: unknown;
};

type RawMediaPlayerInfo = RawMediaFile & {
  path?: unknown;
  playing?: unknown;
  time_ms?: unknown;
  time_elapsed?: unknown;
  time_remaining?: unknown;
  volume?: unknown;
  mute?: unknown;
  repeat?: unknown;
  execute_single?: unknown;
  shuffle?: unknown;
  fullscreen?: unknown;
};

const executableTypes = new Set([
  "song",
  "verse",
  "text",
  "audio",
  "video",
  "image",
  "announcement",
  "automatic_presentation",
  "countdown",
  "countdown_cp",
  "cp_text",
  "plain_text",
  "uri",
  "actions",
  "global_action",
  "alert",
  "cp_alert",
  "theme_background",
  "api",
  "script",
  "module_action"
]);

const presentationItemTypes = new Set<HolyricsPresentationItemType>([
  "song",
  "verse",
  "text",
  "audio",
  "video",
  "image",
  "announcement",
  "automatic_presentation",
  "quick_presentation",
  "unknown"
]);

const presentationSlideTypes = new Set<HolyricsPresentationSlideType>([
  "default",
  "wallpaper",
  "blank",
  "black",
  "final_slide",
  "unknown"
]);

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function unwrapResponse<T>(value: RawWrappedResponse<T> | T | null | undefined): T | null {
  if (value && typeof value === "object" && "data" in value) {
    return (value as RawWrappedResponse<T>).data ?? null;
  }

  return (value ?? null) as T | null;
}

function asNullableNumber(value: unknown) {
  const unwrappedValue = unwrapResponse(value);
  return typeof unwrappedValue === "number" ? unwrappedValue : null;
}

function asBoolean(value: unknown) {
  return unwrapResponse(value) === true;
}

function normalizePresentationItemType(value: unknown): HolyricsPresentationItemType | null {
  if (typeof value !== "string") {
    return null;
  }

  return presentationItemTypes.has(value as HolyricsPresentationItemType)
    ? (value as HolyricsPresentationItemType)
    : "unknown";
}

function normalizePresentationSlideType(value: unknown): HolyricsPresentationSlideType | null {
  if (typeof value !== "string") {
    return null;
  }

  return presentationSlideTypes.has(value as HolyricsPresentationSlideType)
    ? (value as HolyricsPresentationSlideType)
    : "unknown";
}

function normalizeSchedule(raw: RawSchedule | null): HolyricsActiveSchedule | null {
  if (!raw) {
    return null;
  }

  const eventId = raw.metadata?.event?.id;
  const eventName = raw.metadata?.event?.name;
  const scheduleName = asString(raw.name);
  const finalName = scheduleName || asString(eventName);

  return {
    type: asString(raw.type, "temporary"),
    name: finalName,
    datetime: typeof raw.datetime === "string" && raw.datetime ? raw.datetime : null,
    notes: asString(raw.notes),
    eventId: typeof eventId === "string" ? eventId : null
  };
}

function normalizeItem(
  raw: RawPlaylistItem,
  index: number,
  title: string | null
): HolyricsMediaPlaylistItem {
  const type = asString(raw.type, "unknown");

  return {
    id: asString(raw.id),
    songId: asString(raw.song_id) || null,
    type,
    name: asString(raw.name, asString(raw.id)),
    index,
    title,
    executable: executableTypes.has(type)
  };
}

function normalizePlaylist(rawItems: unknown): HolyricsMediaPlaylistResponse["items"] {
  if (!Array.isArray(rawItems)) {
    return [];
  }

  let currentTitle: string | null = null;

  return rawItems.map((raw, index) => {
    const rawItem = raw as RawPlaylistItem;
    const type = asString(rawItem.type, "unknown");

    if (type === "title") {
      currentTitle = asString(rawItem.name, "Sem titulo");
    }

    return normalizeItem(rawItem, index, type === "title" ? null : currentTitle);
  });
}

function groupPlaylist(
  items: HolyricsMediaPlaylistItem[]
): HolyricsMediaPlaylistResponse["groups"] {
  const groups: HolyricsMediaPlaylistResponse["groups"] = [];

  for (const item of items) {
    if (item.type === "title") {
      continue;
    }

    const lastGroup = groups.at(-1);

    if (!lastGroup || lastGroup.title !== item.title) {
      groups.push({ title: item.title, items: [item] });
      continue;
    }

    lastGroup.items.push(item);
  }

  return groups;
}

function getExecutor(options: HolyricsPlaylistServiceOptions): ExecuteAction {
  return options.executeAction ?? executeHolyricsAction;
}

export async function getHolyricsMediaPlaylist(
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsMediaPlaylistResponse> {
  const executeAction = getExecutor(options);
  const rawResponse = (await executeAction("GetCurrentSchedule", {})) as
    | RawSchedule
    | RawSchedule[]
    | null;
  const rawSchedule = Array.isArray(rawResponse) ? rawResponse[0] : rawResponse;

  const rawScheduleItems = rawSchedule?.media_playlist;
  const rawItems = Array.isArray(rawScheduleItems)
    ? rawScheduleItems
    : ((await executeAction("GetMediaPlaylist", {})) as unknown[]);
  const items = normalizePlaylist(rawItems);

  let schedule = normalizeSchedule(rawSchedule);

  if (schedule && !schedule.name && schedule.type !== "temporary") {
    try {
      const eventName = (await executeAction("GetInterfaceInput", {
        id: "main_selected_tab_event"
      })) as RawInterfaceInput | null;

      if (typeof eventName === "string" && eventName.trim()) {
        schedule = {
          type: schedule.type,
          name: eventName.trim(),
          datetime: schedule.datetime,
          notes: schedule.notes,
          eventId: schedule.eventId
        };
      }
    } catch {
      // Ignore errors from GetInterfaceInput
    }
  }

  return {
    schedule,
    items,
    groups: groupPlaylist(items)
  };
}

function normalizeSections(rawSlides: unknown): HolyricsSongSection[] {
  if (!Array.isArray(rawSlides)) {
    return [];
  }

  return rawSlides.map((raw, index) => {
    const slide = raw as RawSlide;
    const name = asString(slide.slide_description, `Bloco ${index + 1}`);
    const tag = null;

    return {
      index,
      name,
      tag,
      text: asString(slide.text)
    };
  });
}

function normalizeSong(rawSong: RawSongSummary, fallbackId: string): HolyricsSongDetail {
  return {
    id: asString(rawSong.id, fallbackId),
    title: asString(rawSong.title, "Musica sem titulo"),
    artist: asString(rawSong.artist),
    author: asString(rawSong.author),
    key: asString(rawSong.key),
    bpm: typeof rawSong.bpm === "number" ? rawSong.bpm : null,
    sections: normalizeSections(rawSong.slides)
  };
}

function isInputStringError(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return message.includes("For input string:");
}

async function resolveSongByName(
  songName: string,
  executeAction: ExecuteAction
): Promise<RawSong | null> {
  const trimmedName = songName.trim();

  if (!trimmedName) {
    return null;
  }

  const candidates = (await executeAction("SearchSong", {
    text: trimmedName,
    title: true,
    artist: true,
    note: false,
    lyrics: false,
    fields: "id,title,artist,author,key,bpm"
  })) as RawSong[] | null;
  const resultList = Array.isArray(candidates) ? candidates : [];
  const normalizedTarget = trimmedName.toLowerCase();
  const exact = resultList.find(
    (item) => asString(item.title).trim().toLowerCase() === normalizedTarget
  );
  const chosen = exact ?? resultList[0];

  if (!chosen) {
    return null;
  }

  if (!asString(chosen.id)) {
    return null;
  }

  return (await executeAction("GetLyrics", {
    id: asString(chosen.id),
    fields: "id,title,artist,author,key,bpm,slides"
  })) as RawSong | null;
}

export async function getHolyricsSongDetail(
  id: string,
  songName?: string,
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsSongDetail> {
  const executeAction = getExecutor(options);
  let getLyricsError: unknown = null;

  try {
    const rawSong = (await executeAction("GetLyrics", {
      id,
      fields: "id,title,artist,author,key,bpm,slides"
    })) as RawSong | null;

    if (rawSong) {
      return normalizeSong(rawSong, id);
    }
  } catch (error) {
    getLyricsError = error;
  }

  if (songName && songName.trim()) {
    try {
      const resolvedByName = await resolveSongByName(songName, executeAction);

      if (resolvedByName) {
        return normalizeSong(resolvedByName, id);
      }
    } catch (error) {
      if (!isInputStringError(error)) {
        throw error;
      }
    }
  }

  const schedule = (await executeAction("GetCurrentSchedule", {
    include_lyrics_slides: true
  })) as RawScheduleWithLyrics | null;
  const lyricsPlaylist = Array.isArray(schedule?.lyrics_playlist)
    ? (schedule?.lyrics_playlist as RawSongSummary[])
    : [];
  const matchedById = lyricsPlaylist.find((item) => asString(item.id) === id);
  const matchedByName =
    songName && songName.trim()
      ? lyricsPlaylist.find(
          (item) => asString(item.title).trim().toLowerCase() === songName.trim().toLowerCase()
        )
      : null;
  const fallbackSong = matchedById ?? matchedByName ?? null;

  if (!fallbackSong) {
    if (getLyricsError && !isInputStringError(getLyricsError)) {
      throw getLyricsError;
    }

    throw new Error("Musica nao encontrada no Holyrics.");
  }

  return normalizeSong(fallbackSong, id);
}

export async function presentMediaPlaylistItem(
  id: string,
  options: HolyricsPlaylistServiceOptions = {}
) {
  await getExecutor(options)("MediaPlaylistAction", { id });
}

export async function presentSong(
  id: string,
  initialIndex = 0,
  options: HolyricsPlaylistServiceOptions = {}
) {
  await getExecutor(options)("ShowSong", { id, initial_index: initialIndex });
}

export async function getHolyricsImagePresentation(
  id: string,
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsImagePresentation> {
  const executeAction = getExecutor(options);
  await executeAction("MediaPlaylistAction", { id });

  const raw = (await executeAction("GetCurrentPresentation", {
    include_slides: true,
    include_slide_preview: true,
    slide_preview_size: "640x360"
  })) as RawCurrentPresentation | null;

  if (!raw) {
    return { name: "", slides: [] };
  }
  console.log(raw);

  const rawSlides = Array.isArray(raw.slides) ? (raw.slides as RawPresentationSlide[]) : [];

  const slides = rawSlides.map((slide, fallbackIndex) => {
    const number = typeof slide.number === "number" ? slide.number : fallbackIndex + 1;
    const nameSource = asString(slide.slide_description) || asString(slide.text);
    return {
      index: number - 1,
      name: nameSource || `Slide ${number}`,
      thumbnail:
        typeof slide.preview === "string" && slide.preview.length > 0 ? slide.preview : null,
      width: null,
      height: null
    };
  });

  return {
    name: asString(raw.name),
    slides
  };
}

export async function goToPresentationIndex(
  index: number,
  options: HolyricsPlaylistServiceOptions = {}
) {
  await getExecutor(options)("ActionGoToIndex", { index });
}

export async function getCurrentSlideNumber(
  options: HolyricsPlaylistServiceOptions = {}
): Promise<number | null> {
  const raw = (await getExecutor(options)(
    "GetCurrentPresentation",
    {}
  )) as RawCurrentPresentation | null;

  if (!raw || typeof raw.slide_number !== "number") {
    return null;
  }

  return raw.slide_number - 1;
}

export async function getCurrentPresentationState(
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsCurrentPresentationState> {
  const raw = (await getExecutor(options)("GetCurrentPresentation", {})) as
    | RawWrappedResponse<RawCurrentPresentation>
    | RawCurrentPresentation
    | null;
  const data = unwrapResponse(raw);

  return {
    id: data && typeof data.id === "string" ? data.id : null,
    type: normalizePresentationItemType(data?.type),
    name: data && typeof data.name === "string" ? data.name : null,
    slideNumber: data && typeof data.slide_number === "number" ? data.slide_number - 1 : null,
    totalSlides: data && typeof data.total_slides === "number" ? data.total_slides : null,
    slideType: normalizePresentationSlideType(data?.slide_type)
  };
}

export async function getPresentationModifiers(
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsPresentationModifiers> {
  const executeAction = getExecutor(options);

  const wallpaper = await executeAction("GetF8", {});
  const blank = await executeAction("GetF9", {});
  const black = await executeAction("GetF10", {});

  return {
    wallpaper: asBoolean(wallpaper),
    blank: asBoolean(blank),
    black: asBoolean(black)
  };
}

export async function setPresentationModifier(
  key: HolyricsPresentationModifierKey,
  enable: boolean,
  options: HolyricsPlaylistServiceOptions = {}
) {
  const actionByKey = {
    wallpaper: "SetF8",
    blank: "SetF9",
    black: "SetF10"
  } satisfies Record<HolyricsPresentationModifierKey, string>;

  await getExecutor(options)(actionByKey[key], { enable });
}

type SupportedMediaDetailType = "image" | "video" | "audio" | "file";

export async function getHolyricsMediaDetail(
  type: SupportedMediaDetailType,
  name: string,
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsMediaDetail> {
  const actionByType = {
    image: "GetImage",
    video: "GetVideo",
    audio: "GetAudio",
    file: "GetFile"
  } satisfies Record<SupportedMediaDetailType, string>;

  const raw = (await getExecutor(options)(actionByType[type], {
    name,
    include_metadata: true,
    include_thumbnail: true
  })) as RawWrappedResponse<RawMediaFile> | RawMediaFile | null;
  const data = unwrapResponse(raw);

  return {
    type,
    name: asString(data?.name, name),
    thumbnail: typeof data?.thumbnail === "string" ? data.thumbnail : null,
    width: asNullableNumber(data?.width),
    height: asNullableNumber(data?.height),
    durationMs: asNullableNumber(data?.duration_ms),
    relativePath: typeof data?.relative_path === "string" ? data.relative_path : null
  };
}

export async function getHolyricsMediaPlayerInfo(
  options: HolyricsPlaylistServiceOptions = {}
): Promise<HolyricsMediaPlayerInfo> {
  const raw = (await getExecutor(options)("GetMediaPlayerInfo", {})) as
    | RawWrappedResponse<RawMediaPlayerInfo>
    | RawMediaPlayerInfo
    | null;
  const data = unwrapResponse(raw);

  return {
    name: asString(data?.name),
    path: asString(data?.path) || null,
    relativePath: asString(data?.relative_path) || null,
    playing: asBoolean(data?.playing),
    durationMs: asNullableNumber(data?.duration_ms),
    timeMs: asNullableNumber(data?.time_ms),
    timeElapsed: asString(data?.time_elapsed) || null,
    timeRemaining: asString(data?.time_remaining) || null,
    volume: asNullableNumber(data?.volume),
    mute: asBoolean(data?.mute),
    repeat: asBoolean(data?.repeat),
    executeSingle: asBoolean(data?.execute_single),
    shuffle: asBoolean(data?.shuffle),
    fullscreen: asBoolean(data?.fullscreen)
  };
}

export async function mediaPlayerAction(
  payload: MediaPlayerActionRequest,
  options: HolyricsPlaylistServiceOptions = {}
) {
  const body: Record<string, unknown> = {};

  if (payload.action) body.action = payload.action;
  if (typeof payload.volume === "number") body.volume = payload.volume;
  if (typeof payload.mute === "boolean") body.mute = payload.mute;
  if (typeof payload.repeat === "boolean") body.repeat = payload.repeat;
  if (typeof payload.shuffle === "boolean") body.shuffle = payload.shuffle;
  if (typeof payload.executeSingle === "boolean") body.execute_single = payload.executeSingle;
  if (typeof payload.fullscreen === "boolean") body.fullscreen = payload.fullscreen;
  if (typeof payload.timeMs === "number") body.time_ms = payload.timeMs;

  await getExecutor(options)("MediaPlayerAction", body);
}

export async function stopPresentation(options: HolyricsPlaylistServiceOptions = {}) {
  await getExecutor(options)("CloseCurrentPresentation", {});
}
