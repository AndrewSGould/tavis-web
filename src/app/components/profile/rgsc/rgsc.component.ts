import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';

@Component({
  selector: 'app-profile-rgsc',
  templateUrl: './rgsc.component.html',
})
export class RgscComponent implements OnInit {
  playerName: string | null | undefined = null;
  rgscSummary: any = null;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {}

  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      return;
    }

    this.bcmService.getRgscSummary(this.playerName).subscribe((data) => {
      this.rgscSummary = data;
      this.isLoading = false;
    });
  }
}
