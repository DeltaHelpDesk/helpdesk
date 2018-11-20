import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  public test;
  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = [{date: "10.11.2018", description: "Lorem ipsum dolor sit amet..."}, {date: "11.11.2018", description: "Looreem iipsuum dooloor siit aameet..."}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }
}
