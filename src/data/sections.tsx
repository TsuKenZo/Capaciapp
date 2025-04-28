import { Home, Book, BookOpen, Calendar, Notebook, Settings } from "lucide-react";
import EmpleadoPage from "~/components/Empleado/empleado-page";
import InstructorPage from "~/components/Instructor/instructor-page";
import AdminPage from "~/components/Admin/admin-page";
import AdminCursosPage from "~/components/Admin/admin-cursos-page";
import NotasPage from "~/components/Empleado/notas-page";
import MisCursosPage from "~/components/Empleado/mis-cursos-page";
import CalendarioPage from "~/components/Empleado/Calendario-page";
import CatalogoPage from "~/components/Empleado/catalogo-page";
import MisCursosPageI from "~/components/Instructor/mis-cursos-page";
import CalendarioPageI from "~/components/Instructor/Calendario-page";
import { JSX } from "react";

export interface Section {
  name: string;
  href: string;
  icon: JSX.Element;
  component: React.ComponentType;
  roles: ('empleado' | 'instructor' | 'admin')[];
}

export const sections: Section[] = [
  // Secciones de empleado
  {
    name: "Inicio",
    href: "/empleado",
    icon: <Home className="size-4"/>,
    component: EmpleadoPage,
    roles: ['empleado', 'admin']
  },
  {
    name: "Mis Cursos",
    href: "/mis_cursos",
    icon: <Book className="size-4"/>,
    component: MisCursosPage,
    roles: ['empleado', 'admin']
  },
  {
    name: "Notas Cursos",
    href: "/notas_cursos",
    icon: <Notebook className="size-4"/>,
    component: NotasPage,
    roles: ['empleado', 'admin']
  },
  {
    name: "Catálogo de Cursos",
    href: "/catalogo_de_cursos",
    icon: <BookOpen className="size-4"/>,
    component: CatalogoPage,
    roles: ['empleado', 'admin']
  },
  {
    name: "Calendario",
    href: "/calendario",
    icon: <Calendar className="size-4"/>,
    component: CalendarioPage,
    roles: ['empleado', 'admin']
  },

  // Secciones de instructor
  {
    name: "Inicio",
    href: "/instructor",
    icon: <Home className="size-4"/>,
    component: InstructorPage,
    roles: ['instructor', 'admin']
  },
  {
    name: "Mis Cursos",
    href: "/mis_cursos",
    icon: <Book className="size-4"/>,
    component: MisCursosPageI,
    roles: ['instructor', 'admin']
  },
  {
    name: "Calendario",
    href: "/calendario",
    icon: <Calendar className="size-4"/>,
    component: CalendarioPageI,
    roles: ['instructor', 'admin']
  },

  // Secciones de admin
  {
    name: "Administración",
    href: "/admin",
    icon: <Settings className="size-4"/>,
    component: AdminPage,
    roles: ['admin']
  },
  {
    name: "Gestionar Cursos",
    href: "/admin/cursos",
    icon: <BookOpen className="size-4"/>,
    component: AdminCursosPage,
    roles: ['admin']
  }
];

export const getSectionsByRole = (role: 'empleado' | 'instructor' | 'admin' | null) => {
  if (!role) return [];
  return sections.filter(section => section.roles.includes(role))
    .map(section => ({
      title: section.name,
      url: section.href,
      icon: section.icon
    }));
};