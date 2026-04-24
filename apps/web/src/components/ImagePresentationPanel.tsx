import { ImageIcon, Loader2, Play, SkipForward } from "lucide-react";

import type {
  HolyricsImagePresentation,
  HolyricsMediaPlaylistItem,
  HolyricsPresentationModifierKey,
  HolyricsPresentationModifiers
} from "@holyrics-control/shared";

import { MediaPresentationControls } from "@/components/MediaPresentationControls";

type ImagePresentationPanelProps = {
  item: HolyricsMediaPlaylistItem | null;
  image: HolyricsImagePresentation | null;
  loading: boolean;
  pendingIndex: number | null;
  activeIndex: number | null;
  modifiers: HolyricsPresentationModifiers;
  pendingModifier: HolyricsPresentationModifierKey | null;
  error: string | null;
  onShowSlide: (index: number) => void;
  onToggleModifier: (key: HolyricsPresentationModifierKey, enable: boolean) => void;
};

function getThumbnailSrc(thumbnail: string | null) {
  if (!thumbnail) {
    return null;
  }

  if (thumbnail.startsWith("data:")) {
    return thumbnail;
  }

  return `data:image/jpeg;base64,${thumbnail}`;
}

export function ImagePresentationPanel({
  item,
  image,
  loading,
  pendingIndex,
  activeIndex,
  modifiers,
  pendingModifier,
  error,
  onShowSlide,
  onToggleModifier
}: ImagePresentationPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-5 pt-1">
        <p className="text-sm leading-6 text-muted-foreground">
          {image
            ? image.slides.length === 1
              ? "Preview da imagem do Holyrics"
              : `${image.slides.length} imagens nesta sequencia`
            : "Carregando imagem do Holyrics"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {loading ? (
          <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 size-4 animate-spin" />
            Carregando imagem
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {image ? (
          <div className="space-y-3">
            <MediaPresentationControls
              modifiers={modifiers}
              onToggle={onToggleModifier}
              pendingKey={pendingModifier}
            />

            {image.slides.length === 0 ? (
              <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
                O Holyrics nao retornou imagens para este item.
              </div>
            ) : null}

            {image.slides.map((slide) => {
              const thumbnailSrc = getThumbnailSrc(slide.thumbnail);
              const isActive = activeIndex === slide.index;

              return (
                <button
                  className="w-full overflow-hidden rounded-lg border bg-card text-left shadow-sm transition hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={pendingIndex !== null}
                  key={`${slide.name}-${slide.index}`}
                  onClick={() => onShowSlide(slide.index)}
                  style={
                    isActive
                      ? { borderColor: "var(--primary)", outline: "2px solid var(--primary)" }
                      : undefined
                  }
                  type="button"
                >
                  {thumbnailSrc ? (
                    <img
                      alt={slide.name}
                      className="aspect-video w-full max-h-[360px] bg-muted object-contain"
                      src={thumbnailSrc}
                    />
                  ) : (
                    <div className="flex aspect-video w-full max-h-[360px] items-center justify-center bg-muted text-muted-foreground">
                      <ImageIcon className="size-8" />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-card-foreground">
                        {slide.name}
                      </p>
                      {slide.width && slide.height ? (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {slide.width} x {slide.height}
                        </p>
                      ) : null}
                    </div>
                    {pendingIndex === slide.index ? (
                      <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
                    ) : slide.index === 0 ? (
                      <Play className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <SkipForward className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
