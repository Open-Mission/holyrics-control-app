import { useCallback, useEffect, useState } from "react";

import type { HolyricsMediaPlaylistItem, HolyricsMediaPlaylistResponse, HolyricsSongDetail } from "@holyrics-control/shared";

import { HolyricsConnectionIndicator } from "@/components/HolyricsConnectionIndicator";
import { MediaPlaylistPanel } from "@/components/MediaPlaylistPanel";
import { PageHeader } from "@/components/PageHeader";
import { PresentationConfirmDialog } from "@/components/PresentationConfirmDialog";
import { SongSectionsSheet } from "@/components/SongSectionsSheet";
import {
  fetchHolyricsMediaPlaylist,
  fetchHolyricsSongDetail,
  goToHolyricsPresentationIndex,
  presentHolyricsPlaylistItem,
  presentHolyricsSong
} from "@/lib/holyrics-playlist";

const MOBILE_REFRESH_INTERVAL_MS = 60_000;

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
      await presentHolyricsSong(songId, 0);
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setPresenting(false);
    }
  }

  async function handleGoToSection(index: number) {
    setPendingSectionIndex(index);

    try {
      await goToHolyricsPresentationIndex(index);
    } catch (error) {
      setSongError(getErrorMessage(error));
    } finally {
      setPendingSectionIndex(null);
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
        error={songError}
        item={songItem}
        loading={songLoading}
        onGoToSection={handleGoToSection}
        onOpenChange={(open) => {
          if (!open) {
            setSongItem(null);
            setSong(null);
            setSongError(null);
          }
        }}
        onPresentSong={handlePresentSong}
        open={Boolean(songItem)}
        pendingIndex={pendingSectionIndex}
        presenting={presenting}
        song={song}
      />
    </section>
  );
}
