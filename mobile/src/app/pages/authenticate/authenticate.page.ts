import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from "../../services/authenticate.service";
import { ToastController } from "@ionic/angular";


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage {

  protected loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthenticateService
  ) {
  }

  login() {
    console.log(this.loginForm.value);


    this.authService.emailLogin(this.loginForm.value)
      .subscribe(
        () => {
          this.presentToast('Přihlášení proběhlo úspěšně');
          this.router.navigate(['/tasks']);
        },
        () => this.presentToast('Chybný uživatelský email nebo heslo')
      );
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}


