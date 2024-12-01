export interface Pago {
    nroCronograma: number;
    nroCuota: number;
    fechaVencimiento: string;
    estado: 'Pagado' | 'Pendiente' | 'Vencido' | 'Deuda Judicial';
    cliente: string;
    montoMora: number;
    totalCuota: number;
  }