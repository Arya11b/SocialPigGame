import {Component, Input, OnInit} from '@angular/core';
import {GameMode} from '../_models';

@Component({
  selector: 'app-mini-gamemode',
  templateUrl: './mini-gamemode.component.html',
  styleUrls: ['./mini-gamemode.component.scss']
})
export class MiniGamemodeComponent implements OnInit {
  @Input() gameMode: GameMode;
  constructor() { }

  ngOnInit() {
  }

}
