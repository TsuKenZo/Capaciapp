export interface Curso {
    id: string;
    nombre: string;
    duracion: string;
    docente: string;
}

export const cursosIniciales: Curso[] = [
    { id: "1", nombre: "Curso de React", duracion: "4 semanas", docente: "Sin asignar" },
    { id: "2", nombre: "Curso de TypeScript", duracion: "3 semanas", docente: "Sin asignar" }
];