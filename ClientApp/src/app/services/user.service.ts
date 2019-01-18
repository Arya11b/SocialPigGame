import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8000/api/users/profile/';
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
      this.http.post(this.url, user).subscribe(
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
  // updateUser(id: number, user: User) {
  //   console.log(user);
  //   const userIdUrl = this.url + '/' + user.id;

  //   console.log(userIdUrl);
  //   return new Promise((resolver, reject) => {
  //     this.http.put(userIdUrl, user).subscribe(
  //       user => {
  //         console.log(user);
  //         this.http.get<User[]>(this.url)
  //           .subscribe(
  //             data => {
  //               this.dataStore.users = data;
  //               this._Users.next(Object.assign({}, this.dataStore).users);
  //             }, error => {
  //               console.log(console.log(error));
  //             });
  //       }
  //     );
  //     resolver(user);
  //   }
  //   );
  // }
  // // delete request
  // deleteUser(user: User) {
  //   console.log(user);
  //   const usersUrlDel = this.url + '/' + user.id;
  //   return new Promise((resolver, reject) => {
  //     this.http.delete(usersUrlDel).subscribe(
  //       user => {
  //         this.http.get<User[]>(this.url)
  //           .subscribe(
  //             data => {
  //               this.dataStore.users = data;
  //               this._Users.next(Object.assign({}, this.dataStore).users);
  //             }, error => {
  //               console.log(console.log(error));
  //             });
  //       }
  //     );
  //     resolver(user);
  //   }
  //   );
  // }
  // fetch Datas
  getUser(id) {
    console.log(this.url + id);
    console.log('barboora');
    return this.http.get<any>(this.url + id)
      .subscribe(data => {
      console.log('barboora');
      console.log(data);
      this.dataStore = [data];
      this._Users.next(Object.assign({}, this).dataStore);
    }, error => {
      console.log(error);
    });
    // return this.http.get<User>(this.url + '/' + id).pipe(
    //   map((user: User) => user)
    // );
  }
  getUsers() {
    return this.http.get<any[]>(this.url)
      .subscribe(data => {
        this.dataStore = data;
        this._Users.next(Object.assign({}, this).dataStore);
      }, error => {
        console.log(error);
      });
  }

  // observables
  get userSet() {
    return this.dataStore;
  }
  getOUsers(): Observable<any[]> {
    return this._Users.asObservable();
  }
}
