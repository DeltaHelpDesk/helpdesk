import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage {

  items: any = [
    {date: "10. 11. 2018", name: "Jana Stopková", assignTo: "Josef Hájek", description: "Lorem ipsum dolor sit amet..."},
    {date: "11. 11. 2018", name: "Jana Stopková", assignTo: "Josef Hájek", description: "Looreem iipsuum dooloor siit aameet..."},
    {date: "12. 11. 2018", name: "Jana Stopková", assignTo: "Josef Hájek", description: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."}
  ];

  constructor() { }

}
