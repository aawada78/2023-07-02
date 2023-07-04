import {Component, OnInit, inject} from '@angular/core';
import {Flight, FlightService} from '@flight-workspace/flight-lib';
import { Observable, of } from 'rxjs';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { FlightBookingActions } from '../+state/flight-booking.actions';
import { flightsBlacklistedSelector, flightsSelector } from '../+state/flight-booking.selectors';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // get flights() {
  //   return this.flightService.flights;
  // }

  flights$: Observable<Flight[]> = of([]);

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  private store = inject<Store<FlightBookingAppState>>(Store);

  constructor(
    // private store: Store<FlightBookingAppState>,
    private flightService: FlightService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.flights$ = this.store.select(tree => tree.flightBooking.flights);
    // this.flights$ = this.store.select(flightsSelector);
    this.flights$ = this.store.select(flightsBlacklistedSelector);
;  }

  search(): void {
    if (!this.from || !this.to) return;

    // this.flightService
    //   .load(this.from, this.to, this.urgent);

    // this.flightService.find(this.from, this.to, this.urgent).subscribe({
    //   next: flights => this.store.dispatch(FlightBookingActions.flightsLoaded({ flights }))
    // })

    this.store.dispatch(FlightBookingActions.loadFlights({ from: this.from, to: this.to, urgent: this.urgent }))
  }

  delay(): void {
    this.flightService.delay();
  }

}
