import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private url = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}/`);
  }

  crear(c: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/`, c);
  }

  actualizar(id: number, c: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${id}/`, c);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}/`);
  }
}
