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

type Department = {
  id: number;
  departmentCode: string;
  departmentName: string;
};

export default function DepartmentTable() {
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="rounded-2xl border p-4">
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
