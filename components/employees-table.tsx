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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/employees');
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

    fetchData();
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
          {data.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>{dept.id}</TableCell>
              <TableCell>{dept.firstName || '-'}</TableCell>
              <TableCell>{dept.lastName || '-'}</TableCell>
              <TableCell>{dept.email || '-'}</TableCell>
              <TableCell>{dept.dateOfBirth.toString() || '-'}</TableCell>
              <TableCell>{dept.age || '-'}</TableCell>
              <TableCell>{dept.salary || '-'}</TableCell>
              <TableCell>{dept.departments || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
