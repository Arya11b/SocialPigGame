import { Component, OnInit } from '@angular/core';
import {AlertService, AuthenticationService, GameService, UserService} from '../_services';
import {Game, GameMode, User} from '../_models';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import set = Reflect.set;

@Component({
  selector: 'app-games-hub',
  templateUrl: './games-hub.component.html',
  styleUrls: ['./games-hub.component.scss']
})
export class GamesHubComponent implements OnInit {
  loading = false;
  addedGame = false;
  gameModes : GameMode[];
  games: Game[];
  game: Game;
  users: User[];
  currentUser: User;
  constructor(private gameService: GameService, private alertService: AlertService
              , private authenticationService: AuthenticationService, private userService: UserService
              , private router: Router) { }

  ngOnInit(){
    this.gameService.getAllModes().subscribe(data =>
    this.gameModes = data
    );
    this.userService.getAll().subscribe(x => this.users = x);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getActiveGames();
  }
  addGame(gameMode) {
    this.game = new Game;
    this.game.game_mode = gameMode.id;
    this.loading = true;
    this.gameService.registerGame(this.game).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Game added successfully wait for oppnent', true);
          this.addedGame = true;
          setInterval(this.waitForUser.bind(this), 2000);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  getActiveGames(){
    this.gameService.getAllGames().subscribe(data => {
      this.games = data.filter( d => d.active == true && d.player1 != this.currentUser.id )
    });
  }
  getGameMode(id: number){
    return this.gameModes.find(d => d.id == id);
  }

  getUser(id: number){
    return this.users.find(d => d.id == id);
  }
  waitForUser(){
    this.gameService.getAllGames().subscribe(data => {
      let game = data.find(  d => d.done == false && d.player1 == this.currentUser.id );
      console.log(game);
      if (game.player2) {
        this.router.navigate(['/game/' + game.id + '/']);
      }
    });
  }
}
