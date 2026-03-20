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
import { EmpEditDialog } from './emp-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { EmpDleteAlertDialog } from './empDelete';

export interface Employees {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  salary: number;
  age: number;
  departments: string[];
}

export default function EmployeesTable() {
  const [data, setData] = useState<Employees[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEmp, setEditingEmp] = useState<Employees | null>(null);
  const [deletingEmp, setDeletingEmp] = useState<Employees | null>(null);
  const router = useRouter();

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/employees');
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        console.error('API error:', errData);
        throw new Error('Failed to fetch employees');
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
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="rounded-2xl border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date Of Birth</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Departments</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.firstName || '-'}</TableCell>
              <TableCell>{emp.lastName || '-'}</TableCell>
              <TableCell>{emp.email || '-'}</TableCell>
              <TableCell>{emp.dateOfBirth.toString() || '-'}</TableCell>
              <TableCell>{emp.age || '-'}</TableCell>
              <TableCell>{emp.salary || '-'}</TableCell>
              <TableCell>{emp.departments || '-'}</TableCell>
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
                    <DropdownMenuItem onClick={() => setEditingEmp(emp)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setDeletingEmp(emp)}
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
      {/* {editingEmp && (
        <EmpEditDialog
          employee={editingEmp}
          open={!!editingEmp}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingEmp(null);
          }}
          onUpdate={(updatedData) => {
            setEditingEmp(null);
            setData((prev) =>
              prev.map((e) =>
                e.id === updatedData.id
                  ? ({ ...e, ...updatedData } as Employees)
                  : e,
              ),
            );
          }}
        />
      )} */}
      {editingEmp && (
        <EmpEditDialog
          employee={editingEmp}
          open={!!editingEmp}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditingEmp(null);
          }}
          onUpdate={async (updatedData) => {
            try {
              // Call the PUT API
              const res = await fetch(`/api/employees/${updatedData.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
              });

              if (!res.ok) {
                const errData = await res.json().catch(() => null);
                console.error('Failed to update employee:', errData);
                throw new Error('Failed to update employee');
              }

              await res.json().catch(() => null); // Safely consume response regardless of 200/204

              // Instantly refetch all SQL data into the component state
              await fetchEmployees();

              setEditingEmp(null); // close dialog
            } catch (err) {
              console.error(err);
              toast.error(
                'Failed to update employee. Check console for details.',
              );
            } finally {
              router.refresh();
            }
          }}
        />
      )}
      {deletingEmp && (
        <EmpDleteAlertDialog
          empId={deletingEmp.id.toString()}
          open={!!deletingEmp}
          onOpenChange={(isOpen) => {
            if (!isOpen) setDeletingEmp(null);
          }}
          onDelete={async () => {
            try {
              // Call the PUT API
              const res = await fetch(`/api/employees/${deletingEmp.id}`, {
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
              await fetchEmployees();
              router.refresh();
            }
          }}
        />
      )}
    </div>
  );
}
