import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/models/authenticated-response.model';
import { DiscordAuth } from 'src/app/models/discord-auth.model';
import { XblUser } from 'src/app/models/xbl-user.model';
import { PlayerService } from 'src/app/services/player.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  discordSignin: string = environment.discordSignin;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private playerService: PlayerService
  ) {
    this.route = route;
    this.http = http;
    this.playerService = playerService;
  }

  ngOnInit(): void {
    // TODO: make a call to OXBL and Discord
    // if OXBL is unsuccessful, redirect to the error please sign in page
    // if discord is unsuccessful, show the connect to discord

    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) this.login(code);

      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [accessToken, tokenType] = [
        fragment.get('access_token'),
        fragment.get('token_type'),
      ];

      if (accessToken) this.connectDiscord(tokenType!, accessToken);
    });
  }

  login = (openXblCode: string) => {
    this.http
      .post<AuthenticatedResponse>(
        environment.api.baseUrl + 'auth/login',
        { openXblCode },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('gamertag', response.gamertag);
          localStorage.setItem('avatar', response.avatar);

          this.playerService.updateProfile({
            gamertag: response.gamertag,
            avatar: response.avatar,
          });
        },
        error: (err: HttpErrorResponse) => console.error(err),
      });
  };

  connectDiscord = (tokenType: string, accessToken: string) => {
    this.http
      .post<DiscordAuth>(
        environment.api.baseUrl + 'auth/integrate-discord',
        { tokenType, accessToken },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('gamertag', response.gamertag);
          localStorage.setItem('avatar', response.avatar);

          this.playerService.updateProfile({
            gamertag: response.gamertag,
            avatar: response.avatar,
          });
        },
        error: (err: HttpErrorResponse) => console.error(err),
      });
  };
}
