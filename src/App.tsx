import EmpleadoPage from "./components/Empleado/empleado-page";
import NotasPage from "./components/Empleado/notas-page";
import MisCursosPage from "./components/Empleado/mis-cursos-page";
import CalendarioPage from "./components/Empleado/Calendario-page";
import CatalogoPage from "./components/Empleado/catalogo-page";
import { Switch, Route } from "wouter";

export default function App() {

  return (
      <Switch>
        <Route path="/empleado" component={EmpleadoPage}/>
        <Route path="/notas_cursos" component={NotasPage}/>
        <Route path="/mis_cursos" component={MisCursosPage}/>
        <Route path="/catalogo_de_cursos" component={CatalogoPage}/>
        <Route path="/calendario" component={CalendarioPage}/>
      </Switch>
      //<Link href="/empleado">Ir a empleado</Link>
      //<EmpleadoPage></EmpleadoPage>
  );
}


