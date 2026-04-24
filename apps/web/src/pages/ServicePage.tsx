import { useCallback, useEffect, useState } from "react";

import type {
  HolyricsCurrentPresentationState,
  HolyricsImagePresentation,
  HolyricsMediaDetail,
  HolyricsMediaPlayerInfo,
  HolyricsMediaPlaylistItem,
  HolyricsMediaPlaylistResponse,
  HolyricsPresentationModifierKey,
  HolyricsPresentationModifiers,
  HolyricsSongDetail
} from "@holyrics-control/shared";

import { HolyricsConnectionIndicator } from "@/components/HolyricsConnectionIndicator";
import { ImagePresentationPanel } from "@/components/ImagePresentationPanel";
import { MediaPlaylistPanel } from "@/components/MediaPlaylistPanel";
import { PageHeader } from "@/components/PageHeader";
import { PresentationConfirmDialog } from "@/components/PresentationConfirmDialog";
import { SongSectionsPanel } from "@/components/SongSectionsPanel";
import { useSubScreen } from "@/components/sub-screen-context";
import { VideoPresentationPanel } from "@/components/VideoPresentationPanel";
import {
  fetchCurrentPresentationState,
  fetchHolyricsMediaDetail,
  fetchHolyricsMediaPlayerInfo,
  fetchHolyricsMediaPlaylist,
  fetchHolyricsSongDetail,
  fetchPresentationModifiers,
  getImagePresentationIndex,
  getSongPresentationIndex,
  goToHolyricsPresentationIndex,
  mediaPlayerAction,
  presentAndPreviewHolyricsImage,
  presentHolyricsPlaylistItem,
  presentHolyricsSong,
  setHolyricsPresentationModifier,
  stopHolyricsPresentation
} from "@/lib/holyrics-playlist";

const MOBILE_REFRESH_INTERVAL_MS = 60_000;
const SLIDE_POLL_INTERVAL_MS = 3_000;

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : "Erro inesperado.";
}

export function ServicePage() {
  const { openSubScreen, closeSubScreen } = useSubScreen();

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

  const [videoItem, setVideoItem] = useState<HolyricsMediaPlaylistItem | null>(null);
  const [videoDetail, setVideoDetail] = useState<HolyricsMediaDetail | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);

  const [presentationModifiers, setPresentationModifiers] = useState<HolyricsPresentationModifiers>(
    {
      wallpaper: false,
      blank: false,
      black: false
    }
  );
  const [pendingModifier, setPendingModifier] = useState<HolyricsPresentationModifierKey | null>(
    null
  );
  const [currentPresentation, setCurrentPresentation] =
    useState<HolyricsCurrentPresentationState | null>(null);
  const [optimisticSongIndex, setOptimisticSongIndex] = useState<number | null>(null);
  const [mediaPlayer, setMediaPlayer] = useState<HolyricsMediaPlayerInfo | null>(null);
  const [playerPending, setPlayerPending] = useState(false);

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

  const anySheetOpen = Boolean(songItem || imageItem || videoItem);

  useEffect(() => {
    if (!anySheetOpen) {
      return;
    }

    let mounted = true;

    async function poll() {
      try {
        const [state, modifiers, player] = await Promise.all([
          fetchCurrentPresentationState(),
          fetchPresentationModifiers(),
          videoItem ? fetchHolyricsMediaPlayerInfo() : Promise.resolve(null)
        ]);

        if (!mounted) return;

        setCurrentPresentation(state);
        setPresentationModifiers(modifiers);
        if (player) setMediaPlayer(player);
      } catch {
        // ignore polling errors
      }
    }

    void poll();
    const interval = setInterval(poll, SLIDE_POLL_INTERVAL_MS);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [anySheetOpen, videoItem]);

  useEffect(() => {
    if (currentPresentation?.type === "song" && currentPresentation.slideNumber !== null) {
      setOptimisticSongIndex(currentPresentation.slideNumber);
    }
  }, [currentPresentation]);

  async function handleToggleModifier(key: HolyricsPresentationModifierKey, enable: boolean) {
    setPendingModifier(key);
    setPresentationModifiers((current) => ({ ...current, [key]: enable }));

    try {
      await setHolyricsPresentationModifier(key, enable);
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
      setPresentationModifiers((current) => ({ ...current, [key]: !enable }));
    } finally {
      setPendingModifier(null);
    }
  }

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
    setOptimisticSongIndex(null);

    openSubScreen(item.name, null);

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
    setOptimisticSongIndex(index);
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

  const handleCloseSongPanel = useCallback(async () => {
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
      setOptimisticSongIndex(null);
      closeSubScreen();
    }
  }, [closeSubScreen]);

  async function handleOpenImage(item: HolyricsMediaPlaylistItem) {
    setImageItem(item);
    setImagePresentation(null);
    setImageError(null);
    setImageLoading(true);
    setImagePresentationActive(false);

    openSubScreen(item.name, null);

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

  const handleCloseImagePanel = useCallback(async () => {
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
      closeSubScreen();
    }
  }, [closeSubScreen]);

  async function handleOpenMedia(item: HolyricsMediaPlaylistItem) {
    if (item.type === "image") {
      await handleOpenImage(item);
      return;
    }

    if (item.type !== "video" && item.type !== "audio" && item.type !== "file") {
      setConfirmItem(item);
      return;
    }

    setVideoItem(item);
    setVideoDetail(null);
    setVideoError(null);
    setVideoLoading(true);
    setMediaPlayer(null);

    openSubScreen(item.name, null);

    try {
      await presentHolyricsPlaylistItem(item.id);
      setVideoDetail(await fetchHolyricsMediaDetail(item.type, item.name));
      if (item.type === "video" || item.type === "audio") {
        setMediaPlayer(await fetchHolyricsMediaPlayerInfo());
      }
    } catch (error) {
      setVideoError(getErrorMessage(error));
    } finally {
      setVideoLoading(false);
    }
  }

  async function handleToggleVideoPlayback() {
    setPlayerPending(true);
    setVideoError(null);

    try {
      await mediaPlayerAction({ action: mediaPlayer?.playing ? "pause" : "play" });
      setMediaPlayer(await fetchHolyricsMediaPlayerInfo());
    } catch (error) {
      setVideoError(getErrorMessage(error));
    } finally {
      setPlayerPending(false);
    }
  }

  const handleCloseVideoPanel = useCallback(async () => {
    try {
      await stopHolyricsPresentation();
    } catch (error) {
      setPlaylistError(getErrorMessage(error));
    } finally {
      setVideoItem(null);
      setVideoDetail(null);
      setVideoError(null);
      setMediaPlayer(null);
      closeSubScreen();
    }
  }, [closeSubScreen]);

  // Sync sub-screen content when state changes
  useEffect(() => {
    if (songItem) {
      openSubScreen(
        song?.title ?? songItem.name,
        <SongSectionsPanel
          currentSlide={currentPresentation?.slideNumber ?? null}
          error={songError}
          item={songItem}
          loading={songLoading}
          onGoToSection={handleGoToSection}
          onPresentSong={handlePresentSong}
          onToggleModifier={handleToggleModifier}
          optimisticSectionIndex={optimisticSongIndex}
          pendingIndex={pendingSectionIndex}
          pendingModifier={pendingModifier}
          modifiers={presentationModifiers}
          presentationActive={songPresentationActive}
          presenting={presenting}
          song={song}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    songItem,
    song,
    songLoading,
    songError,
    pendingSectionIndex,
    presenting,
    songPresentationActive,
    currentPresentation,
    optimisticSongIndex,
    presentationModifiers,
    pendingModifier
  ]);

  useEffect(() => {
    if (imageItem) {
      openSubScreen(
        imagePresentation?.name ?? imageItem.name,
        <ImagePresentationPanel
          activeIndex={currentPresentation?.slideNumber ?? null}
          error={imageError}
          image={imagePresentation}
          item={imageItem}
          loading={imageLoading}
          onShowSlide={handleShowImageSlide}
          onToggleModifier={handleToggleModifier}
          pendingIndex={pendingImageIndex}
          pendingModifier={pendingModifier}
          modifiers={presentationModifiers}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    imageItem,
    imagePresentation,
    imageLoading,
    imageError,
    pendingImageIndex,
    currentPresentation,
    presentationModifiers,
    pendingModifier
  ]);

  useEffect(() => {
    if (videoItem) {
      openSubScreen(
        videoDetail?.name ?? videoItem.name,
        <VideoPresentationPanel
          detail={videoDetail}
          error={videoError}
          item={videoItem}
          loading={videoLoading}
          modifiers={presentationModifiers}
          onPlayPause={handleToggleVideoPlayback}
          onToggleModifier={handleToggleModifier}
          pendingModifier={pendingModifier}
          player={mediaPlayer}
          playerPending={playerPending}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    videoItem,
    videoDetail,
    videoLoading,
    videoError,
    presentationModifiers,
    pendingModifier,
    mediaPlayer,
    playerPending
  ]);

  // Listen for sub-screen close to clean up state
  const { isOpen } = useSubScreen();

  useEffect(() => {
    if (!isOpen && songItem) {
      void handleCloseSongPanel();
    } else if (!isOpen && imageItem) {
      void handleCloseImagePanel();
    } else if (!isOpen && videoItem) {
      void handleCloseVideoPanel();
    }
    // Only trigger when isOpen changes to false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
        onOpenMedia={handleOpenMedia}
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
    </section>
  );
}
