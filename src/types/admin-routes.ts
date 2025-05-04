import { 
    HomeIcon, 
    Users, 
    BookOpen,
    Settings
  } from "lucide-react";
  

  export const itemsAdmin = [
    {
      title: "Inicio",
      url: "/admin",
      icon: HomeIcon
    },
    {
      title: "Gestionar Usuarios",
      url: "/admin/gestionar_usuarios",
      icon: Users
    },
    {
      title: "Gestionar Cursos",
      url: "/admin/gestionar_cursos",
      icon: BookOpen
    },
    {
      title: "Configuración",
      url: "/admin/configuracion",
      icon: Settings
    }
];