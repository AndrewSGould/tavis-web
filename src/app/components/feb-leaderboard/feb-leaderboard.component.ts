import { Component, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';

@Component({
  selector: 'app-feb-leaderboard',
  templateUrl: './feb-leaderboard.component.html',
})
export class FebLeaderboardComponent implements OnInit {
  private tavisService: TavisService | null = null;
  febRecapData: any = null;

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
    this.tavisService?.getFebRecap().subscribe((data: any) => {
      this.febRecapData = data;
      this.sortColumn('rank');
      console.log(data);
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

    this.febRecapData = this.febRecapData.sort((a: any, b: any) => {
      const direction = this.currentSort.direction === 'asc' ? 1 : -1;

      if (column === 'rank') {
        return (a.rank - b.rank) * direction;
      } else if (column === 'gamertag') {
        return a.gamertag.localeCompare(b.gamertag) * direction;
      } else if (column === 'biCompletion') {
        return (a.biCompletion - b.biCompletion) * direction;
      } else if (column === 'biPoints') {
        return (a.biPoints - b.biPoints) * direction;
      } else if (column === 'triCompletion') {
        return (a.triCompletion - b.triCompletion) * direction;
      } else if (column === 'triPoints') {
        return (a.triPoints - b.triPoints) * direction;
      } else if (column === 'quadCompletion') {
        return (a.quadCompletion - b.quadCompletion) * direction;
      } else if (column === 'quadPoints') {
        return (a.quadPoints - b.quadPoints) * direction;
      } else if (column === 'quintCompletion') {
        return (a.quintCompletion - b.quintCompletion) * direction;
      } else if (column === 'quintPoints') {
        return (a.quintPoints - b.quintPoints) * direction;
      } else if (column === 'sexCompletion') {
        return (a.sexCompletion - b.sexCompletion) * direction;
      } else if (column === 'sexPoints') {
        return (a.sexPoints - b.sexPoints) * direction;
      } else if (column === 'sepCompletion') {
        return (a.sepCompletion - b.sepCompletion) * direction;
      } else if (column === 'sepPoints') {
        return (a.sepPoints - b.sepPoints) * direction;
      } else if (column === 'octCompletion') {
        return (a.octCompletion - b.octCompletion) * direction;
      } else if (column === 'octPoints') {
        return (a.octPoints - b.octPoints) * direction;
      } else if (column === 'undeCompletion') {
        return (a.undeCompletion - b.undeCompletion) * direction;
      } else if (column === 'undePoints') {
        return (a.undePoints - b.undePoints) * direction;
      } else if (column === 'decCompletion') {
        return (a.decCompletion - b.decCompletion) * direction;
      } else if (column === 'decPoints') {
        return (a.decPoints - b.decPoints) * direction;
      } else if (column === 'duodeCompletion') {
        return (a.duodeCompletion - b.duodeCompletion) * direction;
      } else if (column === 'duodePoints') {
        return (a.duodePoints - b.duodePoints) * direction;
      } else if (column === 'communityBonus') {
        return (a.communityBonus - b.communityBonus) * direction;
      } else if (column === 'totalPoints') {
        return (a.totalPoints - b.totalPoints) * direction;
      } else return 0;
    });
  }
}
