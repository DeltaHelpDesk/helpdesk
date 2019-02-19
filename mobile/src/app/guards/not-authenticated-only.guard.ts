import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from "../services/authenticate.service";


@Injectable({providedIn: 'root'})
export class NotAuthenticatedOnlyGuard implements CanActivate {

  constructor(private authService: AuthenticateService, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return this.authService.isAuthenticated().then(isAuthenticated => {
      if(isAuthenticated) {
        this.router.navigate(['/tasks'])
      }
      return !isAuthenticated
    });
  }
}
