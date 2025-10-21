import { fetchUserReservations, MOCK_USER } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar, Clock, Users, Hash } from 'lucide-react';
import CancelButton from '@/components/cancel-button';
import { format, parseISO } from 'date-fns';

export default async function MyReservationsPage() {
  const reservations = await fetchUserReservations(MOCK_USER.id);

  return (
    <div>
      <h1 className="text-3xl font-headline mb-6">My Reservations</h1>
      {reservations.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle>No Reservations Found</CardTitle>
            <CardDescription>You haven't booked any tables yet.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>Table {reservation.tableNumber}</CardTitle>
                <CardDescription>Reservation ID: {reservation.id}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(parseISO(reservation.date), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                   <span className="text-sm">{format(parseISO(`1970-01-01T${reservation.time}`), 'p')}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.partySize} Guests</span>
                </div>
              </CardContent>
              <CardFooter>
                <CancelButton reservationId={reservation.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
