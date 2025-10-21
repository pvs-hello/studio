'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOut } from 'lucide-react';
import { mockLogout } from '@/lib/actions';
import { MOCK_USER } from '@/lib/data';

export default function UserButton({ isAuthenticated }: { isAuthenticated: boolean }) {

  const handleLogout = async () => {
    await mockLogout();
    // In a real app, you might want to redirect or show a toast
    window.location.href = '/';
  }

  if (!isAuthenticated) {
    return (
      <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${MOCK_USER.email}.png`} alt={MOCK_USER.name} />
            <AvatarFallback>{MOCK_USER.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{MOCK_USER.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{MOCK_USER.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
