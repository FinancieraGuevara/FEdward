import { Routes } from '@angular/router';
import { AuthLayout2Component } from './auth-layout2/auth-layout2.component';
import { LoginComponent } from './login/login.component';
export const authRoutes: Routes = [
    {
        path : "",
        component :AuthLayout2Component,
        children: [
            {path: "login" , component :LoginComponent},
        ]
    }
];