import { Component } from '@angular/core';

@Component({
  selector: 'app-seleccionar-tipo-prestamo',
  standalone: true,
  imports: [],
  templateUrl: './seleccionar-tipo-prestamo.component.html',
  styleUrl: './seleccionar-tipo-prestamo.component.scss'
})
export class SeleccionarTipoPrestamoComponent {
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
