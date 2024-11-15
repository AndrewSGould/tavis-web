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
  public isLoading: boolean = true;
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  ngOnInit(): void {
    this.bcmService.getBcmLeaderboardList().subscribe({
      next: (data) => {
        console.log(data);
        this.leaderboard = data.filter((x: any) => x.bcmStats.rank !== 0);
        this.isLoading = false;
        this.lastScan = this.leaderboard![0].lastSync; //TODO: improve this
      },
      error: (err) => {
        alert(err);
        this.isLoading = false;
      },
    });
  }

  handleImageLoad(event: Event) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }

  sortColumn(column: string): void {
    if (this.currentSort.column === column) {
      this.currentSort.direction =
        this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'desc';
    }

    this.leaderboard.sort((a: any, b: any) => {
      const direction = this.currentSort.direction === 'asc' ? 1 : -1;

      if (column === 'totalPoints') {
        return (a.bcmStats.totalPoints - b.bcmStats.totalPoints) * direction;
      } else if (column === 'bonusPoints') {
        return (a.bcmStats.bonusPoints - b.bcmStats.bonusPoints) * direction;
      } else if (column === 'basePoints') {
        return (a.bcmStats.basePoints - b.bcmStats.basePoints) * direction;
      } else if (column === 'player') {
        return a.user.gamertag.localeCompare(b.user.gamertag) * direction;
      } else if (column === '#') {
        return (a.bcmStats.rank - b.bcmStats.rank) * direction;
      } else if (column === 'avgBcmPoints') {
        return (
          (a.bcmStats.averagePoints - b.bcmStats.averagePoints) * direction
        );
      } else if (column === 'completes') {
        return (a.bcmStats.completions - b.bcmStats.completions) * direction;
      } else if (column === 'avgRatio') {
        return (a.bcmStats.averageRatio - b.bcmStats.averageRatio) * direction;
      } else if (column === 'highestRatio') {
        return (a.bcmStats.highestRatio - b.bcmStats.highestRatio) * direction;
      } else if (column === 'avgTime') {
        return (
          (a.bcmStats.averageTimeEstimate - b.bcmStats.averageTimeEstimate) *
          direction
        );
      } else if (column === 'highestTime') {
        return (
          (a.bcmStats.highestTimeEstimate - b.bcmStats.highestTimeEstimate) *
          direction
        );
      } else {
        return 0;
      }
    });
  }
}
