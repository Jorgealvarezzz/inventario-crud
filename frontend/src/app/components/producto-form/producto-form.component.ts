import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../models/producto.model";

@Component({
  selector: "app-producto-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./producto-form.component.html",
  styleUrls: ["./producto-form.component.css"]
})
export class ProductoFormComponent implements OnInit {

  producto: Producto = {
    nombre: "",
    categoria: "",
    precio: 0,
    stock: 0,
    descripcion: ""
  };

  editando = false;
  id: number | null = null;

  constructor(
    private svc: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      this.editando = true;
      this.id = Number(idParam);
      this.svc.getOne(this.id).subscribe(data => {
        this.producto = data;
      });
    }
  }

  guardar() {
    if (this.editando && this.id !== null) {
      this.svc.actualizar(this.id, this.producto).subscribe(() => {
        this.router.navigate(["/productos"]);
      });
    } else {
      this.svc.crear(this.producto).subscribe(() => {
        this.router.navigate(["/productos"]);
      });
    }
  }

  cancelar() {
    this.router.navigate(["/productos"]);
  }
}
