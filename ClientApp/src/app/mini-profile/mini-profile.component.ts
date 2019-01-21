import {Component, Input, OnInit} from '@angular/core';
import {User} from '../_models';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.scss']
})
export class MiniProfileComponent implements OnInit {
  @Input() currentUser: User;
  constructor() { }

  ngOnInit() {
    console.log(this.currentUser);
  }

}
