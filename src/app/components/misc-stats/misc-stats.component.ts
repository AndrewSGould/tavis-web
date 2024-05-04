import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { BcmService } from 'src/app/services/bcm.service';
@Component({
  selector: 'app-misc-stats',
  templateUrl: './misc-stats.component.html',
  styleUrls: ['./misc-stats.component.scss'],
})
export class MiscStatsComponent implements OnInit {
  playerName: string | null | undefined = null;
  bcmPlayerSummary: any = null;
  isPlayerLoading: boolean = true;
  fullgenres: any = null;
  topgenres: any = null;
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  single: any[] = [];

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {}

  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('No player found?');
      return;
    }

    this.bcmService.getBcmPlayerWithGames(this.playerName).subscribe({
      next: (data) => {
        this.bcmPlayerSummary = data;
        this.isPlayerLoading = false;
      },
      error: (err: any) => {
        this.isPlayerLoading = false;
        alert(err);
      },
    });

    this.bcmService.getPlayersGenres(this.playerName).subscribe((data: any) => {
      this.single = data.filter((x: any) => x.name !== 'None').slice(0, 8);
      this.fullgenres = data.filter((x: any) => x.name !== 'None');
    });

    this.bcmService
      .getPlayerTopGenres(this.playerName)
      .subscribe((data: any) => {
        this.topgenres = data.sort((a: any, b: any) => a.rank - b.rank);
      });
  }

  handleImageLoad(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }

  calculateMiddleIndex(): number {
    return Math.floor(this.fullgenres.length / 2);
  }
}
