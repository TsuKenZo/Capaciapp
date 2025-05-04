import { BrowserRouter } from 'react-router-dom';
import { MainRouter } from './components/routes/main-router';
import { ThemeProvider } from './context/theme-provider';
import { AuthProvider } from './context/auth-context';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}



