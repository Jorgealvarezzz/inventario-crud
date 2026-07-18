import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {

  private url = `${environment.apiUrl}/empleados`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.url}/`);
  }

  getOne(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.url}/${id}/`);
  }

  crear(e: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.url}/`, e);
  }

  actualizar(id: number, e: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.url}/${id}/`, e);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}/`);
  }
}
