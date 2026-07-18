import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  modelo: Cliente = this.vacio();
  editandoId: number | null = null;

  constructor(private svc: ClienteService) {}

  ngOnInit() { this.cargar(); }

  vacio(): Cliente {
    return { nombre: '', telefono: '', correo: '', direccion: '' };
  }

  cargar() { this.svc.getAll().subscribe(d => this.clientes = d); }

  guardar() {
    if (!this.modelo.nombre.trim()) { alert('El nombre es obligatorio'); return; }
    if (this.editandoId) {
      this.svc.actualizar(this.editandoId, this.modelo).subscribe(() => this.reset());
    } else {
      this.svc.crear(this.modelo).subscribe(() => this.reset());
    }
  }

  editar(c: Cliente) { this.modelo = { ...c }; this.editandoId = c.id ?? null; }

  eliminar(id: number) {
    if (confirm('Eliminar este cliente?')) {
      this.svc.eliminar(id).subscribe(() => this.cargar());
    }
  }

  cancelar() { this.reset(); }

  reset() { this.modelo = this.vacio(); this.editandoId = null; this.cargar(); }
}
