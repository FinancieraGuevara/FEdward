import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SolicitanteService} from '../../../core/services/Solicitante/solicitante.service'
import { Router, RouterOutlet , RouterLink} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitante } from '../../../shared/models/Solicitante/solicitante';
import { FormsModule } from '@angular/forms';

import { responseSolicitante } from './responseSolicitante';
import { delay } from 'rxjs';

//prueba comit
@Component({
    selector: 'app-validar-informacion',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './validar-informacion.component.html',
    styleUrl: './validar-informacion.component.scss'
})
export class ValidarInformacionComponent {
  showError: boolean = false;
  dni: string = '';
  ruc: string = '';
  selectedTipo: string = '';
  solicitanteData: Solicitante = {} as Solicitante; 
  isLoading = false; 
  loading=0;
  prestamoForm: FormGroup;
  fb: FormBuilder;
  constructor(private solicitanteService: SolicitanteService, private router: Router, private formBuilder: FormBuilder) {
    this.fb = formBuilder; // Inicializa fb aquí
    this.prestamoForm = this.fb.group({
      monto: [null, [Validators.required, Validators.min(500), Validators.pattern("^[0-9]*$")]],
      cuotas: [null] // Asegúrate de que la propiedad cuotas esté en tu formulario si la usas
    });
  }
  
  buscar() {
    
    // Verifica si el tipo de documento seleccionado es 'dni' o 'ruc' y si el campo correspondiente tiene valor
    if (this.selectedTipo === 'dni' && this.dni) {
      this.isLoading = true;  // Activa el loading
      this.solicitanteService.getDataById(this.dni, 'dni').subscribe({
        next: (response: responseSolicitante<Solicitante>) => {
          this.isLoading = false;  // Detiene el loading
          if (response && response.data) {
            this.solicitanteData = response.data;
            console.log('Datos del solicitante:', this.solicitanteData);
          } else {
            alert("No se encontraron datos para el DNI.");
          }
        },
        error: (error) => {
          this.isLoading = false;  // Detiene el loading
          console.error('Error al obtener los datos del solicitante', error);
          alert("Error al obtener los datos del DNI.");
        }
      });
    } else if (this.selectedTipo === 'ruc' && this.ruc) {
      this.isLoading = true;  // Activa el loading
      this.solicitanteService.getDataById(this.ruc, 'ruc').subscribe({
        next: (response: responseSolicitante<Solicitante>) => {
          this.isLoading = false;  // Detiene el loading
          if (response && response.data) {
            this.solicitanteData = response.data;
            console.log('Datos del solicitante:', this.solicitanteData);
          } else {
            alert("No se encontraron datos para el RUC.");
          }
        },
        error: (error) => {
          this.isLoading = false;  // Detiene el loading
          console.error('Error al obtener los datos del solicitante', error);
          alert("Error al obtener los datos del RUC.");
        }
      });
    } else {
      alert("Por favor ingrese un número de documento válido.");
    }
  }
  
  validateNumber(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  continue() {
    if (this.solicitanteData) {
      localStorage.setItem('dniSolicitante', this.dni); 
      localStorage.setItem('tipodocumento',this.selectedTipo);
      console.log("datos guardados",localStorage.getItem('dniSolicitante'));
      this.router.navigate(['/owner/validar-informacion/tipo-prestamo']);
    } else {
      alert('Por favor, busca un DNI válido antes de continuar.');
    }
  }


}