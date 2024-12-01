import { Component } from '@angular/core';
import { PrestamoService } from '../../../core/services/Prestamo/prestamo.service';
import { PrestamoRequestDTO } from '../../../core/services/Prestamo/prestamo.service';
import { PrestamoResponseDTO } from '../../../core/services/Prestamo/prestamo.service';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 
import { SolicitanteService } from '../../../core/services/Solicitante/solicitante.service';  
import { Solicitante } from '../../../shared/models/Solicitante/solicitante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-detalle-prestamo',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './ingresar-detalle-prestamo.component.html',
  styleUrls: ['./ingresar-detalle-prestamo.component.scss']
})
export class IngresarDetallePrestamoComponent { 
  dni: string;
  solicitanteId: number;
  solicitanteData: Solicitante;
  monto: number = 0; 
  cuotas: number = 6; ; 

  constructor( 
    private prestamoService: PrestamoService, 
    private solicitanteService: SolicitanteService,
    private router: Router
  ) {}
   
  ngOnInit() {
    this.dni = localStorage.getItem('dniSolicitante') ?? ''; // Recuperar el DNI, asignar una cadena vacía si es null
    if (this.dni) {
      this.obtenerSolicitanteData(); // Llamar al método para obtener los datos del solicitante
    }
  }
   
  obtenerSolicitanteData(): void {
    this.solicitanteService.getSolicitanteIdByDni(this.dni).subscribe({
      next: (data: Solicitante) => {
        this.solicitanteData = data; // Asigna los datos obtenidos a solicitanteData
        console.log('Datos del solicitante:', this.solicitanteData); // Para verificar que los datos se han cargado
      },
      error: (err: any) => {
        console.error('Error al obtener datos del solicitante:', err);
      }
    });
  }

  onSubmit(): void {
    const prestamoRequest: PrestamoRequestDTO = {
      monto: this.monto,
      cuotas: this.cuotas
    };

    this.prestamoService.createPrestamo(this.solicitanteData.id, prestamoRequest).subscribe({
      next: (response: PrestamoResponseDTO) => {
        console.log('Préstamo creado:', response); 
        this.router.navigate(['/private/users']); 
      },
      error: (err) => {
        console.error('Error al crear el préstamo:', err);
      },
    });
  }
  validateNumber(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  //////////////////////////////

  // Método para validar que solo se ingresen números
  validateInput(event: KeyboardEvent) {
    const keyCode = event.keyCode ? event.keyCode : event.which;

    // Solo permitir números (0-9)
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }

  // Método para validar que el número ingresado sea positivo
  validatePositive(event: any) {
    const input = event.target.value;

    // Si el número es negativo, se borra el valor y se muestra alerta
    if (parseFloat(input) < 0) {
      event.target.value = '';
      alert('Por favor, ingrese un número positivo.');
    }
  }
}
