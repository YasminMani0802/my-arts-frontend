import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';

import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private utility: UtilityService, private router: Router) {
  }

  allowedToResetPassword: boolean = false;

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.utility.isLoggedIn$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap((authenticated => {
        if (authenticated === false)
          this.router.navigate(['/']);
      }))
    );
  }
}
