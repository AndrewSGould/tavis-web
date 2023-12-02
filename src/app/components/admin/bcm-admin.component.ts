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

  ngOnInit(): void {}

  verifyRandomGameEligibility() {
    this.tavisService?.verifyRandomGameEligibility().subscribe((data) => {
      this.dialog.open(RandomGamesDialogComponent, {
        data: data,
        height: '80%',
        width: '50%',
      });
    });
  }

  produceBcmReport() {
    this.tavisService?.produceBcmReport().subscribe((data) => {
      console.log(data);
    });
  }

  produceStatReport() {
    this.tavisService?.produceStatReport().subscribe((data) => {
      console.log(data);
    });
  }

  produceCompletedGamesReport() {
    this.tavisService?.produceCompletedGamesReport().subscribe((data) => {
      console.log(data);
    });
  }

  recalcBcmLeaderboard() {
    this.tavisService?.recalcBcmLeaderboard().subscribe((data) => {
      console.log(data);
    });
  }
}
