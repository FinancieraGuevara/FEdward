import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
      { 
        path: 'auth', 
        loadChildren : () => import ("././pages/auth/auth.routes").then(a => a.authRoutes),
        canActivate:[authInverseGuard]
      },
      {
        path: 'owner',
        loadChildren : () => import ("././pages/owner/owner.routes").then(o => o.ownerRoutes),
        canActivate: [authGuard]
      },
      { 
        path: 'prestamos',
        loadChildren : () => import ("././pages/prestamos/prestamos.routes").then(p => p.prestamosRoutes),
        canActivate: [authGuard]
      },
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
