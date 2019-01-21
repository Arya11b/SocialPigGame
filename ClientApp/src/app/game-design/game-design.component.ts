import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Game, GameMode, User} from '../_models';
import {Router} from '@angular/router';
import {AlertService, AuthenticationService, GameService, UserService} from '../_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-game-design',
  templateUrl: './game-design.component.html',
  styleUrls: ['./game-design.component.scss']
})
export class GameDesignComponent implements OnInit {
  designForm = new FormGroup({});
  loading = false;
  submitted = false;
  // migrate to all users page
  currentUser: User;
  gameMode: GameMode;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private gameService: GameService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.gameMode = new GameMode;
  }

  disableSubmit(): boolean {
    return this.designForm.invalid;
  }
  onSubmit() {
    // console.log(this.selectedFile.src);
    this.gameMode.name = this.designForm.value.name;
    this.gameMode.death_dice = this.designForm.value.death_dice;
    this.gameMode.max_score = this.designForm.value.max_score;
    this.gameMode.dice_count = this.designForm.value.dice_count;
    this.gameMode.max_dice_role = this.designForm.value.max_dice_role;

    this.gameService.registerMode(this.gameMode).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Game Mode added successfully', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

}
