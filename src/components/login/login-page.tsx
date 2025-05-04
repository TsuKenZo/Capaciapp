import { useState } from 'react';
import { useAuth } from '~/context/use-Auth';
import { useLocation } from 'wouter';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, addNewUser } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        addNewUser({
          username,
          email,
          password,
          role: 'empleado'
        });
        setError('');
        setIsRegistering(false);
        setEmail('');
        setUsername('');
        setPassword('');
        setError('Registro exitoso. Ahora puedes iniciar sesión');
      } else {
        const success = await login(username, password);
        if (!success) {
          setError('Credenciales incorrectas');
        } else {
          navigate('/'); 
        }
      }
    } catch (err) {
      console.log(err);
      setError('Error al procesar la solicitud');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mx-auto"> 
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </h1>
        {error && (
          <div className={`mb-4 p-2 rounded ${isRegistering && error === 'Registro exitoso. Ahora puedes iniciar sesión' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                required
                placeholder="Ingrese su email"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
              placeholder="Ingrese su usuario"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              required
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors mb-4"
          >
            {isRegistering ? 'Registrarse' : 'Ingresar'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="w-full text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-lg focus:outline-none transition-colors"
          >
            {isRegistering ? 'Volver a Iniciar Sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </form>
      </div>
    </div>
  );
}