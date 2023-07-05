import { FlightCancellingModule } from './flight-booking/flight-cancelling/flight-cancelling.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FlightLibModule } from '@flight-workspace/flight-lib';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BasketComponent } from './basket/basket.component';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { EffectsModule } from '@ngrx/effects';
import { CustomPreloadingStrategy } from './custom-preloading.strategy';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    // FlightBookingModule,

    BrowserAnimationsModule,
    FlightCancellingModule,

    FlightLibModule.forRoot(),
    SharedModule.forRoot(),
    // RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules }),
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: CustomPreloadingStrategy }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    OAuthModule.forRoot()
    TranslocoRootModule
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
