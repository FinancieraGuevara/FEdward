import { Routes } from '@angular/router';
import { OwnerLayoutComponent } from './owner-layout/owner-layout.component';
import { HistorialPagosComponent } from '../../shared/components/historial-pagos/historial-pagos.component';

export const ownerRoutes: Routes = [
    {
        path: '',
        component: OwnerLayoutComponent,
        children: [
            { path: '', component: HistorialPagosComponent, pathMatch: 'full'  },
        ]
    }
];