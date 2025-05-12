import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "~/components/ui/popover";

export default function EmpleadoPage() {
  const noticias = [
    {
      id: 1,
      titulo: "Nuevo programa de capacitación",
      resumen: "La empresa lanza un nuevo programa de formación para empleados",
      contenido: "El próximo mes iniciaremos un programa de capacitación en habilidades blandas para todos los empleados. Incluirá talleres sobre comunicación efectiva, trabajo en equipo y gestión del tiempo. Las sesiones serán los viernes por la tarde.",
      imagen: "/img/capacitacion.jpg"
    },
    {
      id: 2,
      titulo: "Actualización de políticas",
      resumen: "Revisión de las políticas de trabajo remoto",
      contenido: "A partir del próximo trimestre, implementaremos nuevas políticas de trabajo híbrido. Cada empleado podrá trabajar 2 días desde casa luego de 6 meses en la empresa. Consulte con su supervisor para más detalles.",
      imagen: "/img/politicas.jpg"
    },
    {
      id: 3,
      titulo: "Evento de integración",
      resumen: "Próximo evento de team building para todos los empleados",
      contenido: "El 15 de noviembre realizaremos nuestro evento anual de integración. Habrá actividades al aire libre, juegos y premios. El evento será en el Parque Central de 10am a 4pm. ¡No falten!",
      imagen: "/img/evento.jpg"
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard del Empleado</h1>
      
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