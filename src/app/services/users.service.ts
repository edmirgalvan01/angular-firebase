import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'https://despre-db-52d3e-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  createUser(user: UserModel) {
    return this.http.post(`${this.url}/users.json`, user).pipe(
      map((res: any) => {
        user.id = res.name;
        return user;
      })
    );
  }

  updateUser(user: UserModel) {
    const userCopy = { ...user };
    const { id, ...aux } = userCopy;

    return this.http.put(`${this.url}/users/${user.id}.json`, aux);
  }

  getUser(id: string) {
    return this.http.get(`${this.url}/users/${id}.json`).pipe(
      map((res: any) => {
        const user: UserModel = res;
        return user;
      })
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/users/${id}.json`);
  }

  showUsers() {
    return this.http.get(`${this.url}/users.json`).pipe(map(this.createArray));
  }

  createArray(userObject: Object) {
    if (userObject === null) {
      return [];
    }

    const ids = Object.keys(userObject);
    const data = Object.values(userObject);

    data.forEach((key, value) => {
      key.id = ids[value];
    });

    return data;
  }
}
