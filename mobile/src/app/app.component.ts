import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticateService } from "./services/authenticate.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Create Task',
      url: '/tasks/create',
      icon: 'add'
    },
    {
      title: 'Task List',
      url: '/tasks',
      icon: 'list'
    },
    {
      title: 'Device List',
      url: '/devices',
      icon: 'tv'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    protected authService: AuthenticateService,
    private toastController: ToastController
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
      duration: 2000
    });
    toast.present();
  }

  async logout() {
    await this.authService.logout();
    this.presentToast('Odhlášení proběhlo úspěšně');
    this.router.navigate(['/authenticate']);
  }
}
