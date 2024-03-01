import { Component, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';

@Component({
  selector: 'app-mar-leaderboard',
  templateUrl: './mar-leaderboard.component.html',
})
export class MarLeaderboardComponent implements OnInit {
  private tavisService: TavisService | null = null;
  marRecapData: any = null;

  constructor(tavisService: TavisService) {
    this.tavisService = tavisService;
  }

  isLoading: boolean = false;
  displayedColumns: string[] = [
    'rank',
    'gamertag',
    'totalPoints',
    'communityBonus',
    'bountyCount',
    'bestBounty',
    'bountiesClaimed',
  ];
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  ngOnInit(): void {
    this.isLoading = true;
    this.tavisService?.getMarRecap().subscribe((data: any) => {
      this.marRecapData = data;
      this.sortColumn('rank');
      this.isLoading = false;
    });
  }

  sortColumn(column: string): void {
    if (this.currentSort.column === column) {
      this.currentSort.direction =
        this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }

    this.marRecapData = this.marRecapData.sort((a: any, b: any) => {
      const direction = this.currentSort.direction === 'asc' ? 1 : -1;

      if (column === 'rank') {
        return (a.rank - b.rank) * direction;
      } else if (column === 'gamertag') {
        return a.gamertag.localeCompare(b.gamertag) * direction;
      } else if (column === 'bestBounty') {
        return a.bestBounty.localeCompare(b.bestBounty) * direction;
      } else if (column === 'bountiesClaimed') {
        return a.bountiesClaimed.localeCompare(b.bountiesClaimed) * direction;
      } else if (column === 'bountyCount') {
        return (a.bountyCount - b.bountyCount) * direction;
      } else if (column === 'communityBonus') {
        return (a.communityBonus - b.communityBonus) * direction;
      } else if (column === 'totalPoints') {
        return (a.totalPoints - b.totalPoints) * direction;
      } else return 0;
    });
  }
}
