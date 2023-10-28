import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from '../models/authenticated-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtService.isTokenExpired(token)) {
      // Check user roles
      const requiredRoles = route.data['roles'] as string[]; // Set required roles in your route data

      const userRoles = this.jwtService.getUserRoles(token);

      if (requiredRoles)
        if (requiredRoles.every((role) => userRoles.includes(role)))
          return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token!);
    if (!isRefreshSuccess) this.router.navigate(['login']);

    // Check user roles
    const requiredRoles = route.data['roles'] as string[]; // Set required roles in your route data

    const userRoles = this.jwtService.getUserRoles(token!);

    if (requiredRoles)
      if (requiredRoles.every((role) => userRoles.includes(role))) return true;

    return false;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }

    const credentials = JSON.stringify({
      accessToken: token,
      refreshToken: refreshToken,
    });
    let isRefreshSuccess: boolean;
    const refreshRes = await new Promise<AuthenticatedResponse>(
      (resolve, reject) => {
        this.http
          .post<AuthenticatedResponse>(environment.api.token, credentials, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          })
          .subscribe({
            next: (res: AuthenticatedResponse) => resolve(res),
            error: (_) => {
              reject;
              isRefreshSuccess = false;
            },
          });
      }
    );

    localStorage.setItem('jwt', refreshRes.token);
    localStorage.setItem('refreshToken', refreshRes.refreshToken);
    isRefreshSuccess = true;
    return isRefreshSuccess;
  }
}
