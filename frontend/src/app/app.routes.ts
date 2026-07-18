import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductoListaComponent } from './components/producto-lista/producto-lista.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';

export const routes: Routes = [
  { path: '',                 component: HomeComponent },
  { path: 'productos',        component: ProductoListaComponent },
  { path: 'productos/form',   component: ProductoFormComponent },
  { path: 'productos/form/:id', component: ProductoFormComponent },
  { path: 'empleados',        component: EmpleadosComponent },
  { path: 'clientes',         component: ClientesComponent },
  { path: 'servicios',        component: ServiciosComponent },
  { path: 'ordenes',          component: OrdenesComponent },
  { path: '**', redirectTo: '' },
];
