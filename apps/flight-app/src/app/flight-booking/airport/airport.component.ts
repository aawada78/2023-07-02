import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AirportService } from '@flight-workspace/flight-lib';

@Component({
  selector: 'flight-workspace-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class AirportComponent implements OnInit {
  airports: string[] = [];
  private airportService = inject(AirportService);
  
  
  ngOnInit(): void {
    this.airportService.findAll().subscribe({
      next: airports => this.airports = airports 
    })
  }
}
