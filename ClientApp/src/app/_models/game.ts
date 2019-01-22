import {User} from './user';

export class Game {
  id: number;
  log: string;
  player1_score : number;
  player2_score : number;
  player1_cscore : number;
  player2_cscore : number;
  date: string;
  player1 : number;
  player2 : number;
  game_mode : number;
  done: boolean;
  active: boolean;
  dice: string = '[]';
}
