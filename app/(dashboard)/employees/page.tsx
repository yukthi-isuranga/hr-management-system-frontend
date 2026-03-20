import EmployeesTable from '@/components/employees-table';

export default function HRDashboard() {
  return (
    <div className="p-6 ">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="text-xl font-semibold mb-4">Employees</h1>
          <EmployeesTable />
        </div>
      </div>
    </div>
  );
}
