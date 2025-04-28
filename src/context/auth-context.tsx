import { createContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';

type UserRole = 'empleado' | 'instructor' | 'admin';

interface AuthContextType {
  user: string | null;
  role: UserRole | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [, navigate] = useLocation();

  // Simulación de usuarios (en un caso real, esto vendría de una API)
  const users = [
    { username: 'empleado', password: 'empleado123', role: 'empleado' },
    { username: 'instructor', password: 'instructor123', role: 'instructor' },
    { username: 'admin', password: 'admin123', role: 'admin' },
  ];

  const login = async (username: string, password: string) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(username);
      setRole(foundUser.role as UserRole);
      navigate(foundUser.role === 'empleado' ? '/empleado' : '/instructor');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    document.documentElement.classList.remove('dark');
    navigate('/login');
  };

  const switchRole = (newRole: UserRole) => {
    if (role === 'admin') {
      setRole(newRole);
      navigate(newRole === 'empleado' ? '/empleado' : '/instructor');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;