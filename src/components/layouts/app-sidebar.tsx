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
  import { Link, useLocation } from "wouter";
  import clsx from "clsx";
  import { useAuth } from "~/context/use-Auth";
  import { getSectionsByRole } from "~/data/sections";

  
  export function AppSidebar() {
    const [location] = useLocation();
    const { role } = useAuth();
    const items = getSectionsByRole(role);
  
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="p-4 text-xl font-semibold dark:text-white">
            {role === 'admin' ? 'Panel Admin' : role === 'instructor' ? 'Panel Instructor' : 'Panel Empleado'}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={location.startsWith(item.url)}
                      asChild
                      className={clsx(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                        {
                          "bg-gray-200 dark:bg-gray-700": location.startsWith(item.url),
                          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": 
                            !location.startsWith(item.url),
                        }
                      )}
                    >
                      <Link href={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  