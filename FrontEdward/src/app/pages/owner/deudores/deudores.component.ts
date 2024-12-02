import { Component, OnInit, inject } from '@angular/core';
import { DeudoresDTO } from '../../../shared/models/Solicitante/deudor';
import { SolicitanteService } from '../../../core/services/Solicitante/solicitante.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deudores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.scss']
})
export class DeudoresComponent implements OnInit {
  deudores: DeudoresDTO[] = [];
  deudoresFiltrados: DeudoresDTO[] = [];
  busqueda: string = '';

  private solicitanteService = inject(SolicitanteService);

  ngOnInit(): void {
    console.log('Iniciando obtención de deudores y dinero...');
    this.obtenerDeudores();
  }

  obtenerDeudores(): void {
    this.solicitanteService.findDeudoresAndMoney().subscribe(
      (deudores) => {
        this.deudores = deudores;
        this.deudoresFiltrados = deudores;
        console.log('Deudores y dinero:', this.deudores);
      },
      (error) => {
        console.error('Error al obtener deudores y dinero', error);
      }
    );
  }

  filtrarDeudores(): void {
    this.deudoresFiltrados = this.deudores.filter(deudor =>
      deudor.nombre_completo.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
}