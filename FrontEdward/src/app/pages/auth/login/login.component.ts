import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AuthService } from "../../../core/services/auth/auth.service";

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
  
      this.authService.login(data).subscribe({
        next: () => {
          this.router.navigate(['/owner/historial']); 
  
          alert('Sesión iniciada correctamente');
        },
        error: (error) => {
          console.error('Error de inicio de sesión:', error);
          alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
      });
    }
  }

  // private showSnackbar(message: string) {
  //   this.snackbar.open(message, 'Cerrar', {
  //     duration: 2000,
  //     verticalPosition : 'top'
  //   });
  // }
}
