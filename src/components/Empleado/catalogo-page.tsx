import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "../ui/button";
import { useAuth } from "~/context/use-Auth";
import { useToast } from "~/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { Curso } from "~/data/cursos-disponibles";


export default function CatalogoPage() {
  const { user, cursosDisponibles, addCursoInscrito } = useAuth();
  const { toast } = useToast();


  const handleInscribirse = (curso: Curso) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para inscribirte",
        variant: "destructive",
      });
      return;
    }

    addCursoInscrito({
      nombre: curso.nombre,
      docente: curso.docente,
    });

    toast({
      title: "Inscripción exitosa",
      description: `Te has inscrito en ${curso.nombre}`,
    });
  };

  return (
    <div className="p-4 space-y-6">
      <Toaster />
      <h1 className="text-2xl font-bold">Catálogo de cursos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursosDisponibles.map((curso) => (
          <Card key={curso.id}>
            <CardHeader>
              <CardTitle>{curso.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Duración: {curso.duracion}</p>
              <p className="text-sm">Docente: {curso.docente}</p>
              <Button
                className="w-full mt-4"
                onClick={() => handleInscribirse(curso)}
              >
                Inscribirse
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}