import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';
import { Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  destroyRef = inject(DestroyRef);
  

  get airports$(): Observable<string[]> {
    return of(this.airports);
  } 
  
  ngOnInit(): void {
    this.airportService.findAll().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: airports => this.airports = airports 
    })
  }
}
