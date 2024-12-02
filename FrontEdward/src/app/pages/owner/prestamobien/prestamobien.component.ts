import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Prestamo } from '../../../shared/models/Prestamo/prestamo';
import { Router } from '@angular/router';
import {DetallePrestamoService} from '../../../core/services/detallePrestamo/detalle-prestamo.service'
import { DetallePrestamo } from '../../../shared/models/detallePrestamo/detalle-prestamo';




@Component({
    selector: 'app-prestamobien',
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
    const prestamoId = localStorage.getItem('prestamoId');
    if (prestamoId) {
      const prestamoIdNumber = Number(prestamoId);
      this.detallePrestamoService.getDetalleByPrestamoId(prestamoIdNumber).subscribe(
        {
          next: (data) => {
            this.ultimoDetallePrestamo = data;
            console.log('Detalle del préstamo:', data);
          },
          error: (err) => {
            console.error('Error al obtener el detalle del préstamo:', err);
          }
        }
      );
    } else {
      console.error('No se encontró el prestamoId en localStorage.');
    }
    
  }
  
}