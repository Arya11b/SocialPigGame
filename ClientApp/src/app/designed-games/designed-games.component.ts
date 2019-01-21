import { Component, OnInit } from '@angular/core';
import {GameService} from '../_services';
import {GameMode} from '../_models';

@Component({
  selector: 'app-designed-games',
  templateUrl: './designed-games.component.html',
  styleUrls: ['./designed-games.component.scss']
})
export class DesignedGamesComponent implements OnInit {
  gameModes: GameMode[];
  constructor(private gameService: GameService) { }

  ngOnInit() {
  this.getGameModes();
  }
  getGameModes(){
    this.gameService.getAllModes().subscribe(data =>
      this.gameModes = data
    );
  }

}
