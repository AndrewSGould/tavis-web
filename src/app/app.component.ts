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
    private jwtHelper: JwtHelperService,
    private router: Router,
    private route: ActivatedRoute,
    private openXblService: OpenXblService,
    private http: HttpClient,
    userService: UserService
  ) {
    this.route = route;
    this.openXblService = openXblService;
    this.userService = userService;
    this.http = http;
  }

  ngOnInit(): void {
    this.userService?.xblUser.subscribe((data) => {
      if (!data.avatar || !data.gamertag)
        this.userService?.updateProfile({
          avatar: localStorage.getItem('avatar')!,
          gamertag: localStorage.getItem('gamertag')!,
        });
      else this.xblUser = data;
    });

    this.userService?.user.subscribe((data) => {
      if (data.roles.length === 0)
        this.userService?.updateUser({
          roles: JSON.parse(localStorage.getItem('roles')!),
        });
      else this.user = data;

      this.isUserAdmin = !!this.user?.roles.find((x) => x === 'Admin');
      this.isUserAuthenticated = this.user?.roles.length! > 1;
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
