import EmpleadoPagefrom "~/components/Empleado/empleado-page";

export interface Section {
    name: String;
    href: string;
    component: any;
}

export const sections: Section[] = [
    {
      name: "Panel",
      href: "/dashboard",
      component: DashboardHome,
    },
  ];