import { fetchTables, fetchReservationsForDate } from '@/lib/data';
import BookingClient from '@/components/booking-client';
import { add, format } from 'date-fns';

export default async function Home() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const initialTime = `${new Date().getHours().toString().padStart(2, '0')}:00`;
  const tables = await fetchTables();
  const reservations = await fetchReservationsForDate(today);

  // Generate a list of available times for today from the next hour
  const now = new Date();
  const nextHour = add(now, { hours: 1 });
  const startHour = nextHour.getHours();
  
  const timeSlots = Array.from({ length: 24 - startHour }, (_, i) => {
    const hour = startHour + i;
    if (hour < 12 || hour > 22) return null; // Restaurant hours 12:00 - 22:00
    return `${hour.toString().padStart(2, '0')}:00`;
  }).filter(Boolean) as string[];

  return (
    <div className="w-full">
      <BookingClient 
        tables={tables} 
        initialReservations={reservations} 
        initialDate={today}
        initialTime={timeSlots.includes(initialTime) ? initialTime : timeSlots[0]}
        timeSlots={timeSlots}
      />
    </div>
  );
}
