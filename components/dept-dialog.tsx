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
import { Department } from './department-table';

// Zod schema for editable fields
const departmentEditSchema = z.object({
  departmentCode: z
    .string()
    .min(3, 'DepartmentCode Must more than 3 charators'),
  departmentName: z.string().min(3, 'Department Name is required'),
});

interface DeptEditDialogProps {
  department: Department;
  onUpdate: (data: Partial<Department>) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeptEditDialog({
  department,
  onUpdate,
  open,
  onOpenChange,
}: DeptEditDialogProps) {
  const form = useForm<z.infer<typeof departmentEditSchema>>({
    resolver: zodResolver(departmentEditSchema),
    defaultValues: {
      departmentName: department.departmentName,
      departmentCode: department.departmentCode,
    },
  });

  const handleSubmit = (data: z.infer<typeof departmentEditSchema>) => {
    onUpdate({
      ...data,
      id: department.id,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {open === undefined && (
        <AlertDialogTrigger asChild>
          <Button variant="outline">Edit department</Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit department</AlertDialogTitle>
          <AlertDialogDescription>
            Update the department information below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* First Name */}
          <Controller
            name="departmentName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Department Name</FieldLabel>
                <Input {...field} id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Last Name */}
          <Controller
            name="departmentCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Department Code</FieldLabel>
                <Input {...field} id={field.name} />
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
