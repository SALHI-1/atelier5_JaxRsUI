import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../models/station.model';
import { HistoCarb } from '../models/histocarb.model';
import { Carburant } from '../models/carburant.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL de base de votre API JAX-RS
  private baseUrl = environment.apiBase; // ex: '/api'

  constructor(private http: HttpClient) { }

  // --- Stations ---
  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/stations`);
  }

  getStationById(id: number): Observable<Station> {
    return this.http.get<Station>(`${this.baseUrl}/stations/${id}`);
  }

  createStation(station: Omit<Station, 'id' | 'historiques'>): Observable<Station> {
    return this.http.post<Station>(`${this.baseUrl}/stations`, station);
  }

  // --- Carburants ---
  getCarburants(): Observable<Carburant[]> {
    return this.http.get<Carburant[]>(`${this.baseUrl}/carburants`);
  }

  getCarburantById(id: number): Observable<Carburant> {
    return this.http.get<Carburant>(`${this.baseUrl}/carburants/${id}`);
  }

  createCarburant(carburant: Omit<Carburant, 'id'>): Observable<Carburant> {
    return this.http.post<Carburant>(`${this.baseUrl}/carburants`, carburant);
  }

  updateCarburant(id: number, carburant: Omit<Carburant, 'id'>): Observable<Carburant> {
    return this.http.put<Carburant>(`${this.baseUrl}/carburants/${id}`, carburant);
  }

  deleteCarburant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/carburants/${id}`);
  }

  // --- Prix (HistoCarb) ---
  getPricesForStation(stationId: number): Observable<HistoCarb[]> {
    return this.http.get<HistoCarb[]>(`${this.baseUrl}/stations/${stationId}/prices`);
  }

  addPrice(stationId: number, carburantId: number, data: {date: string, prix: number}): Observable<HistoCarb> {
    return this.http.post<HistoCarb>(
      `${this.baseUrl}/stations/${stationId}/prices/${carburantId}`,
      data
    );
  }
}
