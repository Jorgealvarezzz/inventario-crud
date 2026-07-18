import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];
  roles = ['mostrador', 'instalador', 'dueno'];
  modelo: Empleado = this.vacio();
  editandoId: number | null = null;

  constructor(private svc: EmpleadoService) {}

  ngOnInit() { this.cargar(); }

  vacio(): Empleado {
    return { nombre: '', rol: 'mostrador', telefono: '', activo: true };
  }

  cargar() {
    this.svc.getAll().subscribe(d => this.empleados = d);
  }

  guardar() {
    if (!this.modelo.nombre.trim()) { alert('El nombre es obligatorio'); return; }
    if (this.editandoId) {
      this.svc.actualizar(this.editandoId, this.modelo).subscribe(() => this.reset());
    } else {
      this.svc.crear(this.modelo).subscribe(() => this.reset());
    }
  }

  editar(e: Empleado) {
    this.modelo = { ...e };
    this.editandoId = e.id ?? null;
  }

  eliminar(id: number) {
    if (confirm('Eliminar este empleado?')) {
      this.svc.eliminar(id).subscribe(() => this.cargar());
    }
  }

  cancelar() { this.reset(); }

  reset() {
    this.modelo = this.vacio();
    this.editandoId = null;
    this.cargar();
  }
}
