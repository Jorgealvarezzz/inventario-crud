import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ProductoService } from "../../services/producto.service";
import { CarritoService } from "../../services/carrito.service";
import { Producto } from "../../models/producto.model";

@Component({
  selector: "app-producto-lista",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./producto-lista.component.html",
  styleUrls: ["./producto-lista.component.css"]
})
export class ProductoListaComponent implements OnInit {

  productos: Producto[] = [];
  cargando = true;

  // Inyectamos tambien el servicio SIN REST (carrito).
  constructor(
    private svc: ProductoService,
    private carrito: CarritoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.svc.getAll().subscribe(data => {
      this.productos = data;
      this.cargando = false;
    });
  }

  nuevo() {
    this.router.navigate(["/productos/form"]);
  }

  editar(id: number) {
    this.router.navigate(["/productos/form", id]);
  }

  eliminar(id: number) {
    if (confirm("Seguro que quieres eliminar este producto?")) {
      this.svc.eliminar(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  // Usa el servicio SIN REST: agrega el producto al carrito en memoria.
  agregarCarrito(p: Producto) {
    this.carrito.agregar(p);
  }
}
