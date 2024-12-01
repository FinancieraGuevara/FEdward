import { Component } from '@angular/core';
import { Pago } from '../../../shared/models/pagos/pagos-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cronograma } from '../../../shared/models/cronograma/cronograma';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent {

  pagoSeleccionado: Cronograma = {} as Cronograma;

  pagos: Pago[] = [
    {
      nroCronograma: 1,
      nroCuota: 1,
      fechaVencimiento: '2023-12-15',
      estado: 'Pendiente',
      cliente: 'Juan Pérez',
      montoMora: 0,
      totalCuota: 500
    },
    {
      nroCronograma: 2,
      nroCuota: 3,
      fechaVencimiento: '2023-11-30',
      estado: 'Vencido',
      cliente: 'María García',
      montoMora: 50,
      totalCuota: 750
    },
    {
      nroCronograma: 3,
      nroCuota: 5,
      fechaVencimiento: '2022-12-01',
      estado: 'Deuda Judicial',
      cliente: 'Carlos Rodríguez',
      montoMora: 1000,
      totalCuota: 1500
    },
    {
      nroCronograma: 4,
      nroCuota: 4,
      fechaVencimiento: '2022-12-01',
      estado: 'Pagado',
      cliente: 'Carlos Rodríguez',
      montoMora: 1000,
      totalCuota: 1500
    }
  ];

  filtroEstado: string = '';
  busqueda: string = '';

  filtrarPagos() {
    return this.pagos.filter(pago => 
      (this.filtroEstado === '' || pago.estado === this.filtroEstado) &&
      (this.busqueda === '' || pago.cliente.toLowerCase().includes(this.busqueda.toLowerCase()))
    );
  }

  verDetalle(nroCronograma: number) {
    //logica para mostrar detalle del pago seleccionado por id 
  }

}
