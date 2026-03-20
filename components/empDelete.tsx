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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface EmpDeleteDialogProps {
  empId: string;
  onDelete: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EmpDleteAlertDialog({
  empId,
  onDelete,
  open,
  onOpenChange,
}: EmpDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            // onClick={async () => {
            //   try {
            //     // Call the PUT API
            //     const res = await fetch(`/api/employees/${empId}`, {
            //       method: 'DELETE',
            //       headers: {
            //         'Content-Type': 'application/json',
            //       },
            //       //   body: JSON.stringify(updatedData),
            //     });

            //     if (!res.ok) {
            //       const errData = await res.json().catch(() => null);
            //       console.error('Failed to update employee:', errData);
            //       throw new Error('Failed to update employee');
            //     }

            //     await res.json().catch(() => null); // Safely consume response regardless of 200/204
            //   } catch (err) {
            //     console.error(err);
            //     toast.error(
            //       'Failed to update employee. Check console for details.',
            //     );
            //   } finally {
            //     onOpenChange;
            //   }
            // }}
            onClick={() => onDelete()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
