import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwt');

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return next.handle(modifiedRequest);
  }
}
