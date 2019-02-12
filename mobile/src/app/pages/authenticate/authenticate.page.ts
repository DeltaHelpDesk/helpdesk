import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from "../../services/authenticate.service";


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticateService
  ) {
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.emailLogin(this.loginForm.value)
      .subscribe(
        data => console.log('da', data),
        error => console.error('err', error)
      );
    // this.router.navigate(['/tasks']);


  }
}


