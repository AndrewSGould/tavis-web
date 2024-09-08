import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const baseUrl = environment.api.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class TavisService {
  constructor(private http: HttpClient) {}

  fullSync(): Observable<any> {
    return this.http.get(baseUrl + `datasync/full`);
  }

  rgscSync(): Observable<any> {
    return this.http.get(baseUrl + `datasync/rgsc`);
  }

  syncInfo(): Observable<any> {
    return this.http.get(baseUrl + `datasync/syncInfo`);
  }

  rollRandom(
    selectedPlayer: string | null,
    selectedGameId: number | null
  ): Observable<any> {
    return this.http.post(baseUrl + `rgsc/rollRandom`, {
      selectedPlayer,
      selectedGameId,
    });
  }

  getYearlies(player: string): Observable<any> {
    return this.http.get(baseUrl + `yearly/challenges?player=${player}`);
  }

  getYearlyOptions(player: string, id: number): Observable<any> {
    return this.http.get(
      baseUrl + `yearly/options?player=${player}&yearlyId=${id}`
    );
  }

  getJanRecap(): Observable<any> {
    return this.http.get(baseUrl + `monthly/jan-leaderboard`);
  }

  getJunRecap(): Observable<any> {
    return this.http.get(baseUrl + `monthly/jun-leaderboard`);
  }

  getJulRecap(): Observable<any> {
    return this.http.get(baseUrl + `monthly/jul-leaderboard`);
  }

  getAprRecap(): Observable<any> {
    return this.http.get(baseUrl + `monthly/apr-leaderboard`);
  }

  getAugRecap(): Observable<any> {
    return this.http.get(baseUrl + `v2/bcm/august/leaderboard`);
  }

  getSepRecap(): Observable<any> {
    return this.http.get(baseUrl + `v2/bcm/september/leaderboard`);
  }

  getFebRecap(): Observable<any> {
    return this.http.get(baseUrl + `monthly/feb-leaderboard`);
  }

  getMarRecap(): Observable<any> {
    return this.http.get(baseUrl + `monthly/mar-leaderboard`);
  }

  saveAutomatedGame(submission: any): Observable<any> {
    return this.http.post(baseUrl + `yearly/save-automatedgame`, submission);
  }

  saveWriteIn(submission: any): Observable<any> {
    return this.http.post(baseUrl + `yearly/save-writein`, submission);
  }

  getBcmPlayerList(): Observable<any> {
    return this.http.get(baseUrl + `bcm/getPlayerList`);
  }

  updateGameInfo(): Observable<any> {
    return this.http.get(baseUrl + `datasync/testSyncGameInfo`);
  }

  testGwgParse(): Observable<any> {
    return this.http.get(baseUrl + `datasync/testGwgParse`);
  }

  shallowSync(): Observable<any> {
    return this.http.get(baseUrl + `datasync/shallow`);
  }

  produceStatReport(): Observable<any> {
    return this.http.get(baseUrl + `bcm/produceStatReport`);
  }

  recalcBcmLeaderboard(): Observable<any> {
    return this.http.post(baseUrl + `stats/recalcBcmLeaderboard`, {});
  }

  calcMonthlyBonus(): Observable<any> {
    return this.http.post(baseUrl + `v2/bcm/september/calc`, {});
    //return this.http.post(baseUrl + `stats/calcMonthlyBonus`, {});
  }

  getPlayerRgscs(player: string): Observable<any> {
    return this.http.get(baseUrl + `rgsc/getPlayersGames?player=${player}`);
  }

  unique14chars(): Observable<any> {
    return this.http.get(baseUrl + `bcm/unique14chars`);
  }

  getAvailableRegions(): Observable<any> {
    return this.http.get(baseUrl + `user/availableRegions`);
  }

  getAvailableAreas(region: string): Observable<any> {
    return this.http.get(
      baseUrl + `user/availableAreas?selectedRegion=` + region
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
