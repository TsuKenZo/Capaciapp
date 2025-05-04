
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminCursosPage() {
  return (

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Catálogo de Cursos</CardTitle>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Curso
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Aquí iría la lista de cursos con opciones para editar/eliminar */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Curso de React</h3>
              <p className="text-sm text-gray-500">Duración: 4 semanas</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Curso de TypeScript</h3>
              <p className="text-sm text-gray-500">Duración: 3 semanas</p>
            </div>
          </div>
        </CardContent>
      </Card>

  );
}