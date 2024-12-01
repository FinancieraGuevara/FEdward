import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Prestamo } from '../../../shared/models/Prestamo/prestamo';
import { Router } from '@angular/router';
import {DetallePrestamoService} from '../../../core/services/detallePrestamo/detalle-prestamo.service'
import { DetallePrestamo } from '../../../shared/models/detallePrestamo/detalle-prestamo';




@Component({
  selector: 'app-prestamobien',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './prestamobien.component.html',
  styleUrls: ['./prestamobien.component.scss']
})
export class PrestamobienComponent {
  ultimoDetallePrestamo: DetallePrestamo | null = null;
  constructor(private router: Router,private detallePrestamoService: DetallePrestamoService){}

  ngOnInit(): void {
    this.ultimoDetail();
  }
  volver(): void {
    this.router.navigate(['/owner/historial']);
  }
  // prestamo: Prestamo = new Prestamo(0); // Inicializar con un valor por defecto

  // constructor() {
  //   const prestamoData = localStorage.getItem('prestamo');
  //   if (prestamoData) {
  //     this.prestamo = JSON.parse(prestamoData);
  //   }
  // }

  // get monto(): number {
  //   return this.prestamo.monto;
  // }

  downloadPdf() {
    const solicitanteIdStr = localStorage.getItem('solicitanteIdStr');
    const solicitanteId = parseInt(solicitanteIdStr!, 10);
    if (solicitanteId !== null) {
      this.detallePrestamoService.exportPDF(solicitanteId).subscribe((response) =>{
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'reporte.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
      });
    } else {
      console.error('No se encontró el solicitanteId en localStorage');
    }
  }

  ultimoDetail(){
    const ultimoDetalle = localStorage.getItem('ultimoDetallePrestamo');
    if (ultimoDetalle) {
      this.ultimoDetallePrestamo = JSON.parse(ultimoDetalle);
      console.log('Último detalle del préstamo:', this.ultimoDetallePrestamo);
    } else {
      console.error('No se encontró el último detalle del préstamo en el localStorage.');
    }
  }
  
}