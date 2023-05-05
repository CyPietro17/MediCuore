import { Paziente } from './Paziente';
import { Reparto } from './Reparto';

export interface Ricovero {
  n_id: number;
  d_inizioRicovero: Date;
  d_fineRicovero: Date;
  n_paziente: Paziente;
  t_reparto: Reparto;
}

export interface InizioRicoveroRequest {
  d_inizioRicovero: Date | null;
  n_paziente: number | null | undefined;
  n_reparto: number | null | undefined;
}

export interface FineRicoveroRequest {
  d_fineRicovero: Date;
}
