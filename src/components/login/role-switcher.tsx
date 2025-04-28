import { useAuth } from "~/context/use-Auth";

interface RoleSwitcherProps {
  currentRole: 'empleado' | 'instructor';
}

export default function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const { switchRole } = useAuth();
  const otherRole = currentRole === 'empleado' ? 'instructor' : 'empleado';

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => switchRole(otherRole)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
      >
        Cambiar a modo {otherRole === 'empleado' ? 'Empleado' : 'Instructor'}
      </button>
    </div>
  );
}