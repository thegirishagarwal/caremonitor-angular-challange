import { Routes } from '@angular/router';
import { authGuard, loginGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.routes').then((m) => m.layoutRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./features').then((m) => m.Login),
    canActivate: [loginGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./features').then((m) => m.Page404)
  },
];
