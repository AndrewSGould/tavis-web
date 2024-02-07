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

  saveWriteIn(writeIn: any): Observable<any> {
    return this.http.post(baseUrl + `yearly/save-writein`, writeIn);
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

  syncLastMonthsCompletions(): Observable<any> {
    return this.http.get(baseUrl + `datasync/lastmonthscompletions`);
  }

  produceStatReport(): Observable<any> {
    return this.http.get(baseUrl + `bcm/produceStatReport`);
  }

  recalcBcmLeaderboard(): Observable<any> {
    return this.http.post(baseUrl + `stats/recalcBcmLeaderboard`, {});
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
