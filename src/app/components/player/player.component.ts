import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';

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
  gamesSummary: any = null;
  monthlySummary: any = null;
  yearlySummary: any = null;
  miscSummary: any = null;

  isLoading: boolean = true;
  rgscLoading: boolean = true;
  abcLoading: boolean = true;
  oddjobLoading: boolean = true;
  gamesLoading: boolean = true;
  monthlyLoading: boolean = true;
  yearlyLoading: boolean = true;
  miscLoading: boolean = true;

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  highlightedLetters: any = null;

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {
    this.route.params.subscribe(() => {
      this.loadPage();
    });
  }

  loadPage() {
    this.isLoading = true;
    this.rgscLoading = true;
    this.abcLoading = true;
    this.oddjobLoading = true;
    this.gamesLoading = true;
    this.monthlyLoading = true;
    this.yearlyLoading = true;
    this.miscLoading = true;

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

    this.bcmService.getBcmPlayerWithGames(this.playerName).subscribe((data) => {
      this.gamesSummary = data;
      this.gamesLoading = false;
    });

    this.bcmService.getMonthlySummary(this.playerName).subscribe((data) => {
      this.monthlySummary = data;
      this.monthlyLoading = false;
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

    this.bcmService.getYearlySummary(this.playerName).subscribe((data) => {
      this.yearlySummary = data;
      this.yearlyLoading = false;
    });

    this.bcmService.getMiscSummary(this.playerName).subscribe((data) => {
      this.miscSummary = data;
      this.miscLoading = false;
      console.log(data);
    });
  }

  getOddJobGame = (genre: string) => {
    return (
      this.oddjobSummary.find((x: any) =>
        x.gameGenres.find((x: any) => x.genreId.name === genre)
      )?.title ?? '--'
    );
  };

  handleImageLoad(event: Event) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }

  exists(letter: string): boolean {
    return this.abcSummary?.includes(letter);
  }

  calcFullCombos(miscSummary: any): number {
    if (!miscSummary) return 0;

    return miscSummary.filter((x: any) => x.fullCombo).length;
  }

  calcRgscCompletions(miscSummary: any): number {
    if (!miscSummary) return this.rgscSummary?.rgscsCompleted?.length ?? 0;

    return (
      miscSummary.reduce((sum: any, x: any) => sum + (x.rgsc || 0), 0) +
        this.rgscSummary?.rgscsCompleted?.length ?? 0
    );
  }

  getBestPlacement(miscSummary: any[]): any | undefined {
    if (!miscSummary) return undefined;

    const sortedSummary = miscSummary
      .slice()
      .sort((a, b) => a.placement - b.placement);

    return sortedSummary[0];
  }
}
