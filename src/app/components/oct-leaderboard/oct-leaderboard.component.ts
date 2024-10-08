import { Component, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';

@Component({
  selector: 'app-oct-leaderboard',
  templateUrl: './oct-leaderboard.component.html',
})
export class OctLeaderboardComponent implements OnInit {
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
    this.tavisService?.getOctRecap().subscribe((data: any) => {
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
      } else if (column === 'boneCount') {
        return (a.boneCount - b.boneCount) * direction;
      } else if (column === 'crimsonCurseRitual') {
        return (a.crimsonCurseRitual - b.crimsonCurseRitual) * direction;
      } else if (column === 'dreadRitual') {
        return (a.dreadRitual - b.dreadRitual) * direction;
      } else if (column === 'markOfTheBeast1Ritual') {
        return (a.markOfTheBeast1Ritual - b.markOfTheBeast1Ritual) * direction;
      } else if (column === 'markOfTheBeast2Ritual') {
        return (a.markOfTheBeast2Ritual - b.markOfTheBeast2Ritual) * direction;
      } else if (column === 'markOfTheBeast3Ritual') {
        return (a.markOfTheBeast3Ritual - b.markOfTheBeast3Ritual) * direction;
      } else return 0;
    });
  }
}
