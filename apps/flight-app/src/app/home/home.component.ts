/* eslint-disable no-restricted-syntax */
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean> | undefined;
  _userName = '';

  get userName(): string {
    // return this._userName;
    return this.authService.userName;
  }

  private authService = inject(AuthService);

  constructor(private route: ActivatedRoute) {}

  changed($event: CustomEvent): void {
    console.debug('$event.detail ', $event.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit() {
    this.needsLogin$ = this.route.params.pipe(
      map((params) => !!params['needsLogin'])
    );
  }

  login(): void {
    // this._userName = 'Login will be implemented in another exercise!';
    this.authService.login();
  }

  logout(): void {
    // this._userName = '';
    this.authService.logout();
  }
}
