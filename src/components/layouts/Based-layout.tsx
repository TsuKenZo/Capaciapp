import { AppSidebar } from "~/components/layouts/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { useAuth } from "~/context/use-Auth";
import { useTheme } from "~/context/use-theme";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useLocation } from "wouter";
import { Moon, Sun, User } from "lucide-react";

export default function BasedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, role, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [, navigate] = useLocation();

  const handleRoleChange = (newRole: string) => {
    if (role === 'admin') {
      switchRole(newRole as 'empleado' | 'instructor');
      navigate(newRole === 'empleado' ? '/empleado' : '/instructor');
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
    <div className="flex h-screen w-full">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-background border-b">
          <div className="flex justify-between items-center p-4">
            <SidebarTrigger className="lg:hidden flex" />
            <div className="flex gap-4 items-center">
              {role === 'admin' && (
                <Select 
                  onValueChange={handleRoleChange}
                  value={role}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cambiar panel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Panel Admin</SelectItem>
                    <SelectItem value="instructor">Panel Instructor</SelectItem>
                    <SelectItem value="empleado">Panel Empleado</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${user}&background=random`} />
                      <AvatarFallback>{user?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer" 
                    onClick={toggleTheme}
                  >
                    {theme === 'light' ? (
                      <Moon className="mr-2 h-4 w-4" />
                    ) : (
                      <Sun className="mr-2 h-4 w-4" />
                    )}
                    {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  </SidebarProvider>
  );
}