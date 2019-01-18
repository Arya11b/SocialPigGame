import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  profileUrl = 'http://localhost:8000/api/users/profile/';
  commentUrl = 'http://localhost:8000/api/users/comment/';
  private dataStore: any[];
  _Users: BehaviorSubject<any[]>;
  constructor(private http: HttpClient) {
    this.dataStore = [];
    this._Users = new BehaviorSubject<any[]>([]);
  }
  // post request
  postUser(user: any): Promise<any> {
    return new Promise((resolver, reject) => {
      this.dataStore.push(user);
      this.http.post(this.profileUrl, user).subscribe(
        user => {
          this._Users.next(Object.assign({}, this).dataStore);
          console.log(user);
        }
      );
      resolver(user);
    }
    );
  }
  // // put request
  // updateUser(id: number, author: User) {
  //   console.log(author);
  //   const userIdUrl = this.profileUrl + '/' + author.id;

  //   console.log(userIdUrl);
  //   return new Promise((resolver, reject) => {
  //     this.http.put(userIdUrl, author).subscribe(
  //       author => {
  //         console.log(author);
  //         this.http.get<User[]>(this.profileUrl)
  //           .subscribe(
  //             data => {
  //               this.dataStore.users = data;
  //               this._Users.next(Object.assign({}, this.dataStore).users);
  //             }, error => {
  //               console.log(console.log(error));
  //             });
  //       }
  //     );
  //     resolver(author);
  //   }
  //   );
  // }
  // // delete request
  // deleteUser(author: User) {
  //   console.log(author);
  //   const usersUrlDel = this.profileUrl + '/' + author.id;
  //   return new Promise((resolver, reject) => {
  //     this.http.delete(usersUrlDel).subscribe(
  //       author => {
  //         this.http.get<User[]>(this.profileUrl)
  //           .subscribe(
  //             data => {
  //               this.dataStore.users = data;
  //               this._Users.next(Object.assign({}, this.dataStore).users);
  //             }, error => {
  //               console.log(console.log(error));
  //             });
  //       }
  //     );
  //     resolver(author);
  //   }
  //   );
  // }
  // fetch Datas
  getUser(id) {
    console.log(this.profileUrl + id);
    console.log('barboora');
    return this.http.get<any>(this.profileUrl + id);
  }
  getUsers() {
    return this.http.get<any[]>(this.profileUrl);
  }
  getUserComments(id) {
    return this.http.get<any[]>(this.commentUrl);
  }

  // observables
  get userSet() {
    return this.dataStore;
  }
  getOUsers(): Observable<any[]> {
    return this._Users.asObservable();
  }
}
