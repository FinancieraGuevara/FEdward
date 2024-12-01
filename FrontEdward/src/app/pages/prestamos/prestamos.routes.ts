import { Routes } from '@angular/router';
import { PrestamosLayoutComponent } from './prestamos-layout/prestamos-layout.component';

export const prestamosRoutes: Routes = [
    {
        path: '',
        component: PrestamosLayoutComponent,
        children: [
            { path: '**', redirectTo: 'cronograma' }//De ejemplo
        ]
    }
];