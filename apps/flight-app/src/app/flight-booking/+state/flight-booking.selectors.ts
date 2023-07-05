import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);


export const flightsSelector = createSelector(selectFlightBookingState, (s) => s.flights);
export const blackListSelector = createSelector(selectFlightBookingState, (s) => s.blackList);

export const flightsBlacklistedSelector = createSelector(
  flightsSelector,
  blackListSelector,
  (flights, blacklist) => flights.filter(f => !blacklist.includes(f.id))
)
