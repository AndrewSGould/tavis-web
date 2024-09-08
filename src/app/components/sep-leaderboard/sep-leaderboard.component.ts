import { Component, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';

@Component({
  selector: 'app-sep-leaderboard',
  templateUrl: './sep-leaderboard.component.html',
})
export class SepLeaderboardComponent implements OnInit {
  private tavisService: TavisService | null = null;
  aprRecapData: any = null;

  constructor(tavisService: TavisService) {
    this.tavisService = tavisService;
  }

  isLoading: boolean = false;
  displayedColumns: string[] = [
    'rank',
    'gamertag',
    'communityBonus',
    'totalPoints',
    'streakCount',
    'streakedGames',
  ];
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  ngOnInit(): void {
    this.isLoading = true;
    this.tavisService?.getSepRecap().subscribe((data: any) => {
      this.aprRecapData = data;
      console.log(data);
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

    this.aprRecapData = this.aprRecapData.sort((a: any, b: any) => {
      const direction = this.currentSort.direction === 'asc' ? 1 : -1;

      if (column === 'rank') {
        return (a.rank - b.rank) * direction;
      } else if (column === 'gamertag') {
        return a.gamertag.localeCompare(b.gamertag) * direction;
      } else if (column === 'communityBonus') {
        return (a.communityBonus - b.communityBonus) * direction;
      } else if (column === 'totalPoints') {
        return (a.totalPoints - b.totalPoints) * direction;
      } else if (column === 'streakCount') {
        return (a.streakCount - b.streakCount) * direction;
      } else if (column === 'streakedGames') {
        return a.gamertag.localeCompare(b.streakedGames) * direction;
      } else return 0;
    });
  }
}
