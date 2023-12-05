import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';
import { OpenXblService } from 'src/app/services/openxbl.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit {
  playerName: string | null = null;
  bcmPlayerSummary: any = null;
  rgscSummary: any = null;
  playerAvatar: string = '../../../../../assets/no-login_robot.png';
  bcmYearlySummary: any = null;

  constructor(
    private route: ActivatedRoute,
    private bcmService: BcmService,
    private openxblService: OpenXblService
  ) {}

  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      return;
    }

    this.bcmService.getBcmPlayer(this.playerName).subscribe((data) => {
      this.bcmPlayerSummary = data;
    });

    this.bcmService.getYearlySummary(this.playerName).subscribe((data) => {
      this.bcmYearlySummary = data;
    });

    this.bcmService.getRgscSummary(this.playerName).subscribe((data) => {
      this.rgscSummary = data;
      console.log(this.rgscSummary);
    });

    this.openxblService.getUser().subscribe((data: any) => {
      this.playerAvatar = data.settings.find(
        (x: any) => x.id === 'GameDisplayPicRaw'
      ).value;
    });
  }
}
