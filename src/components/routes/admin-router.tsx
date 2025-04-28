import { Switch, Route, Redirect } from 'wouter';
import { sections } from '~/data/sections';
import BasedLayout from '../layouts/Based-layout';

export default function AdminRouter() {

  // Filtrar secciones para admin
  const adminSections = sections.filter(section => 
    section.roles.includes('admin')
  );

  return (
    <BasedLayout>
      <Switch>
        {adminSections.map((section) => (
          <Route 
            key={section.href} 
            path={section.href} 
            component={() => (
              <section.component />
            )} 
          />
        ))}
        <Route>
          <Redirect to="/admin" />
        </Route>
      </Switch>
    </BasedLayout>
  );
}