'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

// Employee schema
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

// Zod schema for editable fields
const employeeEditSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  salary: z.number().min(0, 'Salary must be positive'),
  departments: z.array(z.string()).min(1, 'Select at least one department'),
});

interface EmpEditDialogProps {
  employee?: Employees;
  onUpdate: (data: Partial<Employees>) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EmpEditDialog({ employee, onUpdate, open, onOpenChange }: EmpEditDialogProps) {
  const isEditing = !!employee;

  const form = useForm<z.infer<typeof employeeEditSchema>>({
    resolver: zodResolver(employeeEditSchema),
    defaultValues: {
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      dateOfBirth: employee?.dateOfBirth ? employee.dateOfBirth.toString().split('T')[0] : '', // format YYYY-MM-DD
      salary: employee?.salary || 0,
      departments: employee?.departments || [],
    },
  });

  const handleSubmit = (data: z.infer<typeof employeeEditSchema>) => {
    onUpdate({
      ...data,
      id: employee?.id,
      age: employee?.age,
      dateOfBirth: new Date(data.dateOfBirth),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {open === undefined && (
        <AlertDialogTrigger asChild>
          <Button variant="outline">{isEditing ? 'Edit' : 'Create'} Employee</Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{isEditing ? 'Edit' : 'Create'} Employee</AlertDialogTitle>
          <AlertDialogDescription>
            {isEditing ? 'Update' : 'Enter'} the employee information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* First Name */}
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                <Input {...field} id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                <Input {...field} id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input {...field} id={field.name} type="email" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Date of Birth */}
          <Controller
            name="dateOfBirth"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>
                <Input {...field} id={field.name} type="date" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Salary */}
          <Controller
            name="salary"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Salary</FieldLabel>
                <Input 
                   {...field} 
                   id={field.name} 
                   type="number" 
                   onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Departments */}
          <Controller
            name="departments"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Departments (comma separated)
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  value={field.value.join(', ')}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(',').map((d) => d.trim()),
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <AlertDialogFooter className="space-x-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Save</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
