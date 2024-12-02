import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordDTO } from '../../../shared/models/password/password';
import { UserService } from '../../../core/services/Usuario/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-cuenta',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './cuenta.component.html',
    styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {
  
  passwordForm: FormGroup;

  private fb = inject(FormBuilder);
  private snackbar = inject(MatSnackBar);
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
        {
          next:()=>
          { 
            this.showSnackBar("Contraseña actualizada con exito")
          },
          error:(error)=>
          {console.log(error);
            this.showSnackBar(error.error)
          }
        }
        
      );
    }
  }

  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 3000,
      verticalPosition : 'top'
    });
  }
}