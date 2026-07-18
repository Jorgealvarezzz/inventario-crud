import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../../services/orden.service';
import { ClienteService } from '../../services/cliente.service';
import { EmpleadoService } from '../../services/empleado.service';
import { ProductoService } from '../../services/producto.service';
import { ServicioService } from '../../services/servicio.service';
import { Orden } from '../../models/orden.model';
import { Cliente } from '../../models/cliente.model';
import { Empleado } from '../../models/empleado.model';
import { Producto } from '../../models/producto.model';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  ordenes: Orden[] = [];
  clientes: Cliente[] = [];
  empleados: Empleado[] = [];
  productos: Producto[] = [];
  servicios: Servicio[] = [];
  estados = ['pendiente', 'completada', 'cancelada'];

  modelo: Orden = this.vacio();
  editandoId: number | null = null;

  constructor(
    private svc: OrdenService,
    private clienteSvc: ClienteService,
    private empleadoSvc: EmpleadoService,
    private productoSvc: ProductoService,
    private servicioSvc: ServicioService
  ) {}

  ngOnInit() {
    this.cargar();
    this.clienteSvc.getAll().subscribe(d => this.clientes = d);
    this.empleadoSvc.getAll().subscribe(d => this.empleados = d);
    this.productoSvc.getAll().subscribe(d => this.productos = d);
    this.servicioSvc.getAll().subscribe(d => this.servicios = d);
  }

  vacio(): Orden {
    return { cliente: 0, empleado: null, producto: 0, servicio: null, cantidad: 1, estado: 'pendiente' };
  }

  cargar() { this.svc.getAll().subscribe(d => this.ordenes = d); }

  guardar() {
    if (!this.modelo.cliente || !this.modelo.producto) {
      alert('Selecciona cliente y producto'); return;
    }
    if (this.editandoId) {
      this.svc.actualizar(this.editandoId, this.modelo).subscribe(() => this.reset());
    } else {
      this.svc.crear(this.modelo).subscribe(() => this.reset());
    }
  }

  editar(o: Orden) {
    this.modelo = {
      cliente: o.cliente, empleado: o.empleado ?? null, producto: o.producto,
      servicio: o.servicio ?? null, cantidad: o.cantidad, estado: o.estado
    };
    this.editandoId = o.id ?? null;
  }

  eliminar(id: number) {
    if (confirm('Eliminar esta orden?')) {
      this.svc.eliminar(id).subscribe(() => this.cargar());
    }
  }

  cancelar() { this.reset(); }

  reset() { this.modelo = this.vacio(); this.editandoId = null; this.cargar(); }
}
