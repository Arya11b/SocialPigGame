import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GameMode} from '../_models';
import {environment} from '../../environments/environment';
import {Rating} from '../_models/rating';
import {Game} from '../_models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  getAllGames() {
    return this.http.get<Game[]>(`${environment.apiUrl}/games/active/`);
  }
  getAllModes() {
    return this.http.get<GameMode[]>(`${environment.apiUrl}/games/modes/`);
  }
  getAllModesRatings() {
    return this.http.get<Rating[]>(`${environment.apiUrl}/games/rating`);
  }
  getModeById(id: number) {
    return this.http.get<GameMode>(`${environment.apiUrl}/games/modes/${id}`);
  }

  registerMode(gameMode: GameMode) {
    return this.http.post(`${environment.apiUrl}/games/modes/`, gameMode);
  }

  updateMode(gameMode: GameMode) {
    return this.http.put(`${environment.apiUrl}/games/modes/${gameMode.id}`, gameMode);
  }

  deleteMode(id: number) {
    return this.http.delete(`${environment.apiUrl}/games/modes/${id}`);
  }
  registerGame(game: Game) {
    return this.http.post(`${environment.apiUrl}/games/active/`, game);
  }
  updateGame(game: any){
    return this.http.put(`${environment.apiUrl}/games/active/${game.id}/`, game);
  }
  getGameById(id: number){
    return this.http.get<Game>(`${environment.apiUrl}/games/active/${id}/`);
  }
  deleteGameById(id: number){
    return this.http.delete(`${environment.apiUrl}/games/active/${id}/`);
  }

}
