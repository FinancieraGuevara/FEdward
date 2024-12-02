import { Component, inject } from '@angular/core';
import { Pago } from '../../../shared/models/pagos/pagos-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cronograma } from '../../../shared/models/cronograma/cronograma';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { Prestamo } from '../../../shared/models/Prestamo/prestamo';
import { PrestamoService } from '../../../core/services/Prestamo/prestamo.service';
import { NotExpr } from '@angular/compiler';

@Component({
    selector: 'app-pagos',
    standalone: true,
    imports: [CommonModule, FormsModule,MatSnackBarModule],
    templateUrl: './pagos.component.html',
    styleUrl: './pagos.component.scss'
})
export class PagosComponent {

  prestamos !: Prestamo[];
  prestamoseleccionado!: Prestamo;
  
  prestamoservice = inject(PrestamoService)
  filtroEstado: string = '';
  busqueda: string = '';
  private snackbar = inject(MatSnackBar);
  ngOnInit(): void {
    this.prestamoservice.getAllPrestamos().subscribe({
      next:(prestamos)=>{
        this.prestamos=prestamos;
      },
      error:()=>
      {
        alert("Error obteniendo los prestamos")
      }
      
    });
  }

  filtrarPagos() {
    return this.prestamos.filter(prestamo => {
      const matchesBusqueda = this.busqueda === '' || prestamo.username.toLowerCase().includes(this.busqueda.toLowerCase());
      
      const matchesEstado = this.filtroEstado === '' || this.getEstado(prestamo) === this.filtroEstado;
  
      // El préstamo pasa el filtro si coincide con la búsqueda y el estado
      return matchesBusqueda && matchesEstado;
    });
  }

  verDetalle(prestamo: Prestamo) {
    if (prestamo && prestamo.detallecuotas) {
      // Ordenar el arreglo por 'nmrcuota' (número de cuota)
      prestamo.detallecuotas = prestamo.detallecuotas.sort((a, b) => {
        return a.nmrcuota - b.nmrcuota;  // Orden ascendente por el número de cuota
      });
    } else {
      console.warn('No se encontraron detalles de cuotas.');
    }
    this.prestamoseleccionado=prestamo
  }

  getEstado(prestamo : Prestamo)
  {

    if(prestamo.judicialDeuda)
    {
      return "deuda judicial"
    }
    if(prestamo.deuda)
      {
        return "deuda";
      }
    if(prestamo.completed)
      {
        return "completado"
      }
    if(prestamo.payed)
    {
      return "pagado"
    }

    else{
      return "pendiente"
    }
  }

  cuotaEstado(cuota : Cronograma)
  {
    if(cuota.isjudicial)
      {
        return "judicial"
      }
    if(cuota.isdeuda)
      {
        return "deuda";
      }
      
      if(cuota.ispayed)
      {
        return "pagado"
      }
      else{
        return "pendiente"
      }
  }

  pagarCuota(idPrestamo: number , nmrCuota:number )
  {
        this.prestamoservice.setCuotaPagada(idPrestamo,nmrCuota).subscribe({
          next:()=>
          {
            alert("Pago exitoso")
            this.prestamoservice.getPrestamoById(idPrestamo).subscribe({
              next:(prestamo)=>
              {
                if (prestamo && prestamo.detallecuotas) {
                  prestamo.detallecuotas = prestamo.detallecuotas.sort((a, b) => {
                    return a.nmrcuota - b.nmrcuota; 
                  });
                } else {
                  console.warn('No se encontraron detalles de cuotas.');
                }
                this.prestamoseleccionado=prestamo
              }
            });

            
            this.comprobante(idPrestamo , nmrCuota );
          }
          ,
          error:(error)=>
          {
            alert(error.error.error)
          }
        });
  }

  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }

  comprobante(idPrestamo: number , nmrCuota:number )
  {
    this.prestamoservice.downloadComprobantePago(idPrestamo,nmrCuota).subscribe();
  }
}
