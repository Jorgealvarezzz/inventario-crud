import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  totalCarrito = 0;

  // Inyectamos el servicio SIN REST para mostrar el contador del carrito.
  constructor(private carrito: CarritoService) {}

  ngOnInit() {
    this.carrito.items$.subscribe(items => {
      this.totalCarrito = items.length;
    });
  }
}
