import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
      { 
        path: 'auth', 
        loadChildren : () => import ("././pages/auth/auth.routes").then(a => a.authRoutes),
        
      },
      {
        path: 'owner',
        loadChildren : () => import ("././pages/owner/owner.routes").then(o => o.ownerRoutes),
      },
      { 
        path: 'prestamos',
        loadChildren : () => import ("././pages/prestamos/prestamos.routes").then(p => p.prestamosRoutes),
        canActivate: [authGuard]
      },
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
