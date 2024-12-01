import { Cronograma } from "../cronograma/cronograma";
import { Prestamo } from "../Prestamo/prestamo";
import { Solicitante } from "../Solicitante/solicitante";

export interface DetallePrestamo{
    detailId: number;
    solicitante: Solicitante;
    prestamo: Prestamo;
    fechaInicio: string;
    pagarTotal: number;
    interesTotal: number;
    cronograma: Cronograma[];
    idOwner: number;
}
