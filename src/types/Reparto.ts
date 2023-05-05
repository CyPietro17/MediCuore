export interface Reparto {
  n_id: number;
  t_nome: string;
  n_postiLettoEffettivi: number;
  n_postiLettoDisponibili: number;
  b_postiLiberi: string;
}

export interface RepartoRequest {
  t_nome: string | null | undefined;
  n_postiLettoEffettivi: number | null | undefined;
}
