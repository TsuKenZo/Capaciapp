import { AppSidebar } from "~/components/layouts/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { useAuth } from "~/context/use-Auth";
import { useTheme } from "~/context/use-theme";

export default function BasedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex justify-between items-center">
          <SidebarTrigger className="lg:hidden flex" />
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-lg bg-red-500 text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}