import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AirportService {
    private httpClient = inject(HttpClient);

    findAll(): Observable<string[]> {
        const url = 'http://www.angular.at/api/airport';
        return this.httpClient.get<string[]>(url);
    }
}