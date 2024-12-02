import { Cronograma } from '../cronograma/cronograma';

export interface Prestamoresponse {
  id: number;
  monto: number;
  totalpagar:number;
  cuotas: number;
  interes: number;
  solicitanteId: number;
  username: string;
  isPayed: boolean;
  isCompleted: boolean;
  isDeuda: boolean;
  isJudicialDeuda: boolean;
  detallecuotas: Cronograma[];
  cuotasJudicialesPagadas: number;
  cuotasJudicialesporpagar: number;
  cuotasPagadas: number;
  cuotasporpagar: number;
  montoTotal: number;
}