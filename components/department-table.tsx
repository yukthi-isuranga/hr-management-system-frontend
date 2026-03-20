'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { IconDotsVertical } from '@tabler/icons-react';
import { DeptEditDialog } from './dept-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { EmpDleteAlertDialog } from './empDelete';

export type Department = {
  id: number;
  departmentCode: string;
  departmentName: string;
};

export default function DepartmentTable() {
  const router = useRouter();
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingDep, setEditingDep] = useState<Department | null>(null);
  const [deletingDep, setDeletingDep] = useState<Department | null>(null);
  const [creatingDep, setCreatingDep] = useState(false);

  const fetchDepartment = async () => {
    try {
      const res = await fetch('/api/departments');
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        console.error('API error:', errData);
        throw new Error('Failed to fetch departments');
      }

      const json = await res.json();
      setData(json ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDepartment();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="rounded-2xl border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Departments</h2>
        {/* <Button onClick={() => setCreatingDep(true)}>Add New Department</Button> */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>{dept.id}</TableCell>
              <TableCell>{dept.departmentCode || '-'}</TableCell>
              <TableCell>{dept.departmentName || '-'}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                      size="icon"
                    >
                      <IconDotsVertical />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => setEditingDep(dept)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCreatingDep(true)}>
                      Add New Department
                    </DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setDeletingDep(dept)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingDep && (
        <DeptEditDialog
          department={editingDep}
          open={!!editingDep}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingDep(null);
          }}
          onUpdate={async (updatedData) => {
            try {
              // Call the PUT API
              const res = await fetch(`/api/departments/${updatedData.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
              });

              if (!res.ok) {
                const errData = await res.json().catch(() => null);
                console.error('Failed to update Department:', errData);
                throw new Error('Failed to update Department');
              }

              await res.json().catch(() => null); // Safely consume response regardless of 200/204

              // Instantly refetch all SQL data into the component state
              await fetchDepartment();

              setEditingDep(null); // close dialog
            } catch (err) {
              console.error(err);
              toast.error(
                'Failed to update Department. Check console for details.',
              );
            } finally {
              router.refresh();
            }
          }}
        />
      )}

      {deletingDep && (
        <EmpDleteAlertDialog
          empId={deletingDep.id.toString()}
          open={!!deletingDep}
          onOpenChange={(isOpen) => {
            if (!isOpen) setDeletingDep(null);
          }}
          onDelete={async () => {
            try {
              // Call the PUT API
              const res = await fetch(`/api/departments/${deletingDep.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                //   body: JSON.stringify(updatedData),
              });

              if (!res.ok) {
                const errData = await res.json().catch(() => null);
                console.error('Failed to update employee:', errData);
                throw new Error('Failed to update employee');
              }

              await res.json().catch(() => null); // Safely consume response regardless of 200/204
            } catch (err) {
              console.error(err);
              toast.error(
                'Failed to update employee. Check console for details.',
              );
            } finally {
              await fetchDepartment();
              router.refresh();
            }
          }}
        />
      )}

      {/* Creation Dialog Reusing the Exact Same DeptEditDialog */}
      <DeptEditDialog
        open={creatingDep}
        onOpenChange={setCreatingDep}
        onUpdate={async (newData) => {
          try {
            const res = await fetch(`/api/departments`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newData),
            });

            if (!res.ok) {
              const errData = await res.json().catch(() => null);
              console.error('Failed to create Department:', errData);
              throw new Error('Failed to create Department');
            }

            await fetchDepartment(); // Instantly visually refresh the row list!
            setCreatingDep(false);
            toast.success('Department created successfully!');
          } catch (err) {
            console.error(err);
            toast.error('Failed to create Department. Check console.');
          } finally {
            router.refresh();
          }
        }}
      />
    </div>
  );
}
