import { Loader2, Play } from "lucide-react";

import type { HolyricsMediaPlaylistItem } from "@holyrics-control/shared";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { getMediaItemLabel } from "@/lib/holyrics-playlist";

type PresentationConfirmDialogProps = {
  item: HolyricsMediaPlaylistItem | null;
  open: boolean;
  pending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function PresentationConfirmDialog({
  item,
  open,
  pending,
  onOpenChange,
  onConfirm
}: PresentationConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apresentar na tela?</DialogTitle>
          <DialogDescription>
            {item
              ? `Deseja apresentar "${item.name}" agora? Tipo: ${getMediaItemLabel(item.type)}.`
              : "Selecione um item da playlist para apresentar."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={pending} onClick={() => onOpenChange(false)} type="button" variant="outline">
            Cancelar
          </Button>
          <Button disabled={!item || pending} onClick={onConfirm} type="button">
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
            Sim, apresentar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
