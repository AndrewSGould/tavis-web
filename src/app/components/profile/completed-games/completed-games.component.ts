import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';

@Component({
  selector: 'app-profile-completed-games',
  templateUrl: './completed-games.component.html',
})
export class CompletedGamesComponent implements OnInit {
  playerName: string | null | undefined = null;
  bcmPlayerSummary: any = null;
  isPlayerLoading: boolean = true;
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  displayedColumns: string[] = ['date', 'title', 'ratio', 'estimate', 'points'];

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
        console.log(data);
      },
      error: (err: any) => {
        this.isPlayerLoading = false;
        alert(err);
      },
    });
  }

  handleImageLoad(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }

  sortColumn(column: string): void {
    if (this.currentSort.column === column) {
      this.currentSort.direction =
        this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }

    this.bcmPlayerSummary.games.sort((a: any, b: any) => {
      const direction = this.currentSort.direction === 'asc' ? 1 : -1;

      if (column === 'date') {
        return (
          new Date(a.game.completionDate).getTime() -
          new Date(b.game.completionDate).getTime() * direction
        );
      } else if (column === 'title') {
        return a.game.game.title.localeCompare(b.game.game.title) * direction;
      } else if (column === 'ratio') {
        return (a.game.game.siteRatio - b.game.game.siteRatio) * direction;
      } else if (column === 'estimate') {
        return (
          (a.game.game.fullCompletionEstimate -
            b.game.game.fullCompletionEstimate) *
          direction
        );
      } else if (column === 'points') {
        return (a.points - b.points) * direction;
      } else {
        return 0;
      }
    });
  }
}
