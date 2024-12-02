import { Cronograma } from "../cronograma/cronograma";

export interface Prestamo {
    id: number;
    monto: number;
    cuotas: number;
    interes: number;
    solicitanteId: number;
    username:string;
    cuotasJudicialesPagadas: number;
    cuotasJudicialesporpagar: number;
    cuotasPagadas: number;
    cuotasporpagar: number;
    completed:boolean;
    deuda:boolean;
    payed:boolean;
    judicialDeuda:boolean;
    detallecuotas: Cronograma[];
}
