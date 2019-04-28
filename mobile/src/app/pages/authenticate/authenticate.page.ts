import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from "../../services/authenticate.service";
import { MenuController, ToastController } from "@ionic/angular";
import { markFormGroupTouched } from "../../helpers/form.helper";
import { UserService } from "../../services/user.service";


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
    private toastController: ToastController,
    private menuController: MenuController,
    private router: Router,
    private authService: AuthenticateService,
    private userService: UserService
  ) {
  }

  openAbout() {
    this.router.navigate(['/about']);
  }

  login() {
    if (this.loginForm.invalid) {
      markFormGroupTouched(this.loginForm);
      return;
    }

    this.authService.emailLogin(this.loginForm.value)
      .subscribe(
        ({data}) => {
          this.userService.loginEmail(data.loginEmail);
          this.presentToast('Přihlášení proběhlo úspěšně');
          this.router.navigate(['/tasks']);
        },
        () => this.presentToast('Chybný uživatelský email nebo heslo')
      );
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }
}


