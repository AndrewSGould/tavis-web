import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { XblUser } from '../models/xbl-user.model';

const baseUrl = environment.api.baseUrl;
const oxblAppKey = environment.oxblApiKey;

@Injectable({
  providedIn: 'root',
})
export class OpenXblService {
  xblUser: XblUser | undefined = undefined;
  isConnected: boolean = false;

  constructor(private http: HttpClient) {}

  connect(code: string): any {
    return this.http
      .post(baseUrl + `openxbl/connect`, {
        code,
        app_key: oxblAppKey,
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.xblUser = response;
          this.isConnected = true;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  getUser(): any {
    return this.http.get(baseUrl + 'openxbl/user');
  }
}
