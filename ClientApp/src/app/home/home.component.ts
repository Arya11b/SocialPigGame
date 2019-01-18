import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuComponent} from "../menu/menu.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }
  get homeText() {
    return 'this is home';
  }

}
