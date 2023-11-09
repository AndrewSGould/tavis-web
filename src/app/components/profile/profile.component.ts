import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/models/authenticated-response.model';
import { DiscordAuth } from 'src/app/models/discord-auth.model';
import { DiscordService } from 'src/app/services/discord.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  discordSignin: string = environment.discordSignin;
  discordUser: string | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private discordService: DiscordService
  ) {
    this.route = route;
    this.http = http;
    this.userService = userService;
    this.discordService = discordService;
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

      if (!code && !accessToken) this.retrieveDiscord();
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
          localStorage.setItem('roles', JSON.stringify(response.roles));

          this.userService.updateProfile({
            gamertag: response.gamertag,
            avatar: response.avatar,
          });

          this.retrieveDiscord();
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
          localStorage.setItem('roles', response.roles);
          this.userService.updateUser({ roles: response.roles });

          this.retrieveDiscord();
        },
        error: (err: HttpErrorResponse) => console.error(err),
      });
  };

  retrieveDiscord = () => {
    this.discordService.getConnection().subscribe({
      next: (data: any) => (this.discordUser = data.globalName),
      error: (err: any) => console.error(err),
    });

    this.userService.user$.subscribe((data) => {
      if (data.roles.length === 0)
        this.userService.fetchRoles().subscribe((data: string[]) => {
          this.userService.updateUserRoles(data);
          this.userService.user$.subscribe((data) => console.log(data));
        });
    });
  };
}
