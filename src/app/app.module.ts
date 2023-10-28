import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { CommonModule } from '@angular/common';
import { RandomGamesDialog } from './dialogs/random-games/random-games-dialog';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClickOutsideDirective } from './directives/clickOutside/click-outside.directive';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { PlayerComponent } from './components/player/player.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { JwtService } from './services/jwt.service';

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
    RandomGamesDialog,
    PageNotFoundComponent,
    ClickOutsideDirective,
    ProfileComponent,
    OrdinalPipe,
    PlayerComponent,
    LeaderboardComponent,
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.api.domain],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [JwtService],
  bootstrap: [AppComponent],
})
export class AppModule {}
