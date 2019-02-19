import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticateService } from "./services/authenticate.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
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

  protected isAuthenticated = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    protected authService: AuthenticateService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/authenticate']);
  }
}
