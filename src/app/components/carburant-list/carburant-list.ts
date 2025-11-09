import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ApiService } from '../../services/api';
import { Carburant } from '../../models/carburant.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carburant-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './carburant-list.html',
  styleUrls: ['./carburant-list.css']
})
export class CarburantListComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  carburants$!: Observable<Carburant[]>;
  loading = signal(false);
  displayedColumns = ['nom', 'description', 'actions'];

  addForm = this.fb.group({
    nom: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]]
  });

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.carburants$ = this.api.getCarburants();
  }

  submitAdd(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    const { nom, description } = this.addForm.value;
    if (!nom || !description) return;

    this.loading.set(true);
    this.api.createCarburant({ nom, description })
      .subscribe({
        next: () => {
          this.snack.open('Carburant ajouté', 'OK', { duration: 2500 });
          this.addForm.reset();
          this.refresh();
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.snack.open('Erreur lors de l\'ajout', 'Fermer', { duration: 4000 });
          this.loading.set(false);
        }
      });
  }

  delete(id: number): void {
    if (!confirm('Supprimer ce carburant ?')) return;
    this.api.deleteCarburant(id).subscribe({
      next: () => {
        this.snack.open('Carburant supprimé', 'OK', { duration: 2000 });
        this.refresh();
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Suppression impossible', 'Fermer', { duration: 4000 });
      }
    });
  }
}

