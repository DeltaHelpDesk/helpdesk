import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from "../services/authenticate.service";


@Injectable({providedIn: 'root'})
export class AuthenticatedOnlyGuard implements CanActivate {

  constructor(private authService: AuthenticateService, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return this.authService.getAuthenticatedUser()
      .then(user => {
        this.authService.user.next(user);
        if (!user) {
          this.router.navigate(['/authenticate'])
        }

        return !!user;
      });
  }
}
