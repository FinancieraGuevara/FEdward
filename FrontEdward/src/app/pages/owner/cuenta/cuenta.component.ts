import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordDTO } from '../../../shared/models/password/password';
import { UserService } from '../../../core/services/Usuario/user.service';


@Component({
    selector: 'app-cuenta',
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './cuenta.component.html',
    styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {
  
  passwordForm: FormGroup;

  private fb = inject(FormBuilder);

  constructor(private userService: UserService) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }
  
  updatePassword() {
    if (this.passwordForm.valid) {
      const passwordDTO: PasswordDTO = {
        currentPassword: this.passwordForm.get('currentPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value,
        confirmPassword: this.passwordForm.get('confirmPassword')?.value
      };
  
      this.userService.changePassword(passwordDTO).subscribe(
        response => {
          alert('Contraseña actualizada correctamente');
        },
        error => {
          
        }
      );
    }
  }
}