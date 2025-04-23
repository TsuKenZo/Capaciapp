import { AppSidebar } from "~/components/layouts/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { itemsEmpleados } from "~/types/sidebar-empleador";

export default function BasedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar items={itemsEmpleados}/>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6" >
        <SidebarTrigger className="lg:hidden flex"/>
        {children}
      </main>
    </SidebarProvider>
  );
}