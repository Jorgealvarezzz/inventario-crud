import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServicioService {

  private url = `${environment.apiUrl}/servicios`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.url}/${id}/`);
  }

  crear(s: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.url}/`, s);
  }

  actualizar(id: number, s: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.url}/${id}/`, s);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}/`);
  }
}
