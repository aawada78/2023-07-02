import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'flight-workspace-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe]
})
export class AirportComponent implements OnInit {
  airports: string[] = [];
  private airportService = inject(AirportService);
  

  get airports$(): Observable<string[]> {
    return of(this.airports);
  } 
  
  ngOnInit(): void {
    this.airportService.findAll().subscribe({
      next: airports => this.airports = airports 
    })
  }
}
