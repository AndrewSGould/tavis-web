import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';
import { environment } from '../../environments/environment';

const baseUrl = environment.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class BcmService {
  constructor(private http: HttpClient) {}

  getBcmLeaderboardList(): Observable<any> {
    return this.http.get(baseUrl + `bcm/getBcmLeaderboardList`);
  }

  getBcmPlayer(player: string): Observable<any> {
    return this.http.get(baseUrl + `bcm/getBcmPlayer?player=` + player);
  }

  getPlayersGenres(player: string): Observable<any> {
    return this.http.get(baseUrl + `bcm/getPlayersGenres?player=` + player);
  }

  getBcmPlayerWithGames(player: string): Observable<any> {
    return this.http.get(
      baseUrl + `bcm/getBcmPlayerWithGames?player=` + player
    );
  }

  getAbcSummary(player: string): Observable<any> {
    return this.http.get(baseUrl + `bcm/player/abcSummary?player=` + player);
  }

  getOddjobSummary(player: string): Observable<any> {
    return this.http.get(baseUrl + `bcm/player/oddjobSummary?player=` + player);
  }

  getRgscSummary(player: string): Observable<any> {
    return this.http.get(baseUrl + `rgsc/user-summary?player=` + player);
  }

  postBcmRegistration(): Observable<any> {
    return this.http.post(baseUrl + `bcm/registerUser`, {});
  }
}
