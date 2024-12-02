import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Solicitante } from '../../../shared/models/Solicitante/solicitante';
import { responseSolicitante } from '../../../pages/owner/validar-informacion/responseSolicitante';
import { environment } from '../../../../environments/environment';
import { DeudoresDTO } from '../../../shared/models/Solicitante/deudor';
@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {
  private solicitanteData: Solicitante = {} as Solicitante; 
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.baseURL}`;

  // Método para guardar datos del solicitante
  setSolicitanteData(data: Solicitante): void {
    this.solicitanteData = data;
  }

  // Método para obtener datos del solicitante
  getSolicitanteData(): Solicitante {
    return this.solicitanteData;
  }

  getDataById(identifier: string, type: string): Observable<responseSolicitante<Solicitante>> {
    const url = `${this.apiUrl}/private/consulta/${identifier}?type=${type}`;
    return this.http.get<responseSolicitante<Solicitante>>(url, { withCredentials: true });
  }

  getSolicitanteIdByDni(id: string): Observable<Solicitante> {
    return this.http.get<Solicitante>(`${this.apiUrl}/solicitantes/searchByDni/${id}`,{ 
      withCredentials: true});
}

findDeudoresAndMoney(): Observable<DeudoresDTO[]> {
  return this.http.get<DeudoresDTO[]>(`${this.apiUrl}/deudoresYDinero`, {
    withCredentials: true
  });
}


}
