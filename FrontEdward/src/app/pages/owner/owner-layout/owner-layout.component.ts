import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-owner-layout',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './owner-layout.component.html',
    styleUrl: './owner-layout.component.scss'
})
export class OwnerLayoutComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
