import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TavisService } from 'src/app/services/tavis.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-yearlies',
  templateUrl: './yearlies.component.html',
})
export class YearliesComponent implements OnInit {
  playerName: string | null = null;
  currentUser: string | null = null;
  userService: UserService | undefined = undefined;
  commStarData: any = undefined;
  theTavisData: any = undefined;
  retirementData: any = undefined;
  communityStarVisible: boolean = true;
  theTavisVisible: boolean = false;
  retirementParty: boolean = false;
  writeinSaving: boolean = true;

  private tavisService: TavisService | null = null;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    userService: UserService,
    tavisService: TavisService
  ) {
    this.route.params.subscribe(() => {
      this.loadPage();
    });

    this.userService = userService;
    this.tavisService = tavisService;
  }

  loadPage = () => {
    this.playerName = this.route.snapshot.paramMap.get('player');

    if (!this.playerName) {
      alert('no player found?');
      return;
    }
  };

  toggleCategory(category: string) {
    if (category === 'communityStar') {
      this.theTavisVisible = false;
      this.retirementParty = false;

      this.communityStarVisible = !this.communityStarVisible;
    }
    if (category === 'theTavis') {
      this.communityStarVisible = false;
      this.retirementParty = false;

      this.theTavisVisible = !this.theTavisVisible;
    }
    if (category === 'retirementParty') {
      this.communityStarVisible = false;
      this.theTavisVisible = false;

      this.retirementParty = !this.retirementParty;
    }
  }

  toggleStarSection(index: number) {
    const ogState = this.commStarData[index].isVisible;

    this.commStarData.forEach((item: any) => {
      item.isVisible = false;
    });

    this.commStarData[index].isVisible = !ogState;
  }

  toggleTavisSection(index: number) {
    const ogState = this.theTavisData[index].isVisible;

    this.theTavisData.forEach((item: any) => {
      item.isVisible = false;
    });

    this.theTavisData[index].isVisible = !ogState;
  }

  togglePartySection(index: number) {
    const ogState = this.retirementData[index].isVisible;

    this.retirementData.forEach((item: any) => {
      item.isVisible = false;
    });

    this.retirementData[index].isVisible = !ogState;
  }

  ngOnInit(): void {
    this.userService?.xblUser.subscribe((data) => {
      if (!data.avatar && !data.gamertag && localStorage.getItem('gamertag')) {
        this.userService?.updateProfile({
          avatar: localStorage.getItem('avatar')!,
          gamertag: localStorage.getItem('gamertag')!,
        });

        this.currentUser = localStorage.getItem('gamertag')!;
      } else this.currentUser = data.gamertag;
    });

    this.tavisService?.getYearlies(this.playerName!).subscribe((data: any) => {
      data = data.map((el: any) => {
        el.playerYearlyChallenge = el.playerYearlyChallenge ?? {};

        const option = !!el?.playerYearlyChallenge?.writeIn
          ? 'writein'
          : undefined;

        return { ...el, option };
      });

      this.commStarData = data?.filter(
        (x: any) => x.yearlyChallenge.category === 0
      );

      this.theTavisData = data?.filter(
        (x: any) => x.yearlyChallenge.category === 1
      );

      this.retirementData = data?.filter(
        (x: any) => x.yearlyChallenge.category === 2
      );
    });
  }

  saveTaLink = (item: any) => {
    if (this.currentUser === this.playerName)
      this.tavisService!.saveWriteIn(item).subscribe((data: any) => {
        const commIndex = this.commStarData.findIndex(
          (x: any) => x.yearlyChallenge.id === data.yearlyChallengeId
        );
        const tavisIndex = this.theTavisData.findIndex(
          (x: any) => x.yearlyChallenge.id === data.yearlyChallengeId
        );
        const retirementIndex = this.retirementData.findIndex(
          (x: any) => x.yearlyChallenge.id === data.yearlyChallengeId
        );

        if (commIndex !== -1) {
          this.commStarData[commIndex].playerYearlyChallenge.game = data.game;
          this.commStarData[commIndex].playerYearlyChallenge.approved =
            data.approved;
        }
        if (tavisIndex === -1) {
          this.theTavisData[tavisIndex].playerYearlyChallenge.game = data.game;
          this.theTavisData[tavisIndex].playerYearlyChallenge.approved =
            data.approved;
        }

        if (retirementIndex === -1) {
          this.retirementData[retirementIndex].playerYearlyChallenge.game =
            data.game;
          this.retirementData[retirementIndex].playerYearlyChallenge.approved =
            data.approved;
        }

        this.cdr.detectChanges();
      });
  };

  saveReasoning = (item: any) => {
    if (this.currentUser === this.playerName)
      this.tavisService!.saveWriteIn(item).subscribe((data: any) => {
        const commIndex = this.commStarData.findIndex(
          (x: any) => x.yearlyChallenge.id === data.yearlyChallengeId
        );
        const tavisIndex = this.theTavisData.findIndex(
          (x: any) => x.yearlyChallenge.id === data.yearlyChallengeId
        );
        const retirementIndex = this.retirementData.findIndex(
          (x: any) => x.yearlyChallenge.id === data.yearlyChallengeId
        );

        if (commIndex !== -1) {
          this.commStarData[commIndex].playerYearlyChallenge.game = data.game;
          this.commStarData[commIndex].playerYearlyChallenge.approved =
            data.approved;
        }
        if (tavisIndex === -1) {
          this.theTavisData[tavisIndex].playerYearlyChallenge.game = data.game;
          this.theTavisData[tavisIndex].playerYearlyChallenge.approved =
            data.approved;
        }

        if (retirementIndex === -1) {
          this.retirementData[retirementIndex].playerYearlyChallenge.game =
            data.game;
          this.retirementData[retirementIndex].playerYearlyChallenge.approved =
            data.approved;
        }

        this.cdr.detectChanges();
      });
  };
}
