import { Component, OnInit } from '@angular/core';
import {GameService} from '../_services';

@Component({
  selector: 'app-best-game-modes',
  templateUrl: './best-game-modes.component.html',
  styleUrls: ['./best-game-modes.component.scss']
})
export class BestGameModesComponent implements OnInit {

  constructor(private gameService: GameService) { }
  modeRates: {name: string, rate: number}[] = [];
  newModeRates: {name: string, rate: number}[] = [];
  modeCount: {name: string, count: number}[] = [];
  ngOnInit() {
    this.getRatings();
    this.getCount();
    this.getNewRatings();
  }
  private getRatings(){
    this.gameService.getAllModesRatings().subscribe(rates =>{
      this.gameService.getAllModes().subscribe( modes =>{
        for ( let mode of modes) {
          console.log(mode.name);
          let rate = rates.filter(r => r.game_mode === mode.id).map(r => r.rate)
          this.modeRates.push( {name: mode.name , rate: rate.reduce((sum,current) => sum + current)/ rate.length} );
          this.modeRates = this.modeRates.sort((a,b) => a.rate > b.rate ? -1 : a.rate < b.rate ? 1 : 0);
        }
      });
    });
  }
  private getCount(){
    this.gameService.getAllGames().subscribe(games =>{
      this.gameService.getAllModes().subscribe( modes =>{
        console.log(games);
        for ( let mode of modes) {
          console.log(mode.name);
          let gamesCount = games.filter(r => r.game_mode === mode.id).length;
          this.modeCount.push( {name: mode.name , count: gamesCount} );
          this.modeCount = this.modeCount.sort((a,b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0);
        }
      });
    });
  }
  private getNewRatings(){
    this.gameService.getAllModesRatings().subscribe(rates =>{
      this.gameService.getAllModes().subscribe( modes =>{
        let newModes = modes.filter(m => Date.now() - Date.parse(m.date) < 86400000);
        for ( let mode of newModes) {
          console.log(mode.name);
          let rate = rates.filter(r => r.game_mode === mode.id).map(r => r.rate)
          this.newModeRates.push( {name: mode.name , rate: rate.reduce((sum,current) => sum + current)/ rate.length} );
          this.newModeRates = this.modeRates.sort((a,b) => a.rate > b.rate ? -1 : a.rate < b.rate ? 1 : 0);
        }
      });
    });
  }

}
