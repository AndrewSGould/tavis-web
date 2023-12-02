import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-random-games-dialog',
  templateUrl: '../../dialogs/random-games/random-games-dialog.html',
})
export class RandomGamesDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    console.log(this.data);
  }
}

export interface DialogData {
  invalids: any;
  fullList: any;
}
