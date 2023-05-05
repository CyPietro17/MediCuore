export interface Paziente {
  n_id: number;
  t_nome: string;
  t_cognome: string;
  d_dataNascita: Date;
  t_codiceFiscale: string;
  b_ricoverato: string;
}

export interface PazienteRequest {
  t_nome: string | null | undefined;
  t_cognome: string | null | undefined;
  d_dataNascita: Date | null;
}
