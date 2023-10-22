import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OpenXblService } from './services/openxbl.service';
import { PlayerService } from './services/player.service';
import { XblUser } from './models/xbl-user.model';

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
  playerService: PlayerService | undefined = undefined;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private route: ActivatedRoute,
    private openXblService: OpenXblService,
    playerService: PlayerService
  ) {
    this.route = route;
    this.openXblService = openXblService;
    this.playerService = playerService;
  }

  ngOnInit(): void {
    // TODO: ...
    this.xblUser = this.playerService?.xblUser.value;

    if (!this.playerService?.xblUser?.value.avatar)
      this.xblUser!.avatar = localStorage.getItem('avatar')!;
    if (!this.playerService?.xblUser?.value.gamertag)
      this.xblUser!.gamertag = localStorage.getItem('gamertag')!;
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) return true;

    return false;
  };

  logOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/home']);
  };

  toggleProfileMenu = () => {
    this.hideProfileMenu = !this.hideProfileMenu;
  };

  toggleMobileMenu = () => {
    this.hideMobileMenu = !this.hideMobileMenu;
  };
}
