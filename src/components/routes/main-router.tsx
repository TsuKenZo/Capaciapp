import { useAuth } from "~/context/use-Auth";
import { Switch, Route, Redirect } from "wouter";
import LoginPage from "../login/login-page";
import InstructorRouter from "./instructor-router";
import EmpleadoRouter from "./empleado-routes";
import AdminRouter from "./admin-router";

export function MainRouter() {
    const { user, role } = useAuth();
  
    if (!user) {
      return (
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      );
    }
  
    return (
      <Switch>
        <Route path="/empleado">
          {role === 'empleado' || role === 'admin' ? (
            <EmpleadoRouter />
          ) : (
            <Redirect to="/instructor" />
          )}
        </Route>
        <Route path="/instructor">
          {role === 'instructor' || role === 'admin' ? (
            <InstructorRouter />
          ) : (
            <Redirect to="/empleado" />
          )}
        </Route>
        <Route path="/admin">
          {role === 'admin' ? (
            <AdminRouter />
          ) : (
            <Redirect to={role === 'empleado' ? '/empleado' : '/instructor'} />
          )}
        </Route>
        <Route>
          <Redirect to={role === 'empleado' ? '/empleado' : role === 'instructor' ? '/instructor' : '/admin'} />
        </Route>
      </Switch>
    );
  }