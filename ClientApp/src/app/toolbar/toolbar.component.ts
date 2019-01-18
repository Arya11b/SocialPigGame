import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Output() toggleTheme =  new EventEmitter<void>();
  @Output() toggleRtl =  new EventEmitter<void>();
  // god mode defs
  // citiesLists: CitiesList[];
  // superpowersLists: SuperPowersList[];
  constructor() { }

  ngOnInit() {

  }

}
