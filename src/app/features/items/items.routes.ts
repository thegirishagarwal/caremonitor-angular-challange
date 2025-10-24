import { Routes } from '@angular/router';

export const itemRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/items-list/items-list').then((m) => m.ItemsList),
  },
];
