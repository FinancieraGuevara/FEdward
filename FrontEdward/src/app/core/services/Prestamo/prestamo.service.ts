import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamorequest } from '../../../shared/models/PrestamoRequest/prestamorequest';
import { Prestamoresponse } from '../../../shared/models/PrestamoResponse/prestamoresponse';
import { environment } from '../../../../environments/environment';
import { Prestamo } from '../../../shared/models/Prestamo/prestamo';
export interface PrestamoResponseDTO { 
  monto: number;
  cuotas: number; 
}

export interface PrestamoRequestDTO { 
  monto: number;
  cuotas: number
}

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  private apiUrl = `${environment.baseURL}/prestamos`;

  constructor(private http: HttpClient) {}

  createPrestamo(solicitanteId: number, prestamoRequestDTO: Prestamorequest): Observable<Prestamoresponse> {
    return this.http.post<Prestamoresponse>(`${this.apiUrl}/crear/${solicitanteId}`, prestamoRequestDTO , {
      withCredentials: true
    });
  }
  
  deletePrestamo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }

  getAllPrestamos(): Observable<Prestamo[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Prestamo[]>(url);
  }

  getPrestamoById(idPrestamo: number): Observable<Prestamo> {
    const url = `${this.apiUrl}/${idPrestamo}`;
    return this.http.get<Prestamo>(url);
  }

  setCuotaPagada(idPrestamo: number, nmrcuota: number): Observable<any> {
    const url = `${environment.baseURL}/pagar/prestamo/${idPrestamo}/cuota/${nmrcuota}`;
    return this.http.put<any>(url, null); 
  }
  
  downloadComprobantePago(prestamoId: number, nroCuota: number): Observable<Blob> {
    const url = `${environment.baseURL}/reports/prestamo/${prestamoId}/cuota/${nroCuota}`;
    
    // Hacemos una solicitud GET para descargar el archivo PDF
    return this.http.get(url, {
      responseType: 'blob', // Especificamos que esperamos un archivo binario 
    });
  }

  getPrestamosCompleted(): Observable<Prestamoresponse[]> {
    return this.http.get<Prestamoresponse[]>(`${this.apiUrl}/completados`, {
      withCredentials: true
    });
  }
}
