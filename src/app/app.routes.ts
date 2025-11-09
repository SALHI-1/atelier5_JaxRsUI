import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'stations',
    // Chargement "lazy" du composant
    loadComponent: () =>
      import('./components/station-list/station-list')
        .then(m => m.StationListComponent)
  },
  {
    path: 'stations/:id', // Route avec un paramètre (l'ID de la station)
    loadComponent: () =>
      import('./components/station-detail/station-detail')
        .then(m => m.StationDetailComponent)
  },
  {
    path: 'carburants',
    loadComponent: () =>
      import('./components/carburant-list/carburant-list')
        .then(m => m.CarburantListComponent)
  },
  {
    path: '', // Route par défaut
    redirectTo: '/stations',
    pathMatch: 'full'
  },
  {
    path: '**', // Redirection "Not Found"
    redirectTo: '/stations'
  }
];
