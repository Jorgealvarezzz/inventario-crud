import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductoService {

  private url = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}/`);
  }

  crear(p: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.url}/`, p);
  }

  actualizar(id: number, p: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${id}/`, p);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}/`);
  }
}
