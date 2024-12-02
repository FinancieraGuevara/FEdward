import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Prestamoresponse } from '../../models/PrestamoResponse/prestamoresponse';
import { PrestamoService } from '../../../core/services/Prestamo/prestamo.service';
@Component({
    selector: 'app-historial-pagos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './historial-pagos.component.html',
    styleUrl: './historial-pagos.component.scss'
})
export class HistorialPagosComponent implements OnInit {
  prestamosCompletados: Prestamoresponse[] = [] as Prestamoresponse[]; // Cambié el nombre de la propiedad
  prestamoSeleccionado: Prestamoresponse = {} as Prestamoresponse; // Para almacenar el préstamo seleccionado

  private prestamoService = inject(PrestamoService);
  private router = inject(Router);
  montoTotalAPagar: number = 0;

  ngOnInit(): void {
    this.obtenerPrestamosCompletados();
  }

  obtenerPrestamosCompletados(): void {
    console.log('Iniciando obtención de préstamos completados...');
    this.prestamoService.getPrestamosCompleted().subscribe(
      (prestamos) => {
        this.prestamosCompletados = prestamos;
        console.log('Préstamos completados obtenidos:', this.prestamosCompletados);
      },
      error => {
        console.error('Error al obtener los préstamos completados', error);
      }
    );
  }

  mostrarDetalle(prestamo: Prestamoresponse): void {
    this.prestamoSeleccionado = prestamo;
    console.log('Préstamo seleccionado:', this.prestamoSeleccionado);
    this.calculateMontoTotalAPagar(); // Calcular el monto total cuando se seleccione un préstamo
  }
  
  

  realizarPrestamo() {
    this.router.navigate(['/private/consulta']);
  }

  calculateMontoTotalAPagar(): void {
    if (this.prestamoSeleccionado) {
      this.montoTotalAPagar = this.prestamoSeleccionado.detallecuotas.reduce((total, cuota) => total + cuota.cuota, 0);
    }
  }
  

}
  // finalizarPrestamo(index: number): void {
  //   this.finalizados[index] = true;
  //   this.guardarEstadosFinalizados();
  // }

  // // Método para guardar los estados finalizados en localStorage
  // guardarEstadosFinalizados(): void {
  //   localStorage.setItem('finalizados', JSON.stringify(this.finalizados));
  // }

  // Método para cargar los estados finalizados desde localStorage
  // cargarEstadosFinalizados(): boolean[] {
  //   const estadosGuardados = localStorage.getItem('finalizados');
  //   if (estadosGuardados) {
  //     return JSON.parse(estadosGuardados);  // Si existen estados guardados, los cargamos
  //   } else {
  //     // Si no hay nada en localStorage, inicializamos con todos en falso
  //     return new Array(this.detallePrestamos.length).fill(false);
  //   }
  // }