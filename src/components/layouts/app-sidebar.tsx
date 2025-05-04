import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "~/components/ui/sidebar";
  import { Link, useLocation } from "react-router-dom";
  import clsx from "clsx";
  import { useAuth } from "~/context/use-Auth";
  import { itemsEmpleados } from "~/types/sidebar-empleador";
import { itemsInstructor } from "~/types/sidebar-instructor";
import { itemsAdmin } from "~/types/admin-routes";

export function AppSidebar() {
  const location = useLocation();
  const { role } = useAuth();

  const items = role === 'admin' ? itemsAdmin : 
               role === 'instructor' ? itemsInstructor : 
               itemsEmpleados;

  // Función para determinar si la ruta está activa
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="h-full border-r">
      <SidebarHeader className="border-b">
        <div className="p-4 text-xl font-semibold dark:text-white">
          {role === 'admin' ? 'Panel Admin' : 
           role === 'instructor' ? 'Panel Instructor' : 'Panel Empleado'}
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link to={item.url} className="w-full">
                    <SidebarMenuButton
                      isActive={isActive(item.url)}
                      className={clsx(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all w-full",
                        {
                          "bg-gray-200 dark:bg-gray-700": isActive(item.url),
                          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": 
                            !isActive(item.url),
                        }
                      )}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
  