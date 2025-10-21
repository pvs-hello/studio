import { fetchAllReservations } from "@/lib/data";
import { columns } from "@/components/admin/columns";
import { DataTable } from "@/components/admin/data-table";

export default async function AdminPage() {
  const data = await fetchAllReservations();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-headline mb-6">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">View and manage all reservations across the system.</p>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
