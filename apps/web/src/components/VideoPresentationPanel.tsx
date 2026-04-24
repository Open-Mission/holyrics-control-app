import { Loader2, Pause, Play, Video } from "lucide-react";

import type {
  HolyricsMediaDetail,
  HolyricsMediaPlayerInfo,
  HolyricsMediaPlaylistItem,
  HolyricsPresentationModifierKey,
  HolyricsPresentationModifiers
} from "@holyrics-control/shared";

import { MediaPresentationControls } from "@/components/MediaPresentationControls";
import { Button } from "@/components/ui/button";

type VideoPresentationPanelProps = {
  item: HolyricsMediaPlaylistItem | null;
  detail: HolyricsMediaDetail | null;
  player: HolyricsMediaPlayerInfo | null;
  loading: boolean;
  error: string | null;
  modifiers: HolyricsPresentationModifiers;
  pendingModifier: HolyricsPresentationModifierKey | null;
  playerPending: boolean;
  onToggleModifier: (key: HolyricsPresentationModifierKey, enable: boolean) => void;
  onPlayPause: () => void;
};

function getThumbnailSrc(thumbnail: string | null) {
  if (!thumbnail) return null;
  return thumbnail.startsWith("data:") ? thumbnail : `data:image/jpeg;base64,${thumbnail}`;
}

export function VideoPresentationPanel({
  item,
  detail,
  player,
  loading,
  error,
  modifiers,
  pendingModifier,
  playerPending,
  onToggleModifier,
  onPlayPause
}: VideoPresentationPanelProps) {
  const thumbnailSrc = getThumbnailSrc(detail?.thumbnail ?? null);

  return (
    <div className="flex flex-col gap-4">
      <div className="px-5 pt-1">
        <p className="text-sm leading-6 text-muted-foreground">
          {player?.timeElapsed && player?.timeRemaining
            ? `${player.timeElapsed} • restante ${player.timeRemaining}`
            : "Controle de video do Holyrics"}
        </p>
      </div>

      <div className="space-y-4 px-5 pb-5">
        <MediaPresentationControls
          modifiers={modifiers}
          onToggle={onToggleModifier}
          pendingKey={pendingModifier}
        />

        <div className="overflow-hidden rounded-lg border bg-card">
          {thumbnailSrc ? (
            <img alt={detail?.name ?? "Thumbnail do video"} className="aspect-video w-full object-cover" src={thumbnailSrc} />
          ) : (
            <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground">
              <Video className="size-8" />
            </div>
          )}
          <div className="space-y-2 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-card-foreground">{detail?.name ?? item?.name}</p>
            {detail?.width && detail?.height ? <p>{detail.width} x {detail.height}</p> : null}
            {detail?.durationMs ? <p>{Math.floor(detail.durationMs / 60000)}:{String(Math.floor((detail.durationMs % 60000) / 1000)).padStart(2, "0")}</p> : null}
          </div>
        </div>

        <Button className="w-full" disabled={loading || playerPending} onClick={onPlayPause} type="button">
          {loading || playerPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : player?.playing ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
          {player?.playing ? "Pausar video" : "Reproduzir video"}
        </Button>

        {error ? <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">{error}</div> : null}
      </div>
    </div>
  );
}
