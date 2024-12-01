import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SolicitanteService} from '../../../core/services/Solicitante/solicitante.service'
import { Router, RouterOutlet , RouterLink} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitante } from '../../../shared/models/Solicitante/solicitante';
import { FormsModule } from '@angular/forms';

import { responseSolicitante } from './responseSolicitante';
import { delay } from 'rxjs';


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
    this.router.navigate(['/owner/validar-informacion/tipo-prestamo']);
      /* if (this.dni && this.selectedTipo) {
          this.isLoading = true; 
          this.solicitanteService.getDataById(this.dni,this.selectedTipo ).subscribe({
              next: (response: responseSolicitante<Solicitante>) => { // Asegúrate de que response es de tipo responseSolicitante
                    this.isLoading = false;
                    this.loading=1;
                    console.log('Respuesta de la API:', response); // Verifica la estructura real de la respuesta
                   // Oculta el loader
                  if (response && response.data) {
                      this.solicitanteData = response.data; // Ahora puedes asignar data a solicitanteData
                      console.log('Datos del solicitante:', this.solicitanteData); // Para verificar
                  } else {

                    alert("ERROR AL OBTENER LOS DATOS")
                      console.error('No se encontraron datos en la respuesta');      
                      this.isLoading = false;  
                      this.loading=0;  
                  }
              },
              error: (error) => {
               
                  console.error('Error obteniendo los datos del solicitante', error);
                  alert("ERROR DATOS NO EXISTEN")
                  this.isLoading = false;
                  this.loading=0;  
              }
          });
      } */
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
      this.router.navigate(['/private/consulta/prestamo']);
    } else {
      alert('Por favor, busca un DNI válido antes de continuar.');
    }
  }
  volver(): void {
    this.router.navigate(['/private/historialprestamos']);
  }


}