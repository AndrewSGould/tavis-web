import { Component, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';

@Component({
  selector: 'app-aug-leaderboard',
  templateUrl: './aug-leaderboard.component.html',
})
export class AugLeaderboardComponent implements OnInit {
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
    'achievementCount',
  ];
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  ngOnInit(): void {
    this.isLoading = true;
    this.tavisService?.getAugRecap().subscribe((data: any) => {
      this.aprRecapData = data;
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
      } else if (column === 'achievementCount') {
        return (a.achievementCount - b.achievementCount) * direction;
      } else if (column === 'bloodAngelTribute') {
        return (a.bloodAngelTribute - b.bloodAngelTribute) * direction;
      } else if (column === 'imperialFistTribute') {
        return (a.imperialFistTribute - b.imperialFistTribute) * direction;
      } else if (column === 'spaceWolvesTribute') {
        return (a.spaceWolvesTribute - b.spaceWolvesTribute) * direction;
      } else if (column === 'ultramarinesTribute') {
        return (a.ultramarinesTribute - b.ultramarinesTribute) * direction;
      } else if (column === 'deathwatchTribute') {
        return (a.deathwatchTribute - b.deathwatchTribute) * direction;
      } else return 0;
    });
  }
}
