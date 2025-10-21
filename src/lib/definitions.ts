export type Table = {
  id: string;
  number: number;
  seats: number;
  position: { x: number; y: number }; // For visual layout
  shape: 'square' | 'rectangle' | 'round';
};

export type Reservation = {
  id: string;
  userId: string;
  userName: string;
  tableId: string;
  tableNumber: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  partySize: number;
};
