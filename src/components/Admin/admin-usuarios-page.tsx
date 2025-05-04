import { useAuth } from "~/context/use-Auth";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { Toaster } from "../ui/toaster";
import { useToast } from "~/hooks/use-toast";

export default function AdminUsuariosPage() {
  const { users, addNewUser } = useAuth();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "empleado" as const,
    password: "",
  });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "La contraseña es obligatoria",
      });
      return;
    }

    try {
      addNewUser({
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password,
      });
      
      setNewUser({
        username: "",
        email: "",
        role: "empleado",
        password: "",
      });
      setOpen(false);
      
      toast({
        title: "Usuario creado",
        description: `El usuario ${newUser.username} ha sido registrado exitosamente`,
      });
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al crear el usuario",
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de usuarios</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo usuario</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Tipo de usuario</Label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="empleado">Empleado</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Crear Usuario
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Tipo de Usuario</TableHead>
              <TableHead>Correo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.username}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>
                  <span className="capitalize">{user.role}</span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}