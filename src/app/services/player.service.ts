import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  getCompletedGames(id: number): Observable<any> {
    return this.http.get(baseUrl + `player/getCompletedGames?playerId=` + id);
  }
}
