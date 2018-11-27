import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {
  public item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Task Modifications',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Mark As Done',
        },
        {
          text: 'Edit',
        },
        {
          text: 'Delete',
          role: 'destructive',
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
}
