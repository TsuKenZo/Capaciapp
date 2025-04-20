import { Route } from "wouter";

export default function EmpleadoRoute({ component: Component, ...rest }: any) {

  return (
    <Route
      {...rest}
      component={(props) => (
        <Component {...props} /> 
      )}
    />
  );
}