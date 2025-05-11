import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { usersData, User, addUser } from '~/data/usuarios-base';
import { Curso, cursosIniciales } from '~/data/cursos-disponibles';

type UserRole = 'empleado' | 'instructor' | 'admin';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  users: User[];
  cursosInscritos: CursoInscrito[];
  cursosDisponibles: Curso[];
  empleados: User[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  addNewUser: (user: Omit<User, 'id' | 'password'> & { password: string }) => void;
  addCursoInscrito: (curso: Omit<CursoInscrito, 'id'>) => void;
  asignarInstructorACurso: (instructorId: string, cursoId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_KEY = 'auth_data';

interface AuthStorage {
  username: string; // Cambiado de 'user' a 'username' para ser más explícito
  role: UserRole;
  expiresAt: number;
}

interface CursoInscrito {
  id: string;
  nombre: string;
  docente: string;
}


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [users, setUsers] = useState<User[]>(usersData);
  const [cursosInscritos, setCursosInscritos] = useState<CursoInscrito[]>([]);
  const [, navigate] = useLocation();
  const [cursosDisponibles, setCursosDisponibles] = useState<Curso[]>(cursosIniciales);

  const empleados = users.filter(user => user.role === 'empleado');

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (storedAuth) {
      const authData: AuthStorage = JSON.parse(storedAuth);
      if (authData.expiresAt > Date.now()) {
        // Buscar el usuario completo por su username
        const foundUser = users.find(u => u.username === authData.username);
        if (foundUser) {
          setUser(foundUser); // Ahora estamos pasando el objeto User completo
          setRole(authData.role);
          navigate(authData.role === 'empleado' ? '/empleado' : '/instructor');
        } else {
          // Si no encontramos el usuario, limpiamos la autenticación
          localStorage.removeItem(AUTH_KEY);
        }
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, [navigate, users]); 

  const login = async (username: string, password: string) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
  
    if (foundUser) {
      const authData: AuthStorage = {
        username: foundUser.username, // Usar el username del usuario encontrado
        role: foundUser.role,
        expiresAt: Date.now() + 2 * 60 * 60 * 1000,
      };
  
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      setUser(foundUser); // Guardar el objeto User completo
      setRole(foundUser.role);
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

  const addNewUser = (newUser: Omit<User, 'id' | 'password'> & { password: string }) => {
    const user = addUser(newUser);
    setUsers([...users, user]); // Actualizar el estado con el nuevo usuario
    return user;
  };

  const addCursoInscrito = (curso: Omit<CursoInscrito, 'id'>) => {
    const newCurso = {
      ...curso,
      id: Math.random().toString(36).substring(2, 9), // ID simple
    };
    setCursosInscritos([...cursosInscritos, newCurso]);
  };

  const asignarInstructorACurso = (instructorId: string, cursoId: string) => {
    setUsers(users.map(user => {
      if (user.id === instructorId) {
        const curso = cursosDisponibles.find(c => c.id === cursoId);
        return {
          ...user,
          cursos: [...(user.cursos || []), cursoId] // Guardamos el ID del curso
        };
        console.log(curso)
      }
      return user;
    }));

    setCursosDisponibles(cursosDisponibles.map(curso => {
      if (curso.id === cursoId) {
        const instructor = users.find(u => u.id === instructorId);
        return {
          ...curso,
          docente: instructor?.username || "Sin asignar"
        };
      }
      return curso;
    }));
  };

  return (
    <AuthContext.Provider value={{ user, role, users, cursosInscritos, cursosDisponibles, empleados, login, logout, switchRole, addNewUser, addCursoInscrito, asignarInstructorACurso }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;