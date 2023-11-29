import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class JwtService {
  constructor(public jwtHelper: JwtHelperService) {}

  public token = new BehaviorSubject<string>('');
  token$ = this.token.asObservable();

  updateToken(token: string): void {
    this.token.next(token);
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  getUserRoles(token: string): string[] {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return (
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] || []
    );
  }
}
