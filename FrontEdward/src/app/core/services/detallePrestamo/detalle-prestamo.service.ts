import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DetallePrestamo } from '../../../shared/models/detallePrestamo/detalle-prestamo';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetallePrestamoService {

    private baseURL = `${environment.baseURL}/prestamos`;
    private baseURL2=`${environment.baseURL}/private/detalleprestamos`
    private http = inject(HttpClient);


  getAllDetallePrestamos(): Observable<DetallePrestamo[]> {
    console.log('Realizando solicitud GET a:', this.baseURL);
     return this.http.get<DetallePrestamo[]>(this.baseURL,{withCredentials: true}).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error al obtener la lista de detalles de préstamos';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
        }
        console.error('Error en DetallePrestamoService:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getDetallePrestamo(prestamoId: number): Observable<DetallePrestamo> {
    return this.http.get<DetallePrestamo>(`${this.baseURL}/${prestamoId}`,{withCredentials: true}).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error al obtener el detalle del prestamo';
          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Error del lado del servidor
            errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
          }
          console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
        })
      );
  }

  getPrestamoDetails(solicitanteId: number): Observable<DetallePrestamo[]> {
    return this.http.get<DetallePrestamo[]>(`${this.baseURL}/${solicitanteId}`, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error al obtener los detalles del prestamo';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  exportPDF(solicitanteId: number): Observable<Blob> {
    return this.http.get(`${environment.baseURL}/reports/pdf/${solicitanteId}`, {
      responseType: 'blob',
      withCredentials: true // Incluir cookies
    })
  }

  getDetalleByPrestamoId(prestamoId:number):Observable<DetallePrestamo>
  {
    return this.http.get<DetallePrestamo>(`${this.baseURL2}/prestamoId/${prestamoId}`)
  }

}
