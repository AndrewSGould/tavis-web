import { Component, Inject, OnInit } from '@angular/core';
import { TavisService } from 'src/app/services/tavis.service';
import { MatDialog } from '@angular/material/dialog';
import { RandomGamesDialogComponent } from 'src/app/dialogs/random-games/random-games-dialog';

@Component({
  selector: 'app-bcm-admin',
  templateUrl: './bcm-admin.component.html',
})
export class BcmAdminComponent {
  constructor(private tavisService: TavisService, public dialog: MatDialog) {}

  rollRandom() {
    this.tavisService?.rollRandom().subscribe({
      next: (data) => {
        this.dialog.open(RandomGamesDialogComponent, {
          data: data,
        });
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
}
