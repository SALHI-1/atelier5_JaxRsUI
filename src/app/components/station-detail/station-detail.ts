import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ApiService } from '../../services/api';
import { Station } from '../../models/station.model';
import { HistoCarb } from '../../models/histocarb.model';
import { Carburant } from '../../models/carburant.model';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-station-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './station-detail.html',
  styleUrls: ['./station-detail.css']
})
export class StationDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  stationId!: number;
  station$!: Observable<Station>;
  prices$!: Observable<HistoCarb[]>;
  carburants$!: Observable<Carburant[]>;
  loadingAdd = signal(false);

  displayedColumns = ['date', 'carburant', 'prix'];

  addPriceForm = this.fb.group({
    carburantId: [null as number | null, Validators.required],
    date: [null as Date | null, Validators.required],
    prix: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    this.stationId = Number(this.route.snapshot.paramMap.get('id'));
    this.station$ = this.api.getStationById(this.stationId);
    this.refreshPrices();
    this.carburants$ = this.api.getCarburants();
  }

  refreshPrices(): void {
    this.prices$ = this.api.getPricesForStation(this.stationId);
  }

  submitAddPrice(): void {
    if (this.addPriceForm.invalid) {
      this.addPriceForm.markAllAsTouched();
      return;
    }
    const { carburantId, date, prix } = this.addPriceForm.value;
    if (carburantId == null || date == null || prix == null) return;

    // Convertir la date en format ISO LocalDate (YYYY-MM-DD)
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    this.loadingAdd.set(true);
    this.api.addPrice(this.stationId, carburantId, { date: dateStr, prix })
      .subscribe({
        next: () => {
          this.snack.open('Prix ajouté avec succès', 'OK', { duration: 2500 });
          this.addPriceForm.reset();
          this.refreshPrices();
          this.loadingAdd.set(false);
        },
        error: (err) => {
          console.error(err);
          this.snack.open('Erreur lors de l\'ajout du prix', 'Fermer', { duration: 4000 });
          this.loadingAdd.set(false);
        }
      });
  }
}

