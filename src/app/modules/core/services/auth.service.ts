import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  GetUserResponse,
  PostUser,
  PostUserResponse,
  User,
  UserLoginData,
} from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = new BehaviorSubject<User | null>(null);
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public login(userData: UserLoginData): Observable<User[]> {
    return this.http.get<GetUserResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArray) =>
        userArray.filter(
          (user) =>
            user.username === userData.username &&
            user.password === userData.password,
        ),
      ),
      map((userArray) =>
        userArray.map((user) => new User(user.email, user.username)),
      ),
      tap((userArray) => this.handleAuthentication(userArray)),
    );
  }

  public register(userData: PostUser): Observable<PostUserResponse> {
    return this.http.post<PostUserResponse>(`${this.apiUrl}/users`, userData);
  }

  public autoLogin(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const userData: Pick<GetUserResponse, 'email' | 'username'> = JSON.parse(
        localStorage.getItem('user') as string,
      );

      if (!userData) return;
      const user = new User(userData.email, userData.username);
      this.user.next(user);
    }
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/logowanie']);
    localStorage.removeItem('user');
  }

  public isLoggedIn(): boolean {
    return !!this.user.getValue();
  }

  private handleAuthentication(userArr: User[]): void {
    if (userArr.length == 0) return;
    const user: User = userArr[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/klienci']);
  }
}
