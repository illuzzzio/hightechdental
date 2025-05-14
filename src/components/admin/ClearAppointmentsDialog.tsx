
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { clearAllAppointments } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

interface ClearAppointmentsDialogProps {
  onAppointmentsCleared: () => void; // Callback to refresh the table
}

export function ClearAppointmentsDialog({ onAppointmentsCleared }: ClearAppointmentsDialogProps) {
  const [confirmationText, setConfirmationText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleClearAppointments = async () => {
    if (confirmationText !== "clear") {
      toast({ title: "Confirmation Failed", description: "Please type 'clear' to confirm.", variant: "destructive" });
      return;
    }
    startTransition(async () => {
      const result = await clearAllAppointments();
      if (result.success) {
        toast({ title: "Appointments Cleared", description: "All appointment records have been removed." });
        onAppointmentsCleared(); // Refresh parent component
        setIsOpen(false);
        setConfirmationText("");
      } else {
        toast({ title: "Clearing Failed", description: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" /> Clear All Appointments
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all appointment records.
            To confirm, please type "<strong>clear</strong>" in the box below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder='Type "clear" to confirm'
          className="my-4"
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmationText("")}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClearAppointments}
            disabled={confirmationText !== "clear" || isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending ? "Clearing..." : "Clear Appointments"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
