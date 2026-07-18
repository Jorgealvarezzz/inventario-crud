import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { EmpleadoService } from '../../services/empleado.service';
import { ClienteService } from '../../services/cliente.service';
import { OrdenService } from '../../services/orden.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totProductos = 0;
  totEmpleados = 0;
  totClientes = 0;
  totOrdenes = 0;

  constructor(
    private productoSvc: ProductoService,
    private empleadoSvc: EmpleadoService,
    private clienteSvc: ClienteService,
    private ordenSvc: OrdenService
  ) {}

  ngOnInit() {
    this.productoSvc.getAll().subscribe(d => this.totProductos = d.length);
    this.empleadoSvc.getAll().subscribe(d => this.totEmpleados = d.length);
    this.clienteSvc.getAll().subscribe(d => this.totClientes = d.length);
    this.ordenSvc.getAll().subscribe(d => this.totOrdenes = d.length);
  }
}
