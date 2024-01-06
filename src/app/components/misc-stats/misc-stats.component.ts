import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';
@Component({
  selector: 'app-misc-stats',
  templateUrl: './misc-stats.component.html',
  styleUrls: ['./misc-stats.component.scss'],
})
export class MiscStatsComponent implements OnInit {
  playerName: string | null | undefined = null;
  bcmPlayerSummary: any = null;
  isPlayerLoading: boolean = true;
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: 'asc',
  };

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {}

  ngOnInit(): void {
    this.playerName = this.route.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('No player found?');
      return;
    }

    this.bcmService.getBcmPlayerWithGames(this.playerName).subscribe({
      next: (data) => {
        this.bcmPlayerSummary = data;
        this.isPlayerLoading = false;
        console.log(data);
      },
      error: (err: any) => {
        this.isPlayerLoading = false;
        alert(err);
      },
    });
  }

  handleImageLoad(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = '../../../assets/no-login_robot.png';
  }
}
