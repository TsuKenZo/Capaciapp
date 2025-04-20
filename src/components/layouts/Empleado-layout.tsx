import { AppSidebar } from "~/components/layouts/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { itemsEmpleados } from "~/data/sidebar-empleados";


export default function EmpleadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen"> 
    <SidebarProvider>
    <AppSidebar items={itemsEmpleados}/>
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <SidebarTrigger className="lg:hidden flex"/>
      {children}
    </main>
  </SidebarProvider>
  </div>
  );
}