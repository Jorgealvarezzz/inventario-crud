import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';

/**
 * Servicio SIN peticiones REST.
 * Maneja un "carrito" temporal en memoria del navegador.
 * No habla con el backend: solo guarda, calcula y expone
 * los productos que el usuario va agregando antes de generar una orden.
 * Usa un BehaviorSubject para que los componentes se enteren
 * automaticamente cuando cambia el carrito.
 */
@Injectable({ providedIn: 'root' })
export class CarritoService {

  private items: Producto[] = [];
  private itemsSubject = new BehaviorSubject<Producto[]>([]);

  // Los componentes se suscriben a esto para reaccionar a los cambios.
  items$ = this.itemsSubject.asObservable();

  agregar(producto: Producto): void {
    this.items.push(producto);
    this.itemsSubject.next([...this.items]);
  }

  quitar(index: number): void {
    this.items.splice(index, 1);
    this.itemsSubject.next([...this.items]);
  }

  vaciar(): void {
    this.items = [];
    this.itemsSubject.next([]);
  }

  obtenerItems(): Producto[] {
    return this.items;
  }

  contar(): number {
    return this.items.length;
  }

  // Calcula el total sumando los precios. Pura logica local, sin REST.
  total(): number {
    return this.items.reduce((suma, p) => suma + Number(p.precio), 0);
  }
}
