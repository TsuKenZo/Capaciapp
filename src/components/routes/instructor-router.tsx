import { Switch, Route, Redirect } from 'wouter';
import { sections } from '~/data/sections';
import RoleSwitcher from '../login/role-switcher';
import { useAuth } from '~/context/use-Auth';
import BasedLayout from '../layouts/Based-layout';

export default function InstructorRouter() {
  const { role } = useAuth();

  // Filtrar secciones para instructor
  const instructorSections = sections.filter(section => 
    section.roles.includes('instructor') || 
    (role === 'admin' && section.roles.includes('instructor'))
  );

  return (
    <>
      {role === 'admin' && <RoleSwitcher currentRole="instructor" />}
      <BasedLayout>
        <Switch>
          {instructorSections.map((section) => (
            <Route 
              key={section.href} 
              path={section.href} 
              component={() => (
                <section.component />
              )} 
            />
          ))}
          <Route>
            <Redirect to="/instructor" />
          </Route>
        </Switch>
      </BasedLayout>
    </>
  );
}