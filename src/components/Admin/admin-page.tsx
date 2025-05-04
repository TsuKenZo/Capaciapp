
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useAuth } from "~/context/use-Auth";
import { Settings, BookOpen } from "lucide-react";
import { Button } from "../ui/button";

export default function AdminPage() {
  const { user } = useAuth();

  return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {user}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Panel de Administración
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Gestionar Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <a href="/admin/gestionar_usuarios">Administrar</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Gestionar Cursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <a href="/admin/gestionar_cursos">Administrar</a>
            </Button>
          </CardContent>
        </Card>
      </div>
  );
}