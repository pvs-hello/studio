import type { Table, Reservation } from './definitions';

// In-memory store for mock data
let mockTables: Table[] = [
  { id: 't1', number: 1, seats: 2, position: { x: 1, y: 1 }, shape: 'square' },
  { id: 't2', number: 2, seats: 2, position: { x: 2, y: 1 }, shape: 'square' },
  { id: 't3', number: 3, seats: 4, position: { x: 4, y: 1 }, shape: 'round' },
  { id: 't4', number: 4, seats: 4, position: { x: 5, y: 1 }, shape: 'round' },
  { id: 't5', number: 5, seats: 6, position: { x: 1, y: 3 }, shape: 'rectangle' },
  { id: 't6', number: 6, seats: 4, position: { x: 3, y: 3 }, shape: 'square' },
  { id: 't7', number: 7, seats: 8, position: { x: 5, y: 3 }, shape: 'rectangle' },
  { id: 't8', number: 8, seats: 2, position: { x: 1, y: 5 }, shape: 'square' },
  { id: 't9', number: 9, seats: 2, position: { x: 2, y: 5 }, shape: 'square' },
  { id: 't10', number: 10, seats: 4, position: { x: 4, y: 5 }, shape: 'round' },
];

let mockReservations: Reservation[] = [
  // A few initial reservations for demonstration
  {
    id: 'res1',
    userId: 'user-456',
    userName: 'Jane Doe',
    tableId: 't3',
    tableNumber: 3,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    partySize: 4,
  },
  {
    id: 'res2',
    userId: 'user-789',
    userName: 'Peter Jones',
    tableId: 't5',
    tableNumber: 5,
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    partySize: 5,
  },
];

// MOCK USER ID for demonstration
export const MOCK_USER = {
  id: 'user-123',
  name: 'John Smith',
  email: 'john@example.com',
  isAdmin: true,
};

// API Functions
export async function fetchTables(): Promise<Table[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return JSON.parse(JSON.stringify(mockTables));
}

export async function fetchReservationsForDate(date: string): Promise<Reservation[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return JSON.parse(JSON.stringify(mockReservations.filter((r) => r.date === date)));
}

export async function fetchUserReservations(userId: string): Promise<Reservation[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return JSON.parse(JSON.stringify(mockReservations.filter((r) => r.userId === userId)));
}

export async function fetchAllReservations(): Promise<Reservation[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return JSON.parse(JSON.stringify(mockReservations.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
}

// Data Mutation Functions (used by server actions)
export function addReservation(reservation: Omit<Reservation, 'id'>): Reservation {
  const newId = `res${mockReservations.length + 1 + Math.random()}`;
  const newReservation: Reservation = { ...reservation, id: newId };
  mockReservations.push(newReservation);
  return newReservation;
}

export function deleteReservation(reservationId: string): boolean {
  const index = mockReservations.findIndex((r) => r.id === reservationId);
  if (index > -1) {
    mockReservations.splice(index, 1);
    return true;
  }
  return false;
}

export function findReservationForTable(tableId: string, date: string, time: string): Reservation | undefined {
    return mockReservations.find(r => r.tableId === tableId && r.date === date && r.time === time);
}
