"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Reservation } from "@/lib/definitions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { cancelReservation } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import { format, parseISO } from "date-fns"


const CancelAction = ({ id }: { id: string }) => {
    const { toast } = useToast();
    const handleCancel = async () => {
        const result = await cancelReservation(id);
        if (result.error) {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        } else {
            toast({ title: "Success", description: "Reservation cancelled." });
        }
    }
    return <DropdownMenuItem onSelect={handleCancel} className="text-destructive">Cancel Reservation</DropdownMenuItem>
}

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "userName",
    header: "Guest",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(parseISO(row.original.date), "PPP"),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => format(parseISO(`1970-01-01T${row.original.time}`), 'p'),
  },
  {
    accessorKey: "tableNumber",
    header: "Table",
  },
  {
    accessorKey: "partySize",
    header: "Party Size",
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const reservation = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(reservation.id)}
            >
              Copy reservation ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <CancelAction id={reservation.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
