import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";


export default function AdminCursosPage() {
  const [showForm, setShowForm] = useState(false);
  const [cursos, setCursos] = useState([
    { nombre: "Curso de React", duracion: "4 semanas", docente: "Juan Pérez" },
    { nombre: "Curso de TypeScript", duracion: "3 semanas", docente: "Ana Gómez" }
  ]);
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: "",
    duracion: "",
    docente: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoCurso(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCursos([...cursos, nuevoCurso]);
    setNuevoCurso({ nombre: "", duracion: "", docente: "" });
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="">Catálogo de Cursos</CardTitle>
        <Button onClick={() => setShowForm(!showForm)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Curso
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre del Curso</Label>
              <Input
                id="nombre"
                name="nombre"
                value={nuevoCurso.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="duracion">Duración (horas)</Label>
              <Input
                id="duracion"
                name="duracion"
                value={nuevoCurso.duracion}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="docente">Nombre del Docente</Label>
              <Input
                id="docente"
                name="docente"
                value={nuevoCurso.docente}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Crear Curso</Button>
          </form>
        )}

        <div className="space-y-4">
          {cursos.map((curso, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-medium">{curso.nombre}</h3>
              <p className="text-sm text-gray-500">Duración: {curso.duracion}</p>
              <p className="text-sm text-gray-500">Docente: {curso.docente}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}