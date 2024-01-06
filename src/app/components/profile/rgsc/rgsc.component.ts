import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';

@Component({
  selector: 'app-profile-rgsc',
  templateUrl: './rgsc.component.html',
})
export class RgscComponent implements OnInit {
  playerName: string | null | undefined = null;
  rgscSummary: any = null;
  isPlayerLoading: boolean = true;
  isRgscLoading: boolean = true;
  bcmPlayerSummary: any = null;

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {}

  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      return;
    }

    this.bcmService.getBcmPlayer(this.playerName).subscribe({
      next: (data) => {
        this.bcmPlayerSummary = data;
        this.isPlayerLoading = false;
      },
      error: (err: any) => {
        this.isPlayerLoading = false;
        alert(err);
      },
    });

    this.bcmService.getRgscSummary(this.playerName).subscribe((data) => {
      this.rgscSummary = data;
      this.isRgscLoading = false;
      console.log(data);
    });
  }

  determineChallengeMonth = (challengeId: number) => {
    switch (challengeId) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      default:
        return 'N/A';
    }
  };

  handleImageLoad(event: Event) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }
}
