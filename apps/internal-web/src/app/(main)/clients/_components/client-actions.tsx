import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@streeio-core/ui/components/alert-dialog";
import { Button } from "@streeio-core/ui/components/button";
import { Ban, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Client } from "@/types/client";

interface ClientActionsProps {
  client: Client;
  onDeactivate: () => void;
  onDelete: () => void;
}

export function ClientActions({
  client,
  onDeactivate,
  onDelete,
}: ClientActionsProps) {
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Button
          className="h-8 rounded-md border-slate-200"
          size="sm"
          variant="outline"
        >
          <Eye className="mr-2 h-3.5 w-3.5" />
          Edit
        </Button>

        {client.status === "Active" && (
          <Button
            className="h-8 rounded-md border-slate-200"
            onClick={() => setShowDeactivateDialog(true)}
            size="sm"
            variant="outline"
          >
            <Ban className="mr-2 h-3.5 w-3.5" />
            Decline
          </Button>
        )}

        {(client.status === "Pending" || client.status === "Deactivated") && (
          <Button
            className="h-8 rounded-md border-slate-200"
            onClick={() => setShowDeleteDialog(true)}
            size="sm"
            variant="outline"
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            Delete
          </Button>
        )}
      </div>

      <AlertDialog
        onOpenChange={setShowDeactivateDialog}
        open={showDeactivateDialog}
      >
        <AlertDialogContent className="rounded-2xl sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Client</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate{" "}
              <strong>{client.companyName}</strong>? They will no longer be able
              to log in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-md bg-orange-600 text-white hover:bg-orange-700"
              onClick={() => {
                onDeactivate();
                setShowDeactivateDialog(false);
              }}
            >
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <AlertDialogContent className="rounded-2xl sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Client</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to completely remove{" "}
              <strong>{client.companyName}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-md bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                onDelete();
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
