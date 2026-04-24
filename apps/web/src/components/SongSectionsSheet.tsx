import { Loader2, Mic2, Play, SkipForward } from "lucide-react";

import type { HolyricsMediaPlaylistItem, HolyricsSongDetail } from "@holyrics-control/shared";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

type SongSectionsSheetProps = {
  item: HolyricsMediaPlaylistItem | null;
  song: HolyricsSongDetail | null;
  open: boolean;
  loading: boolean;
  pendingIndex: number | null;
  presenting: boolean;
  presentationActive: boolean;
  currentSlide: number | null;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  onPresentSong: () => void;
  onGoToSection: (index: number) => void;
};

export function SongSectionsSheet({
  item,
  song,
  open,
  loading,
  pendingIndex,
  presenting,
  presentationActive,
  currentSlide,
  error,
  onOpenChange,
  onPresentSong,
  onGoToSection
}: SongSectionsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="md:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{song?.title ?? item?.name ?? "Musica"}</SheetTitle>
          <SheetDescription>
            {song
              ? [song.artist, song.author, song.key ? `Tom ${song.key}` : null]
                  .filter(Boolean)
                  .join(" • ") || "Letra do Holyrics"
              : "Carregando letra do Holyrics"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {loading ? (
            <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Carregando musica
            </div>
          ) : null}

          {error ? (
            <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {song ? (
            <div className="space-y-3">
              <Button
                className="w-full"
                disabled={presenting || presentationActive}
                onClick={onPresentSong}
                type="button"
              >
                {presenting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Play className="size-4" />
                )}
                {presentationActive ? "Musica em apresentacao" : "Apresentar musica"}
              </Button>

              {song.sections.length === 0 ? (
                <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
                  O Holyrics nao retornou secoes para esta musica.
                </div>
              ) : null}

              {song.sections.map((section) => {
                const isPending = pendingIndex === section.index + 1;
                const isActive = isPending || currentSlide === section.index + 1;

                return (
                  <button
                    className="w-full rounded-lg border bg-card p-4 text-left shadow-sm transition hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled={pendingIndex !== null}
                    key={section.index}
                    onClick={() => onGoToSection(section.index + 1)}
                    style={isActive ? { borderColor: "var(--primary)", outline: "2px solid var(--primary)" } : undefined}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <Mic2 className="size-4 shrink-0 text-primary" />
                        <p className="truncate text-sm font-semibold text-card-foreground">
                          {section.tag ? `${section.tag} - ${section.name}` : section.name}
                        </p>
                      </div>
                      {isPending ? (
                        <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                      ) : isActive ? (
                        <Play className="size-4 shrink-0 text-primary" />
                      ) : (
                        <SkipForward className="size-4 shrink-0 text-muted-foreground" />
                      )}
                    </div>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                      {section.text}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}