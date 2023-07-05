import { createFeature, createReducer, on } from '@ngrx/store';
import { FlightBookingActions } from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[],
  blackList: number[]
}

export interface FlightBookingAppState {
  flightBooking: State
}

export const initialState: State = {
  flights: [],
  blackList: [1,2,3, 4]
};

export const reducer = createReducer(
  initialState,
  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  }),
  on(FlightBookingActions.updateFlight, (state, action) => {
    const flight = action.flight;
    const flights = state.flights.map(f => f.id === flight.id? flight: f);
    return { ...state, flights };
  })

);

export const flightBookingFeature = createFeature({
  name: flightBookingFeatureKey,
  reducer,
});

