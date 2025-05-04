import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { usersData, User, addUser } from '~/data/usuarios-base';

type UserRole = 'empleado' | 'instructor' | 'admin';

interface AuthContextType {
  user: string | null;
  role: UserRole | null;
  users: User[];
  cursosInscritos: CursoInscrito[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  addNewUser: (user: Omit<User, 'password'> & { password: string }) => void;
  addCursoInscrito: (curso: Omit<CursoInscrito, 'id'>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_KEY = 'auth_data';

interface AuthStorage {
  user: string;
  role: UserRole;
  expiresAt: number; 
}

interface CursoInscrito {
  id: string;
  nombre: string;
  docente: string;
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [users, setUsers] = useState<User[]>(usersData);
  const [cursosInscritos, setCursosInscritos] = useState<CursoInscrito[]>([]);
  const [, navigate] = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (storedAuth) {
      const authData: AuthStorage = JSON.parse(storedAuth);
      if (authData.expiresAt > Date.now()) {
        setUser(authData.user);
        setRole(authData.role);
        navigate(authData.role === 'empleado' ? '/empleado' : '/instructor');
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, [navigate]);

  const login = async (username: string, password: string) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const authData: AuthStorage = {
        user: username,
        role: foundUser.role as UserRole,
        expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2 horas en milisegundos
      };
      
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      setUser(username);
      setRole(foundUser.role as UserRole);
      navigate(foundUser.role === 'empleado' ? '/empleado' : '/instructor');
      return true;
    }
    return false;
  };

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setRole(null);
    document.documentElement.classList.remove('dark');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const checkAuth = setInterval(() => {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      if (storedAuth) {
        const authData: AuthStorage = JSON.parse(storedAuth);
        if (authData.expiresAt <= Date.now()) {
          logout();
        }
      }
    }, 60 * 1000); 

    return () => clearInterval(checkAuth);
  }, [logout]);

  const switchRole = (newRole: UserRole) => {
    if (role === 'admin') {
      setRole(newRole);
      navigate(newRole === 'empleado' ? '/empleado' : '/instructor');
    }
  };

  const addNewUser = (newUser: Omit<User, 'password'> & { password: string }) => {
    const user = addUser({
      ...newUser,
      password: newUser.password
    });
    setUsers([...usersData]);
    return user;
  };

  const addCursoInscrito = (curso: Omit<CursoInscrito, 'id'>) => {
    const newCurso = {
      ...curso,
      id: Math.random().toString(36).substring(2, 9), // ID simple
    };
    setCursosInscritos([...cursosInscritos, newCurso]);
  };

  return (
    <AuthContext.Provider value={{ user, role, users, cursosInscritos, login, logout, switchRole, addNewUser, addCursoInscrito }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;