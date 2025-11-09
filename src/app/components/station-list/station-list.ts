import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour *ngFor, *ngIf
import { ApiService } from '../../services/api';
import { Station } from '../../models/station.model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

// Imports Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './station-list.html',
  styleUrls: ['./station-list.css']
})
export class StationListComponent implements OnInit {

  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  // Utiliser un Observable pour gérer l'état (chargement, erreur)
  public stations$!: Observable<Station[]>;

  addForm = this.fb.group({
    nom: ['', [Validators.required, Validators.maxLength(100)]],
    ville: ['', [Validators.required, Validators.maxLength(100)]],
    adresse: ['', [Validators.required, Validators.maxLength(200)]]
  });

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.stations$ = this.apiService.getStations();
  }

  submitAdd(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    const { nom, ville, adresse } = this.addForm.value;
    if (!nom || !ville || !adresse) return;

    this.apiService.createStation({ nom, ville, adresse })
      .subscribe({
        next: () => {
          this.snack.open('Station créée', 'OK', { duration: 2500 });
          this.addForm.reset();
          this.refresh();
        },
        error: (err) => {
          console.error(err);
          this.snack.open('Erreur lors de la création', 'Fermer', { duration: 4000 });
        }
      });
  }
}
