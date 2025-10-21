'use client';

import { useState, useMemo, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import type { Table, Reservation } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import TableLayout from './table-layout';
import { cn } from '@/lib/utils';
import { fetchReservationsForDate } from '@/lib/data';

interface BookingClientProps {
  tables: Table[];
  initialReservations: Reservation[];
  initialDate: string;
  initialTime: string;
  timeSlots: string[];
}

export default function BookingClient({ tables, initialReservations, initialDate, initialTime, timeSlots }: BookingClientProps) {
  const [date, setDate] = useState<Date | undefined>(parseISO(initialDate));
  const [time, setTime] = useState<string>(initialTime);
  const [partySize, setPartySize] = useState<number>(2);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getReservations() {
      if (!date) return;
      setIsLoading(true);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const fetchedReservations = await fetchReservationsForDate(formattedDate);
      setReservations(fetchedReservations);
      setIsLoading(false);
    }
    getReservations();
  }, [date]);

  const availableTables = useMemo(() => {
    return tables.filter(table => {
      const isReserved = reservations.some(
        reservation => reservation.tableId === table.id && reservation.time === time
      );
      const hasEnoughSeats = table.seats >= partySize;
      return !isReserved && hasEnoughSeats;
    });
  }, [tables, reservations, time, partySize]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Card className="w-full lg:w-1/3 lg:max-w-sm shrink-0">
        <CardHeader>
          <CardTitle className="font-headline">Find Your Table</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">Time</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <SelectValue placeholder="Select a time" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(slot => (
                  <SelectItem key={slot} value={slot}>{format(parseISO(`1970-01-01T${slot}:00`), 'p')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Party Size</label>
            <Select value={String(partySize)} onValueChange={(val) => setPartySize(Number(val))}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <SelectValue placeholder="Select party size" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => i + 1).map(size => (
                  <SelectItem key={size} value={String(size)}>{size} person{size > 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex-grow">
        <TableLayout 
          tables={tables} 
          availableTables={availableTables}
          selectedDate={date ? format(date, 'yyyy-MM-dd') : ''}
          selectedTime={time}
          partySize={partySize}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
