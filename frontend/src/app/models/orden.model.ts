export interface Orden {
  id?:              number;
  cliente:          number;
  empleado?:        number | null;
  producto:         number;
  servicio?:        number | null;
  cantidad:         number;
  estado:           string;
  fecha?:           string;
  cliente_nombre?:  string;
  empleado_nombre?: string;
  producto_nombre?: string;
}
