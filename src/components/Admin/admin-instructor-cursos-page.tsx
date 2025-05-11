import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/use-Auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { User } from "~/data/usuarios-base";

export default function AdminInstructorCursosPage() {
    const { users, cursosDisponibles, asignarInstructorACurso } = useAuth();
    const [selectedCurso, setSelectedCurso] = useState("");
    const { toast } = useToast();
  
    const instructores = users.filter(user => user.role === 'instructor');
  
    const getNombreCursos = (instructor: User) => {
      return instructor.cursos?.map(cursoId => {
        const curso = cursosDisponibles.find(c => c.id === cursoId);
        return curso?.nombre || cursoId;
      }) || [];
    };
  
    const handleAsignarCurso = (instructorId: string) => {
      if (!selectedCurso) {
        toast({
          title: "Error",
          description: "Debes seleccionar un curso",
          variant: "destructive",
        });
        return;
      }
  
      asignarInstructorACurso(instructorId, selectedCurso);
      toast({
        title: "Asignación exitosa",
        description: "El instructor ha sido asignado al curso",
      });
      setSelectedCurso("");
    };
  
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Cursos de los instructores</h1>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cursos Asignados</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructores.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell className="font-medium">{instructor.username}</TableCell>
                  <TableCell>{instructor.email}</TableCell>
                  <TableCell>
                    {getNombreCursos(instructor).join(", ") || "Sin cursos asignados"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Asignar Curso</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Asignar curso a {instructor.username}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Select onValueChange={setSelectedCurso} value={selectedCurso}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un curso" />
                            </SelectTrigger>
                            <SelectContent>
                              {cursosDisponibles.map((curso) => (
                                <SelectItem key={curso.id} value={curso.id}>
                                  {curso.nombre} ({curso.docente})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button 
                            onClick={() => handleAsignarCurso(instructor.id)}
                            className="w-full"
                          >
                            Asignar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }