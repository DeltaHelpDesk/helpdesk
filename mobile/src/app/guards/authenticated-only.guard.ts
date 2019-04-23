import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from "../services/authenticate.service";
import { UserService } from "../services/user.service";


@Injectable({providedIn: 'root'})
export class AuthenticatedOnlyGuard implements CanActivate {

  constructor(private authService: AuthenticateService, private userService: UserService, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return this.authService.getAuthenticatedUser()
      .then(user => {
        this.userService.user.next(user);
        if (!user) {
          this.router.navigate(['/authenticate'])
        }

        return !!user;
      });
  }
}
