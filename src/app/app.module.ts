import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';
import { SyncManagerComponent } from './components/sync-manager/sync-manager.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BcmAdminComponent } from './components/admin/bcm-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { RandomGamesDialogComponent } from './dialogs/random-games/random-games-dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClickOutsideDirective } from './directives/clickOutside/click-outside.directive';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { PlayerComponent } from './components/player/player.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { JwtInterceptorService, JwtService } from './services/jwt.service';
import { CompletedGamesComponent } from './components/profile/completed-games/completed-games.component';
import { AbcComponent } from './components/profile/abc/abc.component';
import { MonthliesComponent } from './components/profile/monthlies/monthlies.component';
import { OddJobsComponent } from './components/profile/oddjobs/oddjobs.component';
import { RgscComponent } from './components/profile/rgsc/rgsc.component';
import { YearliesComponent } from './components/profile/yearlies/yearlies.component';
import { BcmRegDialogComponent } from './dialogs/bcm-reg/bcm-reg-dialog';
import { BcmUnregDialogComponent } from './dialogs/bcm-unreg/bcm-unreg-dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  GlobalErrorHandlerService,
  GlobalHttpInterceptorService,
} from './services/error.service';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    SyncManagerComponent,
    BcmAdminComponent,
    RandomGamesDialogComponent,
    BcmRegDialogComponent,
    BcmUnregDialogComponent,
    PageNotFoundComponent,
    ClickOutsideDirective,
    ProfileComponent,
    OrdinalPipe,
    PlayerComponent,
    LeaderboardComponent,
    CompletedGamesComponent,
    AbcComponent,
    MonthliesComponent,
    OddJobsComponent,
    RgscComponent,
    YearliesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CommonModule,
    NgxDatatableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.api.domain],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    JwtService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
