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

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {}

  ngOnInit(): void {
    this.playerName = this.route.parent?.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      return;
    }

    this.bcmService.getBcmPlayer(this.playerName).subscribe((data) => {
      console.log(data);
      this.bcmPlayerSummary = data;
    });
  }
}
