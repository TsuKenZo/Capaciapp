import { useAuth } from "~/context/use-Auth";
import LoginPage from '../login/login-page';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminPage from '../Admin/admin-page';
import AdminCursosPage from '../Admin/admin-cursos-page';
import EmpleadoPage from '../Empleado/empleado-page';
import NotasPage from '../Empleado/notas-page';
import MisCursosPage from '../Empleado/mis-cursos-page';
import CalendarioPage from '../Empleado/Calendario-page';
import CatalogoPage from '../Empleado/catalogo-page';
import InstructorPage from '../Instructor/instructor-page';
import MisCursosPageI from '../Instructor/mis-cursos-page';
import CalendarioPageI from '../Instructor/Calendario-page';
import BasedLayout from "../layouts/Based-layout";
import { JSX } from "react";

export function MainRouter() {
  const { user, role } = useAuth();

  // Layout principal que incluye el sidebar
  const LayoutWrapper = () => (
    <BasedLayout>
      <Outlet />
    </BasedLayout>
  );

  // Protección de rutas por rol
  const ProtectedRoute = ({ children, roles }: { children: JSX.Element, roles: string[] }) => {
    if (!user) return <Navigate to="/login" />;
    if (!roles.includes(role)) return <Navigate to="/" />;
    return children;
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        {/* Rutas de Admin */}
        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/gestionar_usuarios" element={
          <ProtectedRoute roles={['admin']}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/gestionar_cursos" element={
          <ProtectedRoute roles={['admin']}>
            <AdminCursosPage />
          </ProtectedRoute>
        } />

        {/* Rutas de Empleado */}
        <Route path="/empleado" element={
          <ProtectedRoute roles={['empleado', 'admin']}>
            <EmpleadoPage />
          </ProtectedRoute>
        } />
        <Route path="/empleado/notas_cursos" element={
          <ProtectedRoute roles={['empleado', 'admin']}>
            <NotasPage />
          </ProtectedRoute>
        } />
        <Route path="/empleado/mis_cursos" element={
          <ProtectedRoute roles={['empleado', 'admin']}>
            <MisCursosPage />
          </ProtectedRoute>
        } />
        <Route path="/empleado/catalogo_de_cursos" element={
          <ProtectedRoute roles={['empleado', 'admin']}>
            <CatalogoPage />
          </ProtectedRoute>
        } />
        <Route path="/empleado/calendario" element={
          <ProtectedRoute roles={['empleado', 'admin']}>
            <CalendarioPage />
          </ProtectedRoute>
        } />

        {/* Rutas de Instructor */}
        <Route path="/instructor" element={
          <ProtectedRoute roles={['instructor', 'admin']}>
            <InstructorPage />
          </ProtectedRoute>
        } />
        <Route path="/instructor/mis_cursos" element={
          <ProtectedRoute roles={['instructor', 'admin']}>
            <MisCursosPageI />
          </ProtectedRoute>
        } />
        <Route path="/instructor/calendario" element={
          <ProtectedRoute roles={['instructor', 'admin']}>
            <CalendarioPageI />
          </ProtectedRoute>
        } />

        {/* Redirección por defecto según rol */}
        <Route path="/" element={
          <Navigate to={
            role === 'admin' ? '/admin' :
            role === 'instructor' ? '/instructor' : '/empleado'
          } />
        } />
        <Route path="*" element={
          <Navigate to={
            role === 'admin' ? '/admin' :
            role === 'instructor' ? '/instructor' : '/empleado'
          } />
        } />
      </Route>
    </Routes>
  );
  }