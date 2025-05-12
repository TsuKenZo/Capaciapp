type UserRole = 'empleado' | 'instructor' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  password: string;
  cursos?: string[];
  cursosInscritos?: string[];
}

export const usersData: User[] = [
  { 
    id: '1',
    username: 'empleado', 
    email: 'empleado@empresa.com', 
    role: 'empleado', 
    password: 'empleado123',
    cursosInscritos: []
  },
  { 
    id: '2',
    username: 'instructor', 
    email: 'instructor@empresa.com', 
    role: 'instructor', 
    password: 'instructor123',
    cursos: []
  },
  { 
    id: '3',
    username: 'admin', 
    email: 'admin@empresa.com', 
    role: 'admin', 
    password: 'admin123'
  },
];

export const addUser = (newUser: Omit<User, 'id' | 'password'> & { password: string }) => {
  const user: User = {
    ...newUser,
    id: Math.random().toString(36).substring(2, 9),
    password: newUser.password,
    cursos: newUser.role === 'instructor' ? [] : undefined,
    cursosInscritos: newUser.role === 'empleado' ? [] : undefined
  };
  usersData.push(user);
  return user;
};