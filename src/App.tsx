import EmpleadoRoute from "./components/routes/empleado-routes";
import EmpleadoPage from "./components/Empleado/empleado-page";
import { Switch } from "wouter";  // Ensure you're using Switch

export default function App() {

  return (
    <Switch>
      <EmpleadoRoute path="/empleado" component={EmpleadoPage} />
    </Switch>
  );
}

