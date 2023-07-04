import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import {loadRemoteModule} from '@angular-architects/module-federation';
import { PassengerMF } from './passengerMF';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  // {
  //   path: 'passengerMF',
  //   loadChildren: () => import('passenger/Module').then(m => m.PassengerModule)
  // },
  {
    path: 'passengerMF',
    loadChildren: () => loadRemoteModule<PassengerMF>({
      type: 'module',
      remoteEntry: 'http://localhost:4204/passengerRE.js',
      exposedModule: './Module'
    }).then(m => m.PassengerModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

