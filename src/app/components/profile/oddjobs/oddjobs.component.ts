import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';

@Component({
  selector: 'app-profile-oddjobs',
  templateUrl: './oddjobs.component.html',
})
export class OddJobsComponent implements OnInit {
  playerName: string | null | undefined = null;
  oddjobs: any = null;

  presetGenres = [];

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {}

  ngOnInit(): void {
    this.playerName = this.route.parent?.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      return;
    }

    this.bcmService.getYearlySummary(this.playerName).subscribe((data) => {
      this.oddjobs = data.oddJobCompletions;
    });
  }

  getGamesWithGenre(genre: string): any[] {
    return this.oddjobs.filter((game: any) =>
      game.gameGenres.some((g: any) => g.genreId.name === genre)
    );
  }

  isGenreHighlighted(game: any, genre: string): boolean {
    return game.gameGenres.some((g: any) => g.genreId.name === genre);
  }
}
