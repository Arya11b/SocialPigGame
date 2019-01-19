import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getUserComment() {
    return this.http.get<any[]>(`${environment.apiUrl}/users/comment/`);
  }

  getUserCommentById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/comment/${id}/`);
  }
  getGameComment() {
    return this.http.get<any[]>(`${environment.apiUrl}/games/gcomment/`);
  }

  getGameCommentById(id: number) {
    return this.http.get(`${environment.apiUrl}/games/gcomment/${id}/`);
  }
  getGameModeComment() {
    return this.http.get<any[]>(`${environment.apiUrl}/games/comment/`);
  }

  getGameModeCommentById(id: number) {
    return this.http.get(`${environment.apiUrl}/games/comment/${id}/`);
  }

  addUserComment(comment: any) {
    return this.http.post(`${environment.apiUrl}/users/comment/`, comment);
  }
  addGameComment(comment: any) {
    return this.http.post(`${environment.apiUrl}/games/gcomment/`, comment);
  }
  addModeComment(comment: any) {
    return this.http.post(`${environment.apiUrl}/games/comment/`, comment);
  }

  updateGameComment(comment: any) {
    return this.http.put(`${environment.apiUrl}/games/gcomment/${comment.id}/`, comment);
  }
  updateModeComment(comment: any) {
    return this.http.put(`${environment.apiUrl}/games/comment/${comment.id}/`, comment);
  }
  updateUserComment(comment: any) {
    return this.http.put(`${environment.apiUrl}/users/comment/${comment.id}/`, comment);
  }

  deleteGameComment(id: number) {
    return this.http.delete(`${environment.apiUrl}/games/gcomment/${id}/`);
  }
  deleteModeComment(id: number) {
    return this.http.delete(`${environment.apiUrl}/games/comment/${id}/`);
  }
  deleteUserComment(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/comment/${id}/`);
  }
}
