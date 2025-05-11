import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Checkbox } from "~/components/ui/checkbox";
import { useAuth } from "~/context/use-Auth";

export default function AsistenciaPage() {
    const { user, cursosInscritos, empleados } = useAuth();
  
    if (!user || user.role !== 'instructor') {
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold">Acceso restringido</h1>
          <p>Solo los instructores pueden ver esta página</p>
        </div>
      );
    }
  
    const cursosDelInstructor = cursosInscritos.filter(curso => 
      curso.docente === user.username
    );
  
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Asistencias de los cursos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cursosDelInstructor.length === 0 ? (
            <p>No tienes cursos asignados</p>
          ) : (
            cursosDelInstructor.map((curso) => (
              <Card key={curso.id}>
                <CardHeader>
                  <CardTitle>{curso.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Registrar Asistencia
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[600px]">
                      <h3 className="font-semibold mb-4">Lista de estudiantes - {curso.nombre}</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Asistencia</TableHead>
                            <TableHead>Acción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {empleados
                            .filter(emp => emp.cursosInscritos?.includes(curso.id))
                            .map((empleado) => (
                              <TableRow key={empleado.id}>
                                <TableCell>{empleado.username}</TableCell>
                                <TableCell>{empleado.email}</TableCell>
                                <TableCell>75%</TableCell>
                                <TableCell>
                                  <Checkbox 
                                    id={`asistencia-${empleado.id}`} 
                                    className="ml-4"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }