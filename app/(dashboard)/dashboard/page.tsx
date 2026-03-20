import DepartmentTable from '@/components/department-table';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Departments</h1>
      <DepartmentTable />
    </div>
  );
}
