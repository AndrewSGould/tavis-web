import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { BcmService } from 'src/app/services/bcm.service';

@Component({
  selector: 'app-bcm-reg-dialog',
  templateUrl: '../../dialogs/bcm-reg/bcm-reg-dialog.html',
})
export class BcmRegDialogComponent {
  validTrackingDate: Date = new Date('2024-01-02');
  today: Date = new Date();
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datePipe: DatePipe,
    public bcmService: BcmService,
    public dialogRef: MatDialogRef<BcmRegDialogComponent>
  ) {}

  registerForBcm = () => {
    this.isLoading = true;

    this.bcmService
      .postBcmRegistration()
      .subscribe((registrationDate: Date) => {
        this.isLoading = false;
        this.data = registrationDate;
        this.dialogRef.close();
      });
  };
}
