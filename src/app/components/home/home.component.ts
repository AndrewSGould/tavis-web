import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenXblService } from 'src/app/services/openxbl.service';
import { TavisService } from 'src/app/services/tavis.service';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    tavisService: TavisService,
    private route: ActivatedRoute,
    private openXblService: OpenXblService
  ) {
    this.tavisService = tavisService;
    this.route = route;
  }

  tavisService: TavisService | null = null;
  players: Player[] = [];
  completedGames: Game[] = [];

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   const code = params['code'];
    //   if (!code) return;
    //   this.openXblService.connect(code);
    // });
  }
}
