import { inject, Injectable} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { AuthRequest } from '../../../shared/models/auth/auth-request-model';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../../shared/models/auth/auth-response-model';
import { SedeRequest } from '../../../shared/models/auth/sede-request-model';
import { SedeResponse } from '../../../shared/models/auth/sede-response-model';

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    private baseURL = `${environment.baseURL}/auth`;
    private http = inject(HttpClient);
    private storageService = inject(StorageService);

    login(authRequest: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseURL}/login`,authRequest).pipe(
            tap(response => {this.storageService.setAuthData(response);
            })
        )
    }

    registerSede(sedeRquest: SedeRequest): Observable<SedeResponse>{
        return this.http.post<SedeResponse>(`${this.baseURL}/register-sede`,sedeRquest);
    }

    logout(){
    this.storageService.clearAuthData();
    }

    isAuthenticated(): boolean {
        return this.storageService.getAuthData() !== null;
      }
    
    getUser():AuthResponse | null {
        const authData= this.storageService.getAuthData();
        return authData ? authData : null;
    }
    
    getRole(): string | null {
        const authData = this.storageService.getAuthData();
        return authData && authData.role ? authData.role.toString() : null;
    }
    
    getCurrentUserId(): number | null {
        const user = this.getUser(); 
        return user ? user.id : null;
    }
}  
