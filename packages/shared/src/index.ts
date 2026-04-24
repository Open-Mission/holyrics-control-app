export type HealthStatus = {
  status: "ok";
};

export type HolyricsConfigSource = "env" | "local" | "none";

export type HolyricsConfigStatus = {
  configured: boolean;
  source: HolyricsConfigSource;
  baseUrl: string | null;
  tokenConfigured: boolean;
  tokenPreview: string | null;
};

export type SaveHolyricsConfigRequest = {
  baseUrl: string;
  token: string;
};

export type HolyricsConfigTestResult = {
  ok: boolean;
  version: string | null;
  permissions: string | null;
};

export type HolyricsMediaPlaylistItemType =
  | "title"
  | "song"
  | "verse"
  | "text"
  | "audio"
  | "video"
  | "image"
  | "file"
  | "announcement"
  | "automatic_presentation"
  | "countdown"
  | "countdown_cp"
  | "cp_text"
  | "plain_text"
  | "uri"
  | "actions"
  | "global_action"
  | "alert"
  | "cp_alert"
  | "theme_background"
  | "api"
  | "script"
  | "module_action"
  | string;

export type HolyricsMediaPlaylistItem = {
  id: string;
  songId: string | null;
  type: HolyricsMediaPlaylistItemType;
  name: string;
  index: number;
  title: string | null;
  executable: boolean;
};

export type HolyricsMediaPlaylistGroup = {
  title: string | null;
  items: HolyricsMediaPlaylistItem[];
};

export type HolyricsActiveSchedule = {
  type: "temporary" | "service" | "event" | string;
  name: string;
  datetime: string | null;
  notes: string;
  eventId: string | null;
};

export type HolyricsMediaPlaylistResponse = {
  schedule: HolyricsActiveSchedule | null;
  groups: HolyricsMediaPlaylistGroup[];
  items: HolyricsMediaPlaylistItem[];
};

export type PresentMediaPlaylistItemRequest = {
  id: string;
};

export type PresentSongRequest = {
  id: string;
  initialIndex?: number;
};

export type HolyricsSongSection = {
  index: number;
  name: string;
  tag: string | null;
  text: string;
};

export type HolyricsSongDetail = {
  id: string;
  title: string;
  artist: string;
  author: string;
  key: string;
  bpm: number | null;
  sections: HolyricsSongSection[];
};

export type GoToPresentationIndexRequest = {
  index: number;
};

export type HolyricsImageSlide = {
  index: number;
  name: string;
  thumbnail: string | null;
  width: number | null;
  height: number | null;
};

export type HolyricsImagePresentation = {
  name: string;
  slides: HolyricsImageSlide[];
};

export type PresentAndPreviewImageRequest = {
  id: string;
};
