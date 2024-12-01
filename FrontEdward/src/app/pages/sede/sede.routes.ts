import { Routes } from "@angular/router";
import { SedeLayoutComponent } from "./sede-layout/sede-layout.component";

export const sedeRoutes: Routes = [
    {
        path: '',
        component: SedeLayoutComponent,
        children: [
            // Define las rutas para cada sección de la sede aquí
        ]
    }
];