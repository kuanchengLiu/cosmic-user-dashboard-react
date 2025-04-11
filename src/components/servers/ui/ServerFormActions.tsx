
import { Button } from "@/components/ui/button";

interface ServerFormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
  submitButtonText: string;
}

export function ServerFormActions({ 
  onClose, 
  isSubmitting, 
  submitButtonText 
}: ServerFormActionsProps) {
  return (
    <div className="flex justify-end space-x-2 pt-4 border-t">
      <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : submitButtonText}
      </Button>
    </div>
  );
}
