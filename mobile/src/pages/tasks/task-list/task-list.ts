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
  public items;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      {date: "10. 11. 2018", name: "Jana Stopková", assignTo: "Josef Hájek", description: "Lorem ipsum dolor sit amet..."},
      {date: "11. 11. 2018", name: "Jana Stopková", assignTo: "Josef Hájek", description: "Looreem iipsuum dooloor siit aameet..."},
      {date: "12. 11. 2018", name: "Jana Stopková", assignTo: "Josef Hájek", description: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."}
    ];
  }

  openPage(pageName, item) {
    this.navCtrl.push(pageName, { item });
  }

}
