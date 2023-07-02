import { Routes } from '@angular/router';

export const PASSENGER_ROUTES: Routes = [
    {
      path: '',
      redirectTo: 'passenger',
      pathMatch: 'full'
    },
    {
      path: 'passenger',
      loadChildren: () => import('./passenger/passenger.module')
        .then(esm => esm.PassengerModule)
    }
  ];