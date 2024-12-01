
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { DetallePrestamo } from '../../models/detallePrestamo/detalle-prestamo'; // Asegúrate de importar la clase DetallePrestamo
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from '@angular/router';
import {UserService} from "../../../core/services/Usuario/user.service";
import {NavegadorComponent} from "../navegador/navegador.component";
import { HttpClient } from '@angular/common/http'; 
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {DetallePrestamoService} from '../../../core/services/detallePrestamo/detalle-prestamo.service'
import { PrestamoService } from '../../../core/services/Prestamo/prestamo.service';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-cronograma-de-pagos',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule a los imports
  templateUrl: './cronograma-de-pagos.component.html',
  styleUrls: ['./cronograma-de-pagos.component.scss']
})

export class CronogramaDePagosComponent implements OnInit {
  ultimoDetallePrestamo: DetallePrestamo | null = null;
  constructor(private router: Router, private http: HttpClient,private detallePrestamoService: DetallePrestamoService,
    private prestamoService:PrestamoService) {}

  ngOnInit(): void {
    const ultimoDetalle = localStorage.getItem('ultimoDetallePrestamo');
    if (ultimoDetalle) {
      this.ultimoDetallePrestamo = JSON.parse(ultimoDetalle);
      console.log('Último detalle del préstamo:', this.ultimoDetallePrestamo);
    } else {
      console.error('No se encontró el último detalle del préstamo en el localStorage.');
    }
  }

  continue() {
    this.router.navigate(['/private/consulta/prestamo/cronograma/bien']);
  }

  continue2() {
    this.router.navigate(['/private/consulta/prestamo']);
  }

  cancelarPrestamo(){
    this.router.navigate(['/private/historialprestamos']);
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
  
  volver () : void {
    this.eliminarPrestamo();
    this.continue2();
    // Obtén el elemento del modal
  const modalElement = document.getElementById('exampleModal');

  // Verifica que modalElement no sea null
  if (modalElement) {
    const modal = Modal.getInstance(modalElement);
    
    // Verifica si se ha instanciado el modal
    if (modal) {
      modal.hide(); // Cierra el modal
    }
  }
  }

  cancelar (): void{
    this.eliminarPrestamo();
    this.cancelarPrestamo();
    // Obtén el elemento del modal
  const modalElement = document.getElementById('exampleModal1');

  // Verifica que modalElement no sea null
  if (modalElement) {
    const modal = Modal.getInstance(modalElement);
    
    // Verifica si se ha instanciado el modal
    if (modal) {
      modal.hide(); // Cierra el modal
    }
  }
  }

  eliminarPrestamo(): void {
    const prestamoId = localStorage.getItem('prestamoId');
    console.log('ID del préstamo:', prestamoId);
    if (prestamoId) {
      this.prestamoService.deletePrestamo(Number(prestamoId)).subscribe(
        () => {
          console.log('Prestamo eliminado exitosamente');
          // Aquí puedes agregar lógica adicional, como redirigir al usuario o mostrar un mensaje
        },
        (error: any) => {
          console.error('Error al eliminar el prestamo', error);
          // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
      );
    } else {
      console.error('No se encontró el ID del préstamo en el localStorage.');
    }
  }
}

