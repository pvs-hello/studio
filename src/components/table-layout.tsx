'use client';

import { useState } from 'react';
import type { Table } from '@/lib/definitions';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import BookingDialog from './booking-dialog';
import { Skeleton } from './ui/skeleton';

interface TableLayoutProps {
  tables: Table[];
  availableTables: Table[];
  selectedDate: string;
  selectedTime: string;
  partySize: number;
  isLoading: boolean;
}

export default function TableLayout({ tables, availableTables, selectedDate, selectedTime, partySize, isLoading }: TableLayoutProps) {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTableClick = (table: Table) => {
    if (availableTables.some(at => at.id === table.id)) {
      setSelectedTable(table);
      setIsDialogOpen(true);
    }
  };

  const renderTable = (table: Table) => {
    const isAvailable = availableTables.some(at => at.id === table.id);
    const tableClasses = cn(
      "transition-colors duration-300 ease-in-out flex flex-col items-center justify-center text-center p-2 shadow-md",
      "w-20 h-20", // Base size
      {
        "bg-primary/20 text-primary-foreground border-primary/50": !isAvailable,
        "bg-card hover:bg-primary/80 hover:text-primary-foreground cursor-pointer border-2 border-dashed border-primary": isAvailable,
        "w-32 h-20": table.shape === 'rectangle',
        "rounded-md": table.shape === 'square' || table.shape === 'rectangle',
        "rounded-full": table.shape === 'round',
      }
    );

    return (
      <button
        key={table.id}
        onClick={() => handleTableClick(table)}
        disabled={!isAvailable}
        className={tableClasses}
        style={{ gridColumn: table.position.x, gridRow: table.position.y }}
        aria-label={`Table ${table.number}, ${table.seats} seats. ${isAvailable ? 'Available' : 'Booked'}`}
      >
        <div className="font-bold text-lg">{table.number}</div>
        <div className="text-xs">{table.seats} seats</div>
      </button>
    );
  };
  
  if (isLoading) {
      return (
        <Card className="w-full">
            <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
                 <div className="grid grid-cols-6 grid-rows-6 gap-6 p-4">
                    {tables.map(table => (
                        <Skeleton 
                            key={table.id}
                            style={{ gridColumn: table.position.x, gridRow: table.position.y }}
                            className={cn("w-20 h-20", {
                                "w-32 h-20": table.shape === 'rectangle',
                                "rounded-md": table.shape === 'square' || table.shape === 'rectangle',
                                "rounded-full": table.shape === 'round',
                            })}
                        />
                    ))}
                 </div>
            </CardContent>
        </Card>
      )
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline">Select a Table</CardTitle>
          <CardDescription>Click on an available blue table to make a reservation.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="grid grid-cols-6 grid-rows-6 gap-6 p-4 relative">
            {tables.map(renderTable)}
          </div>
        </CardContent>
      </Card>
      
      {selectedTable && (
        <BookingDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          table={selectedTable}
          date={selectedDate}
          time={selectedTime}
          partySize={partySize}
        />
      )}
    </>
  );
}
