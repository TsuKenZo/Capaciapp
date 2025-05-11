import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useState } from "react";
import { useAuth } from "~/context/use-Auth";
import { Button } from "../ui/button";

export default function CalendarioPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { cursosInscritos } = useAuth();

  const pruebas = [
    {
      fecha: new Date(2023, 10, 15),
      cursoId: "1",
      nombre: "Examen de React",
      descripcion: "Examen parcial del módulo 1",
    },
    {
      fecha: new Date(2023, 10, 20),
      cursoId: "2",
      nombre: "Examen de TypeScript",
      descripcion: "Examen final",
    },
  ];

  const getPruebasDelDia = (fecha: Date) => {
    return pruebas.filter(
      (p) =>
        p.fecha.getDate() === fecha.getDate() &&
        p.fecha.getMonth() === fecha.getMonth() &&
        p.fecha.getFullYear() === fecha.getFullYear()
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Calendario</h1>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />

      {date && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              Ver eventos del {date.toLocaleDateString()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Eventos</h4>
              {getPruebasDelDia(date).length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay eventos programados
                </p>
              ) : (
                getPruebasDelDia(date).map((prueba) => {
                  const curso = cursosInscritos.find(c => c.id === prueba.cursoId);
                  return (
                    <div key={prueba.nombre} className="p-2 border rounded">
                      <p className="font-medium">{prueba.nombre}</p>
                      <p className="text-sm">Curso: {curso?.nombre || 'Desconocido'}</p>
                      <p className="text-sm">{prueba.descripcion}</p>
                    </div>
                  );
                })
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}