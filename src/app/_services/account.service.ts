import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthUser, UserToken } from '../_models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  baseUrl = 'https://localhost:7149/api/auth/';
  private currentUser = new BehaviorSubject<UserToken | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(authUser: AuthUser): Observable<any> {
    return this.httpClient
      .post("https://localhost:7149/api/auth/login", authUser, {
        responseType: 'text',
        headers: this.headers,
      })
      .pipe(
        map((token) => {
          if (token) {
            const userToken: UserToken = { username: authUser.username, token };
            localStorage.setItem('userToken', JSON.stringify(userToken));
            this.currentUser.next(userToken);
          }
        })
      );
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('userToken');
  }

  reLogin() {
    const storageUser = localStorage.getItem('userToken');
    if (storageUser) {
      const userToken = JSON.parse(storageUser);
      this.currentUser.next(userToken);
    }
  }

  register() { }
}
