import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FlightBookingComponent } from './flight-booking.component';
import { FLIGHT_BOOKING_ROUTES } from './flight-booking.routes';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { StoreModule } from '@ngrx/store';
import * as fromFlightBooking from './+state/flight-booking.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FlightBookingEffects } from './+state/flight-booking.effects';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';


export const loader = ['de', 'en'].reduce((acc: any, lang) => {
  acc[lang] = () => import(`./assets/i18n/${lang}.json`);
  return acc;
}, {});

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule.forChild(),
    RouterModule.forChild(FLIGHT_BOOKING_ROUTES),
    StoreModule.forFeature(fromFlightBooking.flightBookingFeatureKey, fromFlightBooking.reducer),
    EffectsModule.forFeature([FlightBookingEffects]),
    TranslocoModule,
    TranslocoMessageFormatModule
  ],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent,
    FlightEditComponent,
    FlightBookingComponent,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'flightbooking',
        loader
      }
    }
  ],
  exports: [FlightSearchComponent],
})
export class FlightBookingModule {}
