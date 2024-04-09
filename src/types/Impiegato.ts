import { Reparto } from './Reparto';

export interface Impiegato {
  n_id: number;
  t_nome: string;
  t_cognome: string;
  d_dataNascita: Date;
  t_codiceFiscale: string;
  t_professione: string;
  t_reparto: Reparto;
  b_active: string;
}

export interface ImpiegatoRequest {
  t_nome: string | null | undefined;
  t_cognome: string | null | undefined;
  d_dataNascita: Date | null;
  t_codiceFiscale: string | null | undefined;
  t_professione: string | null | undefined;
  n_reparto: number | null | undefined;
}
