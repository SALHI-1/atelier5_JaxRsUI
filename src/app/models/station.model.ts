import { HistoCarb } from './histocarb.model';

export interface Station {
  id: number;
  nom: string;
  ville: string;
  adresse: string;
  historiques: HistoCarb[]; // Peut être vide ou non chargé
}
