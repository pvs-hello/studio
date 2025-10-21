'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { MOCK_USER, addReservation, deleteReservation, findReservationForTable, fetchTables } from './data';
import { cookies } from 'next/headers';

const ReservationSchema = z.object({
  tableId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  partySize: z.coerce.number().min(1, "Party size must be at least 1"),
});

export async function createReservation(formData: FormData) {
  const validatedFields = ReservationSchema.safeParse({
    tableId: formData.get('tableId'),
    date: formData.get('date'),
    time: formData.get('time'),
    partySize: formData.get('partySize'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid data provided.',
    };
  }
  
  const { tableId, date, time, partySize } = validatedFields.data;

  // Double booking prevention
  const existingReservation = findReservationForTable(tableId, date, time);
  if (existingReservation) {
    return {
      error: 'This table is already booked for the selected date and time.',
    };
  }

  const tables = await fetchTables();
  const table = tables.find(t => t.id === tableId);
  if (!table) {
    return { error: 'Table not found.' };
  }
  if (partySize > table.seats) {
      return { error: `This table only has ${table.seats} seats.`};
  }

  try {
    addReservation({
      userId: MOCK_USER.id,
      userName: MOCK_USER.name,
      tableId,
      tableNumber: table.number,
      date,
      time,
      partySize,
    });
  } catch (e) {
    return {
      error: 'Failed to create reservation.',
    };
  }

  revalidatePath('/');
  revalidatePath('/my-reservations');
  revalidatePath('/admin');
  return { success: 'Reservation created successfully!' };
}

export async function cancelReservation(reservationId: string) {
  try {
    const success = deleteReservation(reservationId);
    if (!success) {
        throw new Error("Reservation not found");
    }
  } catch (e) {
    return {
      error: 'Failed to cancel reservation.',
    };
  }

  revalidatePath('/');
  revalidatePath('/my-reservations');
  revalidatePath('/admin');
  return { success: 'Reservation cancelled.' };
}

export async function mockLogin() {
    cookies().set('mock-auth-token', 'true', { path: '/', httpOnly: true });
    revalidatePath('/login');
}

export async function mockLogout() {
    cookies().delete('mock-auth-token');
    revalidatePath('/');
}
