import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Seznam tasků',
      url: '/tasks',
      icon: 'list'
    },
    {
      title: 'Vytvořit task',
      url: '/tasks/create',
      icon: 'add'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toastController: ToastController,
    public userService: UserService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  async logout() {
    await this.userService.logout();
    this.presentToast('Odhlášení proběhlo úspěšně');
    this.router.navigate(['/authenticate']);
  }
}
