import React from "react";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/presentation/components/ui/dialog";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export function ConfirmDeleteDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Confirmer la suppression",
  description = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",
  confirmButtonText = "Supprimer",
  cancelButtonText = "Annuler",
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelButtonText}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
