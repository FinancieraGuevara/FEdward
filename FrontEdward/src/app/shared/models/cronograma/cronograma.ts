export interface Cronograma {
    id: number;
    nmrcuota: number;
    cuota: number;
    interes:number;
    capitalamortizado: number;
    saldofinal: number;
    fechaPago: String;
    fechadeCancelamiento: String;
    ispayed: boolean;
    isdeuda: boolean;
    isjudicial: boolean;
    mora: number;
    totaldiasmora: number;
    totalmora: number;
}
