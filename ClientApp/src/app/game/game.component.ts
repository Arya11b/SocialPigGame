import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, GameService, UserService} from '../_services';
import {Game, GameMode, User} from '../_models';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  loading = false;
  game: Game;
  player1: User;
  player2: User;
  id = 0;
  currentUser: User;
  dice = [2,2];
  gameMode: GameMode;
  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService
  , private gameService: GameService, private alertService: AlertService,
              private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.player1 = new User;
    this.player2 = new User;
    this.game = new Game;
    this.gameMode = new GameMode;
    this.id = this.route.snapshot.params['id'];
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.gameService.getGameById(this.id).subscribe(data => {
      this.game = data;
      if(this.currentUser.id != this.game.player1) {
        this.addPlayer2();
      }
      else if (this.game.player2 && this.game.player1 != this.currentUser.id){
        this.router.navigate(['/gamehub']);
      }
      this.userService.getById(this.game.player1).subscribe(x => this.player1 = x);
      this.userService.getById(this.game.player2).subscribe(x => this.player2 = x);
    });
    setInterval(this.getDiceNo.bind(this), 700);
  }
  getGame(){
    this.gameService.getGameById(this.game.id).subscribe(x => this.game = x);
  }
  addPlayer2() {
    this.gameService.updateGame({id: this.game.id, player2: this.currentUser.id , log: 0}).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('game reval', true);
          this.userService.getById(this.currentUser.id).subscribe(x => this.player2 = x);
          this.getDiceNo();

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  roll(){
    if(this.currentUser.id == this.game.player1) {
      // console.log('this');
      this.gameService.updateGame({id: this.game.id, log: 1}).pipe(first())
        .subscribe(
          data => {
            // this.alertService.success('game reval', true);
            this.getDiceNo();

          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
    if(this.currentUser.id == this.game.player2) {
      // console.log('that');
      this.gameService.updateGame({id: this.game.id, log: 2}).pipe(first())
        .subscribe(
          data => {
            // this.alertService.success('game dice rolled', true);
            this.getDiceNo();
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }

  }

  hold(){
    if(this.currentUser.id == this.game.player1) {
      // console.log('this');
      this.gameService.updateGame({id: this.game.id, log: 3}).pipe(first())
        .subscribe(
          data => {
            this.getDiceNo();
            // console.log(this.game);

          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
    if(this.currentUser.id == this.game.player2) {
      // console.log('that');
      this.gameService.updateGame({id: this.game.id, log: 4}).pipe(first())
        .subscribe(
          data => {
            this.getDiceNo();

          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }

  }
  isturn(){
    if ( +this.game.log == this.isPlayer()) return true;
    return false;
  }
  winner(){
    return this.isPlayer() + 2 === +this.game.log;
  }
  name1(){
    if(+this.game.log === 3) return "winner";
    return this.player1.username;
  }

  name2(){
    if(+this.game.log === 4) return "winner";
    return this.player2.username;
  }
  getDiceNo(){
    this.gameService.getGameById(this.game.id).subscribe(
      x=> {
        this.game = x;
        let s = this.game.dice.replace(/[\[]/,'').replace(/[\]]/,'');
        this.dice[0] = +s[0];
        this.dice[1] = +s[3];
        this.gameService.getModeById(this.game.game_mode).subscribe(x => this.gameMode = x);

        // console.log(s);
      }
    );
  }
  isPlayer(){
    return this.currentUser.id == this.game.player1 ? 1 : 2 ;
  }
  moreThanOne(): boolean{
    // console.log(this.gameMode.dice_count > 1);
    return this.gameMode.dice_count > 1;
  }

}
