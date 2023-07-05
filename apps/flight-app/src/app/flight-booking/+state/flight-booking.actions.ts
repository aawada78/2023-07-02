import { Flight } from '@flight-workspace/flight-lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FlightBookingActions = createActionGroup({
  source: 'FlightBooking',
  events: {
    'FlightsLoaded': props<{ flights: Flight[] }>(),   
    'LoadFlights': props<{ from: string, to: string, urgent: boolean }>(),   
    'UpdateFlight': props<{flight: Flight}>()
  }
});
