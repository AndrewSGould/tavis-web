import { Component, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';

@Component({
  selector: 'app-jan-leaderboard',
  templateUrl: './jan-leaderboard.component.html',
})
export class JanLeaderboardComponent implements OnInit {
  private tavisService: TavisService | null = null;
  janRecapData: any = null;

  constructor(tavisService: TavisService) {
    this.tavisService = tavisService;
  }

  isLoading: boolean = false;
  displayedColumns: string[] = [
    'rank',
    'gamertag',
    'bucket1Comps',
    'bucket1Points',
    'bucket2Comps',
    'bucket2Points',
    'bucket3Comps',
    'bucket3Points',
    'bucket4Comps',
    'bucket4Points',
    'communityBonus',
    'totalPoints',
  ];
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  ngOnInit(): void {
    this.tavisService?.getJanRecap().subscribe((data: any) => {
      this.janRecapData = data;
      this.sortColumn('rank');
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

    this.janRecapData = this.janRecapData.sort((a: any, b: any) => {
      const direction = this.currentSort.direction === 'asc' ? 1 : -1;

      if (column === 'rank') {
        return (a.rank - b.rank) * direction;
      } else if (column === 'gamertag') {
        return a.gamertag.localeCompare(b.gamertag) * direction;
      } else if (column === 'bucket1Comps') {
        return (a.bucket1Comps - b.bucket1Comps) * direction;
      } else if (column === 'bucket1Points') {
        return (a.bucket1Points - b.bucket1Points) * direction;
      } else if (column === 'bucket2Comps') {
        return (a.bucket2Comps - b.bucket2Comps) * direction;
      } else if (column === 'bucket2Points') {
        return (a.bucket2Points - b.bucket2Points) * direction;
      } else if (column === 'bucket3Comps') {
        return (a.bucket3Comps - b.bucket3Comps) * direction;
      } else if (column === 'bucket3Points') {
        return (a.bucket3Points - b.bucket3Points) * direction;
      } else if (column === 'bucket4Comps') {
        return (a.bucket4Comps - b.bucket4Comps) * direction;
      } else if (column === 'bucket4Points') {
        return (a.bucket4Points - b.bucket4Points) * direction;
      } else if (column === 'communityBonus') {
        return (a.communityBonus - b.communityBonus) * direction;
      } else if (column === 'totalPoints') {
        return (a.totalPoints - b.totalPoints) * direction;
      } else return 0;
    });
  }
}
