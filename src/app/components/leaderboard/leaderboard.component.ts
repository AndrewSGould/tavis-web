import { Component, OnInit } from '@angular/core';
import { BcmService } from 'src/app/services/bcm.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  constructor(private bcmService: BcmService) {}

  public leaderboard: any = null;
  public lastScan: Date | null = null;

  ngOnInit(): void {
    this.bcmService.getBcmLeaderboardList().subscribe((data) => {
      console.log(data);
      this.leaderboard = data;
      this.lastScan = this.leaderboard![0].bcmPlayer.lastSync; //TODO: improve this
    });
  }
}
