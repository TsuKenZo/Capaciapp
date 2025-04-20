import {Link, useLocation} from "wouter";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "~/components/ui/sidebar";
  import clsx from "clsx";
  import { SidebarItem } from "~/types/itemSidebar";

  interface AppSidebarProps {
    items: SidebarItem[];
  }

export function AppSidebar({ items }: AppSidebarProps) {
  const [location] = useLocation();
  return (
    <Sidebar>
        <SidebarHeader>

        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="space-y-1">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            isActive={location === item.url}
                            asChild
                            className={clsx(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all", 
                            {
                                "text-white/50": location !== item.url,
                            }
                            )}
                        >
                            <Link href={item.url}>
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