import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcmService } from 'src/app/services/bcm.service';

@Component({
  selector: 'app-profile-abc',
  templateUrl: './abc.component.html',
})
export class AbcComponent implements OnInit {
  playerName: string | null | undefined = null;
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  highlightedLetters: any = null;

  constructor(private route: ActivatedRoute, private bcmService: BcmService) {}

  ngOnInit(): void {
    this.playerName = this.route.parent?.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      return;
    }
  }

  exists(letter: string): boolean {
    return this.highlightedLetters.includes(letter);
  }
}
