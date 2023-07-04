import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { FlightBookingActions } from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';

@Injectable()
export class FlightBookingEffects {

    private flightService = inject(FlightService);

    loadFlights$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(FlightBookingActions.loadFlights),
            //   tap(() => FlightBookingActions.startLoading({ loading: true }))
            switchMap(action => this.flightService.find(action.from, action.to, action.urgent)),
            //   tap(() => FlightBookingActions.startLoading({ loading: false }))
            map(flights => FlightBookingActions.flightsLoaded({ flights }))
        );
    });

    constructor(private actions$: Actions) { }
}
