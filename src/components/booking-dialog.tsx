'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { createReservation } from '@/lib/actions';
import type { Table } from '@/lib/definitions';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, VenetianMask } from 'lucide-react';
import { MOCK_USER } from '@/lib/data';
import { format, parseISO } from 'date-fns';
import { useFormStatus } from 'react-dom';

interface BookingDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  table: Table;
  date: string;
  time: string;
  partySize: number;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending}>
            {pending ? 'Confirming...' : <><CheckCircle className="mr-2 h-4 w-4" /> Confirm Booking</>}
        </Button>
    )
}

export default function BookingDialog({ isOpen, setIsOpen, table, date, time, partySize }: BookingDialogProps) {
  const { toast } = useToast();

  const handleAction = async (formData: FormData) => {
    const result = await createReservation(formData);
    if (result?.error) {
      toast({
        title: 'Booking Failed',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Booking Confirmed!',
        description: `Your reservation for Table ${table.number} is confirmed.`,
      });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Confirm Your Reservation</DialogTitle>
          <DialogDescription>
            You are booking Table {table.number}. Please review the details below.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction}>
            <input type="hidden" name="tableId" value={table.id} />
            <input type="hidden" name="date" value={date} />
            <input type="hidden" name="time" value={time} />
            <input type="hidden" name="partySize" value={partySize} />

            <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4 text-sm">
                    <VenetianMask className="h-5 w-5 text-muted-foreground" />
                    <span>Booking for: <strong>{MOCK_USER.name}</strong></span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Date: <strong>{format(parseISO(date), 'EEEE, MMMM d, yyyy')}</strong></span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>Time: <strong>{format(parseISO(`1970-01-01T${time}`), 'p')}</strong></span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Party Size: <strong>{partySize} guest{partySize > 1 ? 's' : ''}</strong></span>
                </div>
                 <p className="text-xs text-muted-foreground pt-4">
                    By clicking confirm, you agree to our terms of service. This is a mock reservation.
                </p>
            </div>
            <DialogFooter>
                <SubmitButton />
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
