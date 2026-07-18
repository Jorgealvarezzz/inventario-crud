export interface Empleado {
  id?:                 number;
  nombre:              string;
  rol:                 string;
  telefono?:           string;
  activo?:             boolean;
  fecha_contratacion?: string;
}
