import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OpenXblService } from './services/openxbl.service';
import { XblUser } from './models/xbl-user.model';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { AuthenticatedResponse } from './models/authenticated-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from './services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'BCMX';
  hideProfileMenu = true;
  hideMobileMenu = true;
  showRegisterButton = true;
  xblUser: XblUser | undefined;
  user: User | undefined;
  userService: UserService | undefined = undefined;
  isUserAdmin: boolean = false;
  isUserAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private openXblService: OpenXblService,
    private http: HttpClient,
    private jwtService: JwtService,
    userService: UserService
  ) {
    this.route = route;
    this.openXblService = openXblService;
    this.userService = userService;
    this.http = http;
    this.jwtService = jwtService;
  }

  ngOnInit(): void {
    this.jwtService.token.subscribe((token) => {
      if (!token) token = localStorage.getItem('jwt') ?? '';
      this.isUserAuthenticated = !this.jwtService.isTokenExpired(token);
    });

    this.userService?.xblUser.subscribe((data) => {
      if (
        !data.avatar &&
        !data.gamertag &&
        localStorage.getItem('avatar') &&
        localStorage.getItem('gamertag')
      )
        this.userService?.updateProfile({
          avatar: localStorage.getItem('avatar')!,
          gamertag: localStorage.getItem('gamertag')!,
        });
    });

    this.userService?.user.subscribe((data) => {
      if (data.roles?.length === 0 && localStorage.getItem('roles') !== '[]')
        this.userService?.updateUser({
          roles: JSON.parse(localStorage.getItem('roles')!),
        });
      else this.user = data;

      this.isUserAdmin = !!this.user?.roles?.find((x) => x === 'Admin');
    });
  }

  logOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('gamertag');
    localStorage.removeItem('avatar');
    this.router.navigate(['/home']);
  };

  toggleProfileMenu = () => {
    this.hideProfileMenu = !this.hideProfileMenu;
  };

  toggleMobileMenu = () => {
    this.hideMobileMenu = !this.hideMobileMenu;
  };
}
