import { Routes } from '@angular/router';
import { Layout } from './layout';

export const layoutRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./layout').then((m) => m.Layout),
		children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
			{
				path: 'dashboard',
				loadChildren: () => import('../features').then((m) => m.dashboardRoutes)
			},
			{
				path: 'items',
				loadChildren: () => import('../features').then((m) => m.itemRoutes)
			}
		]
	}
];
