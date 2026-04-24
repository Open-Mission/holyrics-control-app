import { CalendarClock, FileX2, ListMusic, Music2, Play, RefreshCw } from "lucide-react";

import type { HolyricsMediaPlaylistItem, HolyricsMediaPlaylistResponse } from "@holyrics-control/shared";

import { Button } from "@/components/ui/button";
import { getMediaItemLabel, getMediaItemTone } from "@/lib/holyrics-playlist";
import { cn } from "@/lib/utils";

type MediaPlaylistPanelProps = {
  playlist: HolyricsMediaPlaylistResponse | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPresent: (item: HolyricsMediaPlaylistItem) => void;
  onOpenSong: (item: HolyricsMediaPlaylistItem) => void;
};

function formatScheduleDate(value: string | null) {
  if (!value) {
    return "Sem data definida";
  }

  return value;
}

function ItemBadge({ type }: { type: string }) {
  const tone = getMediaItemTone(type);

  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center rounded-md border px-2 text-xs font-medium",
        tone === "primary" && "border-primary/25 bg-primary/10 text-primary",
        tone === "media" && "border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
        tone === "muted" && "border-border bg-muted text-muted-foreground"
      )}
    >
      {getMediaItemLabel(type)}
    </span>
  );
}

export function MediaPlaylistPanel({
  playlist,
  loading,
  error,
  onRefresh,
  onPresent,
  onOpenSong
}: MediaPlaylistPanelProps) {
  const hasItems = Boolean(playlist?.items.some((item) => item.type !== "title"));

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">Evento ativo</p>
            <h2 className="mt-1 truncate text-xl font-semibold text-card-foreground">
              {playlist?.schedule?.name || "Nenhum evento selecionado"}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="size-4" />
              <span>{formatScheduleDate(playlist?.schedule?.datetime ?? null)}</span>
            </div>
          </div>
          <Button disabled={loading} onClick={onRefresh} size="icon" type="button" variant="outline">
            <RefreshCw className={cn("size-4", loading && "animate-spin")} />
            <span className="sr-only">Atualizar playlist</span>
          </Button>
        </div>
        {playlist?.schedule?.notes ? (
          <p className="mt-3 rounded-md bg-muted px-3 py-2 text-sm leading-6 text-muted-foreground">
            {playlist.schedule.notes}
          </p>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!loading && !hasItems ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <FileX2 className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">Playlist de midia vazia</p>
          <p className="mt-1 text-sm text-muted-foreground">Adicione itens no Holyrics para controlar por aqui.</p>
        </div>
      ) : null}

      <section className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ListMusic className="size-4 text-primary" />
          Playlist de midia
        </div>
        <div className="space-y-5">
          {playlist?.groups.map((group, groupIndex) => (
            <section className="space-y-2" key={`${group.title ?? "sem-titulo"}-${groupIndex}`}>
              <h3 className="text-sm font-semibold text-foreground">{group.title ?? "Sem titulo"}</h3>
              <div className="divide-y rounded-lg border bg-card shadow-sm">
                {group.items.map((item) => (
                  <div className="flex items-center gap-3 p-3" key={`${item.id}-${item.index}`}>
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Music2 className="size-4" />
                    </div>
                    <button
                      className="min-w-0 flex-1 text-left"
                      onClick={() =>
                        item.type === "song" ? onOpenSong(item) : item.executable ? onPresent(item) : undefined
                      }
                      type="button"
                    >
                      <p className="truncate text-sm font-medium text-card-foreground">{item.name}</p>
                      <div className="mt-1">
                        <ItemBadge type={item.type} />
                      </div>
                    </button>
                    {item.executable ? (
                      <Button onClick={() => onPresent(item)} size="icon-sm" type="button" variant="outline">
                        <Play className="size-4" />
                        <span className="sr-only">Apresentar {item.name}</span>
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
