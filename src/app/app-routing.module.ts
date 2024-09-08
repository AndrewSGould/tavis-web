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
import { YearliesComponent } from './components/profile/yearlies/yearlies.component';
import { MonthliesComponent } from './components/profile/monthlies/monthlies.component';
import { JanBonusComponent } from './components/jan-bonus/jan-bonus.component';
import { MiscStatsComponent } from './components/misc-stats/misc-stats.component';
import { FebBonusComponent } from './components/feb-bonus/feb-bonus.component';
import { JanLeaderboardComponent } from './components/jan-leaderboard/jan-leaderboard.component';
import { FebLeaderboardComponent } from './components/feb-leaderboard/feb-leaderboard.component';
import { MarBonusComponent } from './components/mar-bonus/mar-bonus.component';
import { MarLeaderboardComponent } from './components/mar-leaderboard/mar-leaderboard.component';
import { AprBonusComponent } from './components/apr-bonus/apr-bonus.component';
import { MayBonusComponent } from './components/may-bonus/may-bonus.component';
import { AprLeaderboardComponent } from './components/apr-leaderboard/apr-leaderboard.component';
import { JunBonusComponent } from './components/jun-bonus/jun-bonus.component';
import { JunLeaderboardComponent } from './components/jun-leaderboard/jun-leaderboard.component';
import { JulLeaderboardComponent } from './components/jul-leaderboard/jul-leaderboard.component';
import { JulBonusComponent } from './components/jul-bonus/jul-bonus.component';
import { AugBonusComponent } from './components/aug-bonus/aug-bonus.component';
import { AugLeaderboardComponent } from './components/aug-leaderboard/aug-leaderboard.component';
import { SepBonusComponent } from './components/sep-bonus/sep-bonus.component';
import { SepLeaderboardComponent } from './components/sep-leaderboard/sep-leaderboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'jan-bonus', component: JanBonusComponent },
  { path: 'feb-bonus', component: FebBonusComponent },
  { path: 'mar-bonus', component: MarBonusComponent },
  { path: 'apr-bonus', component: AprBonusComponent },
  { path: 'may-bonus', component: MayBonusComponent },
  { path: 'jun-bonus', component: JunBonusComponent },
  { path: 'jul-bonus', component: JulBonusComponent },
  { path: 'aug-bonus', component: AugBonusComponent },
  { path: 'sep-bonus', component: SepBonusComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'jan-leaderboard', component: JanLeaderboardComponent },
  { path: 'feb-leaderboard', component: FebLeaderboardComponent },
  { path: 'mar-leaderboard', component: MarLeaderboardComponent },
  { path: 'apr-leaderboard', component: AprLeaderboardComponent },
  { path: 'jun-leaderboard', component: JunLeaderboardComponent },
  { path: 'jul-leaderboard', component: JulLeaderboardComponent },
  { path: 'aug-leaderboard', component: AugLeaderboardComponent },
  { path: 'sep-leaderboard', component: SepLeaderboardComponent },
  {
    path: 'player/:player',
    component: PlayerComponent,
    children: [{ path: 'monthlies', component: MonthliesComponent }],
  },
  { path: 'player/:player/rgsc', component: RgscComponent },
  { path: 'player/:player/abc', component: AbcComponent },
  { path: 'player/:player/yearlies', component: YearliesComponent },
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
