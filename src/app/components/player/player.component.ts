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
export class PlayerComponent {
  playerName: string | null = null;
  bcmPlayerSummary: any = null;
  rgscSummary: any = null;
  playerAvatar: string = '../../../../../assets/no-login_robot.png';
  abcSummary: any = null;
  oddjobSummary: any = null;

  isLoading: boolean = true;
  rgscLoading: boolean = true;
  abcLoading: boolean = true;
  oddjobLoading: boolean = true;

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  highlightedLetters: any = null;

  constructor(
    private route: ActivatedRoute,
    private bcmService: BcmService,
    private openxblService: OpenXblService
  ) {
    this.route.params.subscribe((params) => {
      this.loadPage();
    });
  }

  loadPage() {
    this.isLoading = true;
    this.rgscLoading = true;
    this.abcLoading = true;

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
      },
      error: (err: any) => {
        this.isLoading = false;
        alert(err);
      },
    });

    this.bcmService.getAbcSummary(this.playerName).subscribe((data) => {
      this.abcSummary = data;
      this.abcLoading = false;
    });

    this.bcmService.getOddjobSummary(this.playerName).subscribe((data) => {
      this.oddjobSummary = data;
      this.oddjobLoading = false;
    });

    this.bcmService.getRgscSummary(this.playerName).subscribe((data) => {
      this.rgscSummary = data;
      this.rgscLoading = false;
    });
  }

  handleImageLoad(event: Event) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }

  exists(letter: string): boolean {
    return this.abcSummary?.includes(letter);
  }
}
