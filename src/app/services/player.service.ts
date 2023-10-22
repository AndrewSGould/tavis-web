import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { XblUser } from '../models/xbl-user.model';

const baseUrl = environment.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public xblUser = new BehaviorSubject<XblUser>({ gamertag: '', avatar: '' });
  xblUser$ = this.xblUser.asObservable();

  constructor(private http: HttpClient) {}

  updateProfile(xblUser: XblUser): void {
    this.xblUser.next(xblUser);
  }

  getCompletedGames(id: number): Observable<any> {
    return this.http.get(baseUrl + `player/getCompletedGames?playerId=` + id);
  }
}
