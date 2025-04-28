import BasedLayout from "../layouts/Based-layout";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { useAuth } from "~/context/use-Auth";

export default function AdminPage() {
  const { user, role } = useAuth();

  return (
    <BasedLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {user}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Rol actual: {role === 'admin' ? 'Administrador' : role}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a 
                href="/admin/cursos" 
                className="block p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                Gestionar cursos
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </BasedLayout>
  );
}