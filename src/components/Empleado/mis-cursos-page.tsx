import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "~/context/use-Auth";

export default function MisCursosPage() {
  const { user, cursosInscritos } = useAuth();

  if (!user) {
    return <div className="p-4">Debes iniciar sesión para ver tus cursos</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Mis cursos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursosInscritos.length === 0 ? (
          <p>No estás inscrito en ningún curso</p>
        ) : (
          cursosInscritos.map((curso) => (
            <Card key={curso.id}>
              <CardHeader>
                <CardTitle>{curso.nombre}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Docente: {curso.docente}</p>
                <Button variant="outline" className="w-full mt-4">
                  Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}