'use client';

import { AppSidebar } from '@/components/ui/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/ui/site-header';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function CareTakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
