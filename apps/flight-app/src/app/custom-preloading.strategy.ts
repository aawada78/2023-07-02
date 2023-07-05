import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {

    preload(route: Route, fn: () => Observable<any>): Observable<any> {

        if(route.data && route.data['preloading']) {
            const preloading = route.data['preloading'];
            const currentDay = new Date().getDate();

            if(preloading.preload && currentDay >= preloading.startDay) {
                return fn();
            }
        }
        
        return of(null);
    }

}