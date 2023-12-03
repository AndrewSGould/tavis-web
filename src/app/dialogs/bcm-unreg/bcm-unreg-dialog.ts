import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bcm-unreg-dialog',
  templateUrl: '../../dialogs/bcm-unreg/bcm-unreg-dialog.html',
})
export class BcmUnregDialogComponent implements OnInit {
  validTrackingDate: Date = new Date('2024-01-02');
  today: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datePipe: DatePipe
  ) {
    this.datePipe = datePipe;
  }

  ngOnInit() {}
}
