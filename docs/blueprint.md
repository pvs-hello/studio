# **App Name**: ReserveTable

## Core Features:

- User Authentication: Secure user authentication using Firebase Authentication with Google Sign-In or email/password.
- Table Availability: Display available tables/seats in the restaurant with real-time updates.
- Reservation Booking: Allow users to select a date, time, and table number, and then store their reservation details (name, contact info, date, time, table number, userId) in Firestore.
- Existing Reservations View: Enable users to view their existing reservations.
- Admin Page: Simple admin interface to view and manage all reservations.
- Double Booking Prevention: Utilize Firebase Cloud Functions to prevent double booking of tables for the same date/time.

## Style Guidelines:

- Primary color: Soft teal (#64C5EB) for a calming and inviting atmosphere.
- Background color: Light off-white (#F5F5F5), a desaturated tint of the primary color.
- Accent color: Muted orange (#D98E5B) for call-to-action buttons and highlights to contrast against the primary teal.
- Body and headline font: 'PT Sans', a humanist sans-serif with a modern yet friendly feel, for all text elements.
- Use simple, clean icons to represent table availability, dates, and times.
- A clean, intuitive layout with clear sections for table selection, booking details, and reservation viewing.
- Subtle animations for table availability updates and reservation confirmations.