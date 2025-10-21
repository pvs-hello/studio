import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { Button } from './ui/button';
import { cookies } from 'next/headers';
import UserButton from './user-button';

export default function Header() {
  const isAuthenticated = cookies().has('mock-auth-token');

  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <UtensilsCrossed className="w-6 h-6" />
            <span className="font-headline">ReserveTable</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Book a Table</Link>
            </Button>
            {isAuthenticated && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/my-reservations">My Reservations</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/admin">Admin</Link>
                </Button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <UserButton isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </header>
  );
}
