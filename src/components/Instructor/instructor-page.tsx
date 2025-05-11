import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover";

export default function InstructorPage() {
  const noticias = [
    {
      id: 1,
      titulo: "Nuevos materiales didácticos",
      resumen: "Disponibles nuevos recursos para instructores",
      contenido: "Hemos actualizado nuestra biblioteca de materiales didácticos con nuevos casos de estudio y ejercicios prácticos. Pueden acceder a ellos desde la plataforma de recursos internos.",
      imagen: "/img/materiales.jpg"
    },
    {
      id: 2,
      titulo: "Capacitación de instructores",
      resumen: "Próximo taller de actualización metodológica",
      contenido: "El próximo mes realizaremos un taller obligatorio sobre nuevas metodologías de enseñanza. Será el día 20 de 9am a 1pm en el aula magna. Favor confirmar asistencia.",
      imagen: "/img/capacitacion-instructores.jpg"
    },
    {
      id: 3,
      titulo: "Evaluación de cursos",
      resumen: "Nuevo sistema de evaluación de participantes",
      contenido: "Hemos implementado un nuevo sistema de evaluación continua. Ahora recibirán feedback semanal de sus participantes. Consulte el manual en su correo para más detalles.",
      imagen: "/img/evaluacion.jpg"
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard del Instructor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {noticias.map((noticia) => (
          <Card key={noticia.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{noticia.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{noticia.resumen}</p>
            </CardContent>
            <CardFooter>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Más información</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 sm:w-96">
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">{noticia.titulo}</h3>
                    {noticia.imagen && (
                      <img 
                        src={noticia.imagen} 
                        alt={noticia.titulo}
                        className="rounded-md w-full h-auto max-h-48 object-cover"
                      />
                    )}
                    <p className="text-sm">{noticia.contenido}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}