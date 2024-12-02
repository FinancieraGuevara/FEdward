import { Routes } from '@angular/router';
import { OwnerLayoutComponent } from './owner-layout/owner-layout.component';
import { HistorialPagosComponent } from '../../shared/components/historial-pagos/historial-pagos.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ValidarInformacionComponent } from './validar-informacion/validar-informacion.component';
import { IngresarDetallesDePrestamosV2Component } from './ingresar-detalles-de-prestamos-v2/ingresar-detalles-de-prestamos-v2.component';
import { CronogramaDePagosComponent } from './cronograma-de-pagos/cronograma-de-pagos.component';
import { PrestamobienComponent } from './prestamobien/prestamobien.component';
import { PagosComponent } from './pagos/pagos.component';
import { DeudoresComponent } from './deudores/deudores.component';
export const ownerRoutes: Routes = [
    {
        path: '',
        component: OwnerLayoutComponent,
        children: [
            { path: 'cuenta', component: CuentaComponent},
            { path: 'pagos', component: PagosComponent},
            { path: 'historial', component: HistorialPagosComponent, pathMatch: 'full'  },
            { path: 'deudores', component: DeudoresComponent},
            { path: 'validar-informacion', component: ValidarInformacionComponent},
            { path: 'validar-informacion/tipo-prestamo', component: IngresarDetallesDePrestamosV2Component},
            { path: 'validar-informacion/tipo-prestamo/detalle-prestamo', component:CronogramaDePagosComponent },
            { path: 'validar-informacion/tipo-prestamo/detalle-prestamo/prestamo-bien', component:PrestamobienComponent}
            
        ]
    }
];