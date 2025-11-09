import { Carburant } from './carburant.model';

export interface HistoCarb {
  id: number;
  date: string; // ou Date
  prix: number;
  // Note: La station n'est pas incluse pour éviter les boucles
  carburant: Carburant;
}
