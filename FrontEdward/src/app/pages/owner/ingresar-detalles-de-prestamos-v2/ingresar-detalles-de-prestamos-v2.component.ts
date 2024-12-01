import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrestamoService } from '../../../core/services/Prestamo/prestamo.service';
import { Prestamorequest } from '../../../shared/models/PrestamoRequest/prestamorequest';
import { SolicitanteService } from '../../../core/services/Solicitante/solicitante.service';
import { responseSolicitante } from '../validar-informacion/responseSolicitante';
import { Solicitante } from '../../../shared/models/Solicitante/solicitante';
import { DetallePrestamoService } from '../../../core/services/detallePrestamo/detalle-prestamo.service';
@Component({
  selector: 'app-ingresar-detalles-de-prestamos-v2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ingresar-detalles-de-prestamos-v2.component.html',
  styleUrls: ['./ingresar-detalles-de-prestamos-v2.component.scss']
})
export class IngresarDetallesDePrestamosV2Component implements OnInit {
  
  dniSolicitante: string = localStorage.getItem('dniSolicitante') || '';
  selectedTipo: string = localStorage.getItem('tipodocumento') || '';
  isInputValid: boolean = false;
  isConfirmButtonDisabled: boolean = true;
  monto: number = 0;
  selectedTimeButton: number = 0;
  prestamoForm: FormGroup = {} as FormGroup;
  showError: boolean = false;
  solicitanteData: Solicitante | null = null;
  myForm?: FormGroup;

  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private prestamoService: PrestamoService,
    private solicitanteService: SolicitanteService,
    private detallePrestamoService: DetallePrestamoService
    
  ) {}

  ngOnInit(): void {
    this.prestamoForm = this.fb.group({
      monto: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]], // Solo números
    });
  } 

  realizarPrestamo(){
    this.router.navigate(['/private/consulta']);
  }

  /* cerrarSesion() {
    this.detallePrestamoService.logout().subscribe({
        next: (response) => {
            console.log('Sesión cerrada:', response);
            this.router.navigate(['/login']);
        },
        error: (error) => {
            console.error('Error al cerrar sesión:', error);
          
        }
    });
  } */

  selectTime(time: number): void {
    this.selectedTimeButton = time;
    this.prestamoForm.patchValue({ time });
  }
  
  validateInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/[0-9]/.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(): void {
    if (this.prestamoForm.valid) {
      // Lógica para enviar el formulario
    }
  }

  continue(): void {
    this.router.navigate(['/owner/validar-informacion/tipo-prestamo/detalle-prestamo']);
    /* const dniSolicitante = localStorage.getItem('dniSolicitante'); 
    const selectedTipo = localStorage.getItem('tipodocumento');
    if (dniSolicitante && selectedTipo) {
      this.solicitanteService.getDataById(dniSolicitante, selectedTipo).subscribe({
        next: (response: responseSolicitante<Solicitante>) => {
          if (response && response.data) {
            this.solicitanteData = response.data;
            localStorage.setItem('dniSolicitante', dniSolicitante);
            console.log("Datos del solicitante guardados", this.solicitanteData);
            
            // Verifica que solicitanteData tenga un ID válido antes de continuar
            const solicitanteId = this.solicitanteData.id;
            if (solicitanteId) {
              const prestamoRequest: Prestamorequest = {
                monto: this.prestamoForm.get('monto')?.value,
                cuotas: this.selectedTimeButton,
              };
              localStorage.setItem('solicitanteIdStr',String(this.solicitanteData.id))
              this.prestamoService.createPrestamo(solicitanteId, prestamoRequest).subscribe(
                (response) => {
                  // Guardar el ID del préstamo en el localStorage
                  const prestamoId = response.id; // Asegúrate de que esta es la estructura correcta
                  localStorage.setItem('prestamoId', prestamoId.toString());
                  // Obtener los detalles del préstamo
                  this.detallePrestamoService.getPrestamoDetails(solicitanteId).subscribe(
                    (detalles: any) => {
                      if (detalles && detalles.length > 0) {
                        const ultimoDetalle = detalles[detalles.length - 1];
                        console.log('Último detalle del préstamo:', ultimoDetalle);
                        // Guardar el último detalle en el localStorage
                        localStorage.setItem('ultimoDetallePrestamo', JSON.stringify(ultimoDetalle));
                        // Navegar a la vista de cronograma de pagos
                        this.router.navigate(['/private/consulta/prestamo/cronograma']);
                      } else {
                        console.error('No se encontraron detalles del préstamo.');
                      }
                    },
                    (error: any) => {
                      console.error('Error al obtener los detalles del préstamo:', error);
                    }
                  );
                },
                (error) => {
                  console.error('Error al crear el préstamo:', error);
                }
              );
            } else {
              alert('Error: El ID del solicitante no es válido.');
            }
          } else {
            alert('Error al obtener los datos del solicitante.');
          }
        },
        error: (error) => {
          console.error('Error obteniendo los datos del solicitante', error);
          alert("Error al obtener los datos del solicitante.");
        }
      });
    } else {
      alert('Por favor, busca un DNI válido antes de continuar.');
    } */
  }

  volver(): void {
    this.router.navigate(['/owner/validar-informacion']);
  }

  buscar(): void {
    const dniSolicitante = localStorage.getItem('dniSolicitante'); 
    
    if (dniSolicitante) {
      this.solicitanteService.getDataById(dniSolicitante, 'dni').subscribe({
        next: (response: responseSolicitante<Solicitante>) => {
          if (response && response.data) {
            this.solicitanteData = response.data;
            console.log('Datos del solicitante:', this.solicitanteData); 
            if (this.solicitanteData.id) {
              console.log('ID del solicitante:', this.solicitanteData.id);
              // Puedes continuar con la lógica del préstamo aquí si es necesario
            }
          } else {
            alert("ERROR AL OBTENER LOS DATOS");
          }
        },
        error: (error) => {
          console.error('Error obteniendo los datos del solicitante', error);
          alert("ERROR: DATOS NO EXISTEN");
        }
      });
    } else {
      alert('No se encontró un DNI en el localStorage. Por favor, busca un solicitante primero.');
    }
  }
}