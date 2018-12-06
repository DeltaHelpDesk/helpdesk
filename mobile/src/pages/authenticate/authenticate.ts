import { Component } from '@angular/core';
import { ActionSheetController, IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { Office365Provider } from "../../providers/office365.provider";

enum LoginType {
  office365,
  email
}

@IonicPage()
@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html',
})
export class AuthenticatePage {
  loginType: LoginType = LoginType.office365;
  loginTypes = LoginType;

  emailLoginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public actionSheetCtrl: ActionSheetController,
    public office365Provider: Office365Provider
  ) {
    this.initForm();
  }

  initForm() {
    this.emailLoginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  changeLoginTypeActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'CHANGE_LOGIN_TYPE',
      buttons: [
        {
          text: 'OFFICE365',
          icon: 'logo-windows',
          handler: () => {
            this.loginType = LoginType.office365;
          }
        },{
          text: 'EMAIL',
          icon: 'contact',
          handler: () => {
            this.loginType = LoginType.email;
          }
        },{
          text: 'CLOSE',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  loginOffice365() {
    this.office365Provider.login();
  }

  submitEmailLoginForm() {
    if(this.emailLoginForm.invalid) {
      _.forEach(this.emailLoginForm.controls, control => control.markAsTouched());
      return;
    }

    console.log(this.emailLoginForm.value)

    // TODO: Login service
  }
}
