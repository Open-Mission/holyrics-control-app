import { useCallback, useEffect, useState } from "react";

import type {
  HolyricsImagePresentation,
  HolyricsMediaPlaylistItem,
  HolyricsMediaPlaylistResponse,
  HolyricsSongDetail
} from "@holyrics-control/shared";

import { HolyricsConnectionIndicator } from "@/components/HolyricsConnectionIndicator";
import { ImagePresentationSheet } from "@/components/ImagePresentationSheet";
import { MediaPlaylistPanel } from "@/components/MediaPlaylistPanel";
import { PageHeader } from "@/components/PageHeader";
import { PresentationConfirmDialog } from "@/components/PresentationConfirmDialog";
import { SongSectionsSheet } from "@/components/SongSectionsSheet";
import {
  fetchHolyricsMediaPlaylist,
  fetchHolyricsSongDetail,
  getCurrentSlide,
  getImagePresentationIndex,
  getSongPresentationIndex,
  goToHolyricsPresentationIndex,
  presentAndPreviewHolyricsImage,
  presentHolyricsPlaylistItem,
  presentHolyricsSong,
  stopHolyricsPresentation
} from "@/lib/holyrics-playlist";

const MOBILE_REFRESH_INTERVAL_MS = 60_000;
const SLIDE_POLL_INTERVAL_MS = 3_000;

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : "Erro inesperado.";
}

export function ServicePage() {
  const [playlist, setPlaylist] = useState<HolyricsMediaPlaylistResponse | null>(null);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [playlistError, setPlaylistError] = useState<string | null>(null);
  const [confirmItem, setConfirmItem] = useState<HolyricsMediaPlaylistItem | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [songItem, setSongItem] = useState<HolyricsMediaPlaylistItem | null>(null);
  const [song, setSong] = useState<HolyricsSongDetail | null>(null);
  const [songLoading, setSongLoading] = useState(false);
  const [songError, setSongError] = useState<string | null>(null);
  const [pendingSectionIndex, setPendingSectionIndex] = useState<number | null>(null);
  const [songPresentationActive, setSongPresentationActive] = useState(false);
  const [imageItem, setImageItem] = useState<HolyricsMediaPlaylistItem | null>(null);
  const [imagePresentation, setImagePresentation] = useState<HolyricsImagePresentation | null>(
    null
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [pendingImageIndex, setPendingImageIndex] = useState<number | null>(null);
  const [imagePresentationActive, setImagePresentationActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number | null>(null);

  const loadPlaylist = useCallback(async () => {
    setPlaylistLoading(true);
    setPlaylistError(null);

    try {
      setPlaylist(await fetchHolyricsMediaPlaylist());
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
    } finally {
      setPlaylistLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPlaylist();
  }, [loadPlaylist]);

  useEffect(() => {
    if (!songItem && !imageItem) {
      return;
    }

    let mounted = true;

    async function pollSlide() {
      try {
        const { slide } = await getCurrentSlide();
        if (mounted) {
          setCurrentSlide(slide);
        }
      } catch {
        // Ignore polling errors
      }
    }

    pollSlide();
    const interval = setInterval(pollSlide, SLIDE_POLL_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [songItem, imageItem]);

  async function handleConfirmPresentation() {
    if (!confirmItem) {
      return;
    }

    setPresenting(true);

    try {
      await presentHolyricsPlaylistItem(confirmItem.id);
      setConfirmItem(null);
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
    } finally {
      setPresenting(false);
    }
  }

  async function handleOpenSong(item: HolyricsMediaPlaylistItem) {
    const songId = item.songId ?? item.id;

    setSongItem(item);
    setSong(null);
    setSongError(null);
    setSongLoading(true);
    setSongPresentationActive(false);

    try {
      setSong(await fetchHolyricsSongDetail(songId, item.name));
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setSongLoading(false);
    }
  }

  async function handlePresentSong() {
    if (!songItem) {
      return;
    }

    const songId = songItem.songId ?? songItem.id;

    setPresenting(true);

    try {
      await presentHolyricsSong(songId, getSongPresentationIndex(0));
      setSongPresentationActive(true);
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setPresenting(false);
    }
  }

  async function handleGoToSection(index: number) {
    if (!songItem) {
      return;
    }

    const songId = songItem.songId ?? songItem.id;
    const presentationIndex = getSongPresentationIndex(index);

    setPendingSectionIndex(index);
    setSongError(null);

    try {
      if (!songPresentationActive) {
        await presentHolyricsSong(songId, presentationIndex);
        setSongPresentationActive(true);
      } else {
        await goToHolyricsPresentationIndex(presentationIndex);
      }
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setPendingSectionIndex(null);
    }
  }

  async function handleCloseSongSheet() {
    try {
      await stopHolyricsPresentation();
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
    } finally {
      setSongItem(null);
      setSong(null);
      setSongError(null);
      setPendingSectionIndex(null);
      setSongPresentationActive(false);
    }
  }

  async function handleOpenImage(item: HolyricsMediaPlaylistItem) {
    setImageItem(item);
    setImagePresentation(null);
    setImageError(null);
    setImageLoading(true);
    setImagePresentationActive(false);

    try {
      const presentation = await presentAndPreviewHolyricsImage(item.id);
      setImagePresentation(presentation);
      setImagePresentationActive(true);
    } catch (error) {
      setImageError(getErrorMessage(error));
    } finally {
      setImageLoading(false);
    }
  }

  async function handleShowImageSlide(index: number) {
    if (!imageItem) {
      return;
    }

    setPendingImageIndex(index);
    setImageError(null);

    try {
      await goToHolyricsPresentationIndex(getImagePresentationIndex(index));
    } catch (error) {
      setImageError(getErrorMessage(error));
    } finally {
      setPendingImageIndex(null);
    }
  }

  async function handleCloseImageSheet() {
    try {
      await stopHolyricsPresentation();
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
    } finally {
      setImageItem(null);
      setImagePresentation(null);
      setImageError(null);
      setPendingImageIndex(null);
      setImagePresentationActive(false);
    }
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Culto"
        description="Controle a playlist de midia do evento ativo e navegue pelas letras em apresentacao."
      />
      <HolyricsConnectionIndicator refreshIntervalMs={MOBILE_REFRESH_INTERVAL_MS} variant="mini" />
      <MediaPlaylistPanel
        error={playlistError}
        loading={playlistLoading}
        onOpenImage={handleOpenImage}
        onOpenSong={handleOpenSong}
        onPresent={setConfirmItem}
        onRefresh={loadPlaylist}
        playlist={playlist}
      />
      <PresentationConfirmDialog
        item={confirmItem}
        onConfirm={handleConfirmPresentation}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmItem(null);
          }
        }}
        open={Boolean(confirmItem)}
        pending={presenting}
      />
      <SongSectionsSheet
        currentSlide={currentSlide}
        error={songError}
        item={songItem}
        loading={songLoading}
        onGoToSection={handleGoToSection}
        onOpenChange={(open) => {
          if (!open) {
            void handleCloseSongSheet();
          }
        }}
        onPresentSong={handlePresentSong}
        open={Boolean(songItem)}
        pendingIndex={pendingSectionIndex}
        presentationActive={songPresentationActive}
        presenting={presenting}
        song={song}
      />
      <ImagePresentationSheet
        activeIndex={currentSlide}
        error={imageError}
        image={imagePresentation}
        item={imageItem}
        loading={imageLoading}
        onOpenChange={(open) => {
          if (!open) {
            void handleCloseImageSheet();
          }
        }}
        onShowSlide={handleShowImageSlide}
        open={Boolean(imageItem)}
        pendingIndex={pendingImageIndex}
      />
    </section>
  );
}
