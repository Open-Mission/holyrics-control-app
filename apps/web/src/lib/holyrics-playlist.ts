import type {
  GoToPresentationIndexRequest,
  HolyricsCurrentPresentationState,
  HolyricsImagePresentation,
  HolyricsMediaDetail,
  HolyricsMediaPlayerInfo,
  HolyricsMediaPlaylistItemType,
  HolyricsMediaPlaylistResponse,
  HolyricsPresentationModifierKey,
  HolyricsPresentationModifiers,
  HolyricsSongDetail,
  MediaPlayerActionRequest,
  PresentAndPreviewImageRequest,
  PresentMediaPlaylistItemRequest,
  PresentationModifierRequest,
  PresentSongRequest
} from "@holyrics-control/shared";

type ApiError = {
  error?: string;
};

async function readApiError(response: Response) {
  try {
    const payload = (await response.json()) as ApiError;
    return payload.error ?? `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

async function readJsonResponse<T>(response: Response) {
  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as T;
}

async function postJson<TBody extends object>(
  url: string,
  body: TBody,
  fetcher: typeof fetch = fetch
) {
  const response = await fetcher(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  await readJsonResponse<{ ok: true }>(response);
}

export async function fetchHolyricsMediaPlaylist(fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/media-playlist");
  return readJsonResponse<HolyricsMediaPlaylistResponse>(response);
}

export async function fetchCurrentPresentationState(fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/presentation/state");
  return readJsonResponse<HolyricsCurrentPresentationState>(response);
}

export async function fetchPresentationModifiers(fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/presentation/modifiers");
  return readJsonResponse<HolyricsPresentationModifiers>(response);
}

export async function fetchHolyricsSongDetail(id: string, songName?: string, fetcher: typeof fetch = fetch) {
  const path = `/api/holyrics/songs/${encodeURIComponent(id)}`;
  const query = songName && songName.trim() ? `?name=${encodeURIComponent(songName)}` : "";
  const response = await fetcher(`${path}${query}`);
  return readJsonResponse<HolyricsSongDetail>(response);
}

export async function setHolyricsPresentationModifier(
  key: HolyricsPresentationModifierKey,
  enable: boolean,
  fetcher: typeof fetch = fetch
) {
  await postJson<PresentationModifierRequest>(
    "/api/holyrics/presentation/modifiers",
    { key, enable },
    fetcher
  );
}

export async function presentAndPreviewHolyricsImage(id: string, fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/images/present-and-preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id } satisfies PresentAndPreviewImageRequest)
  });

  return readJsonResponse<HolyricsImagePresentation>(response);
}

export async function presentHolyricsPlaylistItem(id: string, fetcher: typeof fetch = fetch) {
  await postJson<PresentMediaPlaylistItemRequest>("/api/holyrics/media-playlist/present", { id }, fetcher);
}

export async function presentHolyricsSong(id: string, initialIndex = 0, fetcher: typeof fetch = fetch) {
  await postJson<PresentSongRequest>("/api/holyrics/songs/present", { id, initialIndex }, fetcher);
}

type SupportedHolyricsMediaDetailType = "image" | "video" | "audio" | "file";

export async function fetchHolyricsMediaDetail(
  type: SupportedHolyricsMediaDetailType,
  name: string,
  fetcher: typeof fetch = fetch
) {
  const query = new URLSearchParams({ type, name });
  const response = await fetcher(`/api/holyrics/media/detail?${query.toString()}`);
  return readJsonResponse<HolyricsMediaDetail>(response);
}

export async function fetchHolyricsMediaPlayerInfo(fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/media/player");
  return readJsonResponse<HolyricsMediaPlayerInfo>(response);
}

export async function mediaPlayerAction(
  body: MediaPlayerActionRequest,
  fetcher: typeof fetch = fetch
) {
  await postJson<MediaPlayerActionRequest>("/api/holyrics/media/player/action", body, fetcher);
}

export async function goToHolyricsPresentationIndex(index: number, fetcher: typeof fetch = fetch) {
  await postJson<GoToPresentationIndexRequest>("/api/holyrics/presentation/goto-index", { index }, fetcher);
}

export async function stopHolyricsPresentation(fetcher: typeof fetch = fetch) {
  await postJson("/api/holyrics/presentation/stop", {}, fetcher);
}

export async function getCurrentSlide(fetcher: typeof fetch = fetch) {
  const response = await fetcher("/api/holyrics/presentation/current-slide");
  return readJsonResponse<{ slide: number | null }>(response);
}

export function getSongPresentationIndex(sectionIndex: number) {
  return sectionIndex + 1;
}

export function getImagePresentationIndex(slideIndex: number) {
  return slideIndex;
}

export function getMediaItemLabel(type: HolyricsMediaPlaylistItemType) {
  const labels: Record<string, string> = {
    title: "Titulo",
    song: "Musica",
    verse: "Versiculo",
    text: "Texto",
    audio: "Audio",
    video: "Video",
    image: "Imagem",
    announcement: "Aviso",
    automatic_presentation: "Apresentacao",
    countdown: "Contagem",
    countdown_cp: "Contagem CP",
    cp_text: "Texto CP",
    plain_text: "Texto",
    uri: "Link",
    actions: "Acoes",
    global_action: "Acao global",
    alert: "Alerta",
    cp_alert: "Alerta CP",
    theme_background: "Tema",
    api: "API",
    script: "Script",
    module_action: "Modulo",
    file: "Arquivo"
  };

  return labels[type] ?? type;
}

export function getMediaItemTone(type: HolyricsMediaPlaylistItemType) {
  if (type === "song") {
    return "primary";
  }

  if (type === "video" || type === "image" || type === "audio" || type === "automatic_presentation") {
    return "media";
  }

  return "muted";
}
