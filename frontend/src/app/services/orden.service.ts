import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrdenService {

  private url = `${environment.apiUrl}/ordenes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Orden> {
    return this.http.get<Orden>(`${this.url}/${id}/`);
  }

  crear(o: Orden): Observable<Orden> {
    return this.http.post<Orden>(`${this.url}/`, o);
  }

  actualizar(id: number, o: Orden): Observable<Orden> {
    return this.http.put<Orden>(`${this.url}/${id}/`, o);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}/`);
  }
}
