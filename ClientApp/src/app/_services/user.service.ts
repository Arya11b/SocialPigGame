import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users/profile/`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/profile/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/profile/`, user);
    }
  postComment(comment: any) {
    return this.http.post(`${environment.apiUrl}/users/comment/`, comment);
  }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/profile/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/profile/${id}`);
    }
  addFriend(name: any) {
    return this.http.post(`${environment.apiUrl}/users/friends/`, name);
  }
  getFriends() {
    return this.http.get<any[]>(`${environment.apiUrl}/users/friends/`);
  }
  removeFriend(id: number) {
      return this.http.delete(`${environment.apiUrl}/users/friends/${id}`);
  }
  getUserComments(){
      return this.http.get<any[]>(`${environment.apiUrl}/users/comment/`);
  }
}
