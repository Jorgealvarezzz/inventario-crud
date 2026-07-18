import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  servicios: Servicio[] = [];
  modelo: Servicio = this.vacio();
  editandoId: number | null = null;

  constructor(private svc: ServicioService) {}

  ngOnInit() { this.cargar(); }

  vacio(): Servicio {
    return { nombre: '', descripcion: '', precio: 0, duracion_min: 60 };
  }

  cargar() { this.svc.getAll().subscribe(d => this.servicios = d); }

  guardar() {
    if (!this.modelo.nombre.trim()) { alert('El nombre es obligatorio'); return; }
    if (this.editandoId) {
      this.svc.actualizar(this.editandoId, this.modelo).subscribe(() => this.reset());
    } else {
      this.svc.crear(this.modelo).subscribe(() => this.reset());
    }
  }

  editar(s: Servicio) { this.modelo = { ...s }; this.editandoId = s.id ?? null; }

  eliminar(id: number) {
    if (confirm('Eliminar este servicio?')) {
      this.svc.eliminar(id).subscribe(() => this.cargar());
    }
  }

  cancelar() { this.reset(); }

  reset() { this.modelo = this.vacio(); this.editandoId = null; this.cargar(); }
}
