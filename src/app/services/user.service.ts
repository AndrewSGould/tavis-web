import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { XblUser } from '../models/xbl-user.model';
import { User } from '../models/user.model';

const baseUrl = environment.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public xblUser = new BehaviorSubject<XblUser>({ gamertag: '', avatar: '' });
  xblUser$ = this.xblUser.asObservable();

  public user = new BehaviorSubject<User>({ roles: [] });
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  updateProfile(xblUser: XblUser): void {
    this.xblUser.next(xblUser);
  }

  updateUser(user: User): void {
    this.user.next(user);
  }

  updateUserRoles(newRoles: string[]): void {
    // TODO: update localstorage too
    const updatedUser = { ...this.user.value, roles: newRoles };
    this.user.next(updatedUser);
  }

  fetchRoles(): Observable<any> {
    return this.http.get(baseUrl + `user/getRoles`);
  }
}
