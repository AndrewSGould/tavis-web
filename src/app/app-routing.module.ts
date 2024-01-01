import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BcmAdminComponent } from './components/admin/bcm-admin.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayerComponent } from './components/player/player.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SyncManagerComponent } from './components/sync-manager/sync-manager.component';
import { AuthGuard } from './guards/auth.guards';
import { RgscComponent } from './components/profile/rgsc/rgsc.component';
import { AbcComponent } from './components/profile/abc/abc.component';
import { CompletedGamesComponent } from './components/profile/completed-games/completed-games.component';
import { OddJobsComponent } from './components/profile/oddjobs/oddjobs.component';
import { YearliesComponent } from './components/profile/yearlies/yearlies.component';
import { MonthliesComponent } from './components/profile/monthlies/monthlies.component';
import { JanBonusComponent } from './components/jan-bonus/jan-bonus.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { MiscStatsComponent } from './components/misc-stats/misc-stats.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jan-bonus', component: JanBonusComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  {
    path: 'player/:player',
    component: PlayerComponent,
    children: [
      // { path: 'rgsc', component: RgscComponent },
      { path: 'oddjobs', component: OddJobsComponent },
      { path: 'monthlies', component: MonthliesComponent },
      { path: 'yearlies', component: YearliesComponent },
    ],
  },
  { path: 'player/:player/rgsc', component: RgscComponent },
  { path: 'player/:player/abc', component: AbcComponent },
  {
    path: 'player/:player/completed-games',
    component: CompletedGamesComponent,
  },
  { path: 'player/:player/misc-stats', component: MiscStatsComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'sync',
    component: SyncManagerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'admin',
    component: BcmAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  { path: '**', component: PageNotFoundComponent },
  // { path: '**', component: MaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
