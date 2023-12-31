import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
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
  isLoading: boolean = true;
  rgscLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bcmService: BcmService,
    private openxblService: OpenXblService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      this.isLoading = false;
      return;
    }

    this.bcmService.getBcmPlayer(this.playerName).subscribe({
      next: (data) => {
        this.bcmPlayerSummary = data;
        this.isLoading = false;
        console.log(data);
      },
      error: (err: any) => {
        this.isLoading = false;
        alert(err);
      },
    });

    // this.bcmService.getYearlySummary(this.playerName).subscribe((data) => {
    //   this.bcmYearlySummary = data;
    // });

    this.bcmService.getRgscSummary(this.playerName).subscribe((data) => {
      this.rgscSummary = data;
      this.rgscLoading = false;
      console.log(data);
    });

    this.route.paramMap.subscribe((params) => {
      let player = params.get('player');
      if (!player) console.error('No player provided in the URL!');
      player = decodeURIComponent(player!);

      this.openxblService.getUser(player).subscribe((data: any) => {
        this.playerAvatar = data.settings.find(
          (x: any) => x.id === 'GameDisplayPicRaw'
        ).value;
      });
    });
  }

  handleImageLoad(event: Event) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }
}
