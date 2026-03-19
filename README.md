This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


/hrms-frontend
│
├── app/
│   ├── layout.tsx                  # Root layout with Header + Sidebar
│   ├── page.tsx                    # Dashboard home page
│   ├── globals.css                 # Global styles
│   │
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── employees/
│   │   │   ├── page.tsx            # Employee list (table with ShadCN UI)
│   │   │   ├── new/page.tsx        # Add employee form (React Hook Form + Zod)
│   │   │   └── [id]/page.tsx       # Employee profile/edit form
│   │   │
│   │   ├── departments/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   │
│   │   ├── attendance/
│   │   │   ├── page.tsx            # Attendance table + filters
│   │   │   └── [id]/page.tsx       # Employee attendance detail
│   │   │
│   │   ├── leaves/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   │
│   │   └── reports/
│   │       ├── page.tsx
│   │       └── export/page.tsx
│   │
│   └── components/
│       ├── ui/                     # Reusable ShadCN UI components
│       │   ├── button.tsx
│       │   ├── card.tsx
│       │   ├── modal.tsx
│       │   └── table.tsx
│       │
│       ├── layout/                 # App layout components
│       │   ├── header.tsx
│       │   └── sidebar.tsx
│       │
│       └── forms/                  # Reusable forms
│           ├── EmployeeForm.tsx
│           ├── DepartmentForm.tsx
│           └── LeaveForm.tsx
│
├── store/                           # Zustand for state management
│   ├── useAuthStore.ts
│   ├── useEmployeeStore.ts
│   └── useDepartmentStore.ts
│
├── hooks/                           # Custom hooks
│   ├── useEmployees.ts
│   ├── useDepartments.ts
│   └── useLeaves.ts
│
├── context/                         # Global contexts
│   └── AuthContext.tsx
│
├── lib/                             # API calls & utils
│   ├── api.ts                        # Axios / fetch wrappers
│   ├── validators.ts                 # Zod schemas for forms
│   └── helpers.ts
│
├── types/                            # TypeScript interfaces
│   ├── employee.ts
│   ├── department.ts
│   ├── attendance.ts
│   └── leave.ts
│
├── public/
│   └── logo.png
│
├── styles/
│   ├── globals.css
│   └── tailwind.css
│
├── .env
├── next.config.js
├── tailwind.config.js
└── package.json