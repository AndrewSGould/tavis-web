import { Component, Inject, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';
import { MatDialog } from '@angular/material/dialog';
import { RandomGamesDialogComponent } from 'src/app/dialogs/random-games/random-games-dialog';

@Component({
  selector: 'app-bcm-admin',
  templateUrl: './bcm-admin.component.html',
})
export class BcmAdminComponent implements OnInit {
  constructor(private tavisService: TavisService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPlayerList();
  }

  randomIsLoading: boolean = false;
  selectedPlayer: string | null = null;
  players: { player: string }[] = [];
  selectedGameId: number | null = null;
  isReroll: boolean = false;
  playerRgscInfo: any | undefined = undefined;

  getPlayerList = () => {
    this.tavisService?.getBcmPlayerList().subscribe((playerList: any) => {
      this.players = playerList.sort();
    });
  };

  rollRandom() {
    this.randomIsLoading = true;
    this.tavisService
      ?.rollRandom(this.selectedPlayer, this.selectedGameId)
      .subscribe({
        next: (data) => {
          this.dialog.open(RandomGamesDialogComponent, {
            data: data,
          });

          this.loadPlayerRgscs();
          this.randomIsLoading = false;
        },
        error: () => {
          alert('No one left to roll!');
        },
      });
  }

  produceStatReport() {
    this.tavisService?.produceStatReport().subscribe((data) => {
      console.log(data);
    });
  }

  recalcBcmLeaderboard() {
    this.tavisService?.recalcBcmLeaderboard().subscribe((data) => {
      console.log(data);
    });
  }

  loadPlayerRgscs() {
    if (!this.isReroll) return;

    this.tavisService
      ?.getPlayerRgscs(this.selectedPlayer!)
      .subscribe((data: any) => {
        this.playerRgscInfo = data;
      });
  }
}
