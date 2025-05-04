type UserRole = 'empleado' | 'instructor' | 'admin';

export interface User {
  username: string;
  email: string;
  role: UserRole;
  password: string;
}

export const usersData: User[] = [
  { username: 'empleado', email: 'empleado@empresa.com', role: 'empleado', password: 'empleado123' },
  { username: 'instructor', email: 'instructor@empresa.com', role: 'instructor', password: 'instructor123' },
  { username: 'admin', email: 'admin@empresa.com', role: 'admin', password: 'admin123' },
];

export const addUser = (newUser: Omit<User, 'password'> & { password: string }) => {
  const user: User = {
    ...newUser,
    password: newUser.password 
  };
  usersData.push(user);
  return user;
};