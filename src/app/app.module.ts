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
import { RgscComponent } from './components/profile/rgsc/rgsc.component';
import { YearliesComponent } from './components/profile/yearlies/yearlies.component';
import { BcmRegDialogComponent } from './dialogs/bcm-reg/bcm-reg-dialog';
import { BcmUnregDialogComponent } from './dialogs/bcm-unreg/bcm-unreg-dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  GlobalErrorHandlerService,
  GlobalHttpInterceptorService,
} from './services/error.service';
import { JanBonusComponent } from './components/jan-bonus/jan-bonus.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { MiscStatsComponent } from './components/misc-stats/misc-stats.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FebBonusComponent } from './components/feb-bonus/feb-bonus.component';
import { JanLeaderboardComponent } from './components/jan-leaderboard/jan-leaderboard.component';
import { FebLeaderboardComponent } from './components/feb-leaderboard/feb-leaderboard.component';
import { MarLeaderboardComponent } from './components/mar-leaderboard/mar-leaderboard.component';
import { MarBonusComponent } from './components/mar-bonus/mar-bonus.component';
import { AprBonusComponent } from './components/apr-bonus/apr-bonus.component';
import { AprLeaderboardComponent } from './components/apr-leaderboard/apr-leaderboard.component';
import { JunLeaderboardComponent } from './components/jun-leaderboard/jun-leaderboard.component';
import { JulLeaderboardComponent } from './components/jul-leaderboard/jul-leaderboard.component';
import { JulBonusComponent } from './components/jul-bonus/jul-bonus.component';
import { AugLeaderboardComponent } from './components/aug-leaderboard/aug-leaderboard.component';
import { AugBonusComponent } from './components/aug-bonus/aug-bonus.component';
import { SepBonusComponent } from './components/sep-bonus/sep-bonus.component';
import { SepLeaderboardComponent } from './components/sep-leaderboard/sep-leaderboard.component';
import { OctBonusComponent } from './components/oct-bonus/oct-bonus.component';
import { OctLeaderboardComponent } from './components/oct-leaderboard/oct-leaderboard.component';

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
    RgscComponent,
    YearliesComponent,
    JanBonusComponent,
    FebBonusComponent,
    MarBonusComponent,
    AprBonusComponent,
    JulBonusComponent,
    AugBonusComponent,
    SepBonusComponent,
    OctBonusComponent,
    MaintenanceComponent,
    MiscStatsComponent,
    JanLeaderboardComponent,
    FebLeaderboardComponent,
    MarLeaderboardComponent,
    AprLeaderboardComponent,
    JunLeaderboardComponent,
    JulLeaderboardComponent,
    AugLeaderboardComponent,
    SepLeaderboardComponent,
    OctLeaderboardComponent,
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
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgxChartsModule,
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
