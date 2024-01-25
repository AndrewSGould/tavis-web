import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accordion } from 'flowbite';
import type { AccordionInterface } from 'flowbite';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-yearlies',
  templateUrl: './yearlies.component.html',
})
export class YearliesComponent implements OnInit {
  playerName: string | null = null;
  currentUser: string | null = null;
  userService: UserService | undefined = undefined;
  communityStarVisible: boolean = true;
  theTavisVisible: boolean = false;
  retirementParty: boolean = false;

  constructor(private route: ActivatedRoute, userService: UserService) {
    this.route.params.subscribe(() => {
      this.loadPage();
    });

    this.userService = userService;
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
    const ogState = this.communityStarItems[index].isVisible;

    this.communityStarItems.forEach((item) => {
      item.isVisible = false;
    });

    this.communityStarItems[index].isVisible = !ogState;
  }

  toggleTavisSection(index: number) {
    const ogState = this.theTavisItems[index].isVisible;

    this.theTavisItems.forEach((item) => {
      item.isVisible = false;
    });

    this.theTavisItems[index].isVisible = !ogState;
  }

  togglePartySection(index: number) {
    const ogState = this.retirementPartyItems[index].isVisible;

    this.retirementPartyItems.forEach((item) => {
      item.isVisible = false;
    });

    this.retirementPartyItems[index].isVisible = !ogState;
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
  }

  communityStarItems = [
    {
      id: 1,
      title: 'A Wise Wookie Once Said',
      description: 'Complete any game with an audible fictional language',
      isVisible: false,
      option: '',
    },
    {
      id: 2,
      title: 'Captain Kirkland',
      description: 'Complete any game in which you can pilot a spaceship',
      isVisible: false,
      option: '',
    },
    {
      id: 3,
      title: "Dave's Buxom",
      description:
        'Complete any game featuring scantily clad women (or shirtless men!)',
      isVisible: false,
      option: '',
    },
    {
      id: 4,
      title: 'Ex-lax Gesture',
      description:
        'Complete any game where a character is able to use, or is portrayed as having used, the toilet',
      isVisible: false,
      option: '',
    },
    {
      id: 5,
      title: 'He was Going to Design a Challenge, but Then He Got High',
      description:
        'Complete any game in which your character can consume the drugs',
      isVisible: false,
      option: '',
    },
    {
      id: 6,
      title: "I Don't Even Know You And I Hate You",
      description:
        'Complete any game at or below a 2.5 star rating on TA, suckers',
      isVisible: false,
      option: '',
    },
    {
      id: 7,
      title: 'In the Vein of Nerdy Neo',
      description:
        'Complete any game tagged with the "Metroidvania" genre on TrueAchievements',
      isVisible: false,
      option: '',
    },
    {
      id: 8,
      title: "It's Garbage",
      description: "Complete any game that isn't in the Yakuza series",
      isVisible: false,
      option: '',
    },
    {
      id: 9,
      title: 'llams dna taerG',
      description:
        'Complete a game where you directly control an animal character',
      isVisible: false,
      option: '',
    },
    {
      id: 10,
      title: 'Match It!',
      description:
        'Complete any game that smrnov has completed throughout 2024',
      isVisible: false,
      option: '',
    },
    {
      id: 11,
      title: "Min's Best Friend",
      description:
        'Complete any game in which your character has a canine companion',
      isVisible: false,
      option: '',
    },
    {
      id: 12,
      title: 'My Mom Beat Zelda 2',
      description:
        "Complete any game in which your character's mother is represented or mentioned in game",
      isVisible: false,
      option: '',
    },
    {
      id: 13,
      title: 'Pretty Fly for an Albino Kid',
      description:
        'Complete any game that has a skin tone slider during character creation',
      isVisible: false,
      option: '',
    },
    {
      id: 14,
      title: 'Saben, of the Rothschilds',
      description:
        'Complete any game that has an achievement for accumulating currency',
      isVisible: false,
      option: '',
    },
    {
      id: 15,
      title: 'Scorching Strands',
      description:
        'Complete any game that has a character or creature with flames instead of hair',
      isVisible: false,
      option: '',
    },
    {
      id: 16,
      title: "Supafly Streamin'",
      description:
        'Complete any game that has been streamed on the official BCMX Twitch account',
      isVisible: false,
      option: '',
    },
    {
      id: 17,
      title: 'The Last of the Monacans',
      description:
        'Complete any game that has a title featuring the letter string "DD"',
      isVisible: false,
      option: '',
    },
    {
      id: 18,
      title: 'Ultimate Despair vs. Capcom 3',
      description:
        'Complete any game tagged with the "Fighting" genre on TrueAchievements',
      isVisible: false,
      option: '',
    },
    {
      id: 19,
      title: 'Welcome to Scardew Valley',
      description:
        'Complete any game that has a farming mechanic that is a major element in gameplay',
      isVisible: false,
      option: '',
    },
    {
      id: 20,
      title: 'Welldoneington Balbo',
      description:
        'Complete any game with an achievement flagged "Time Consuming"',
      isVisible: false,
      option: '',
    },
  ];

  theTavisItems = [
    {
      id: 1,
      title: 'The Curator',
      description:
        'Complete any game of the same genre as your most completed genre',
      isVisible: false,
      option: '',
    },
    {
      id: 2,
      title: 'The Explorer',
      description:
        'Complete any game in the bottom 50% of your most completed genres',
      isVisible: false,
      option: '',
    },
    {
      id: 3,
      title: 'The Connoisseur',
      description:
        'Complete any game with less than 5,000 tracked gamers and a rating over 4 on TrueAchievements',
      isVisible: false,
      option: '',
    },
    {
      id: 4,
      title: 'The Hipster',
      description: 'Complete any game with less than 1,000 tracked gamers',
      isVisible: false,
      option: '',
    },
    {
      id: 5,
      title: 'The Critic',
      description: 'Complete any game that has a Site Rating of 4.25 or higher',
      isVisible: false,
      option: '',
    },
    {
      id: 6,
      title: 'The Socialite',
      description:
        'Complete any game that was completed by 3 other BCM participants this year',
      isVisible: false,
      option: '',
    },
    {
      id: 7,
      title: 'The Inclusionist',
      description: 'Complete any game with Cross-Play or the Xbox on Steam tag',
      isVisible: false,
      option: '',
    },
    {
      id: 8,
      title: 'The Professional',
      description:
        'Complete any game that ranks in the top 10% of your highest ratio completed games of all time',
      isVisible: false,
      option: '',
    },
    {
      id: 9,
      title: 'The Contrarian',
      description:
        'Complete any game where your personal rating is 1.5 stars above or below the Site Average. You must rate the game on TA for this to count',
      isVisible: false,
      option: '',
    },
    {
      id: 10,
      title: 'The Pioneer',
      description: 'Complete any game with less than 100 completions',
      isVisible: false,
      option: '',
    },
    {
      id: 11,
      title: 'The Conformist',
      description: 'Complete any game with more than 7,500 tracked gamers',
      isVisible: false,
      option: '',
    },
    {
      id: 12,
      title: 'The Minimalist',
      description: 'Complete any game with an install size of under 200MB',
      isVisible: false,
      option: '',
    },
    {
      id: 13,
      title: 'The Hedonist',
      description: 'Complete any game with an install size of over 30GB',
      isVisible: false,
      option: '',
    },
    {
      id: 14,
      title: 'The Traditionalist',
      description: 'Complete any game that has exactly 50 achievements total',
      isVisible: false,
      option: '',
    },
    {
      id: 15,
      title: 'The Arcade Traditionalist',
      description: 'Complete any game that has exactly 12 achievements total',
      isVisible: false,
      option: '',
    },
    {
      id: 16,
      title: 'The Orthographer',
      description:
        'Complete any game where the title contains 14 or more unique letters',
      isVisible: false,
      option: '',
    },
    {
      id: 17,
      title: 'The Training Arc: The Calendar Project',
      description:
        'Complete any game that was released the year you joined Xbox Live. Are you ready to traverse history?',
      isVisible: false,
      option: '',
    },
    {
      id: 18,
      title: 'The Training Arc: The Genre Project',
      description:
        'Complete any game with 4 or more genres. Are you ready to collect them all?',
      isVisible: false,
      option: '',
    },
    {
      id: 19,
      title: 'The Training Arc: Head-to-Head',
      description:
        'Complete any game that includes an achievement flagged "versus", or "online skill". Are you ready to throw down?',
      isVisible: false,
      option: '',
    },
    {
      id: 20,
      title: 'The Training Arc: Raid Boss',
      description:
        'Complete any Xbox 360 game over 100 hours. Are you ready for the next battle?',
      isVisible: false,
      option: '',
    },
  ];

  retirementPartyItems = [
    {
      id: 1,
      title: 'Game Passed',
      description: "Complete any game after it's already left Game Pass",
      isVisible: false,
      option: '',
    },
    {
      id: 2,
      title: 'Hope There is a Guide',
      description:
        'Complete any game with 10 or more achievements flagged missable on TrueAchievements',
      isVisible: false,
      option: '',
    },
    {
      id: 3,
      title: "I Didn't Know that I Was Watching a Movie",
      description:
        'Complete any game with 1 cutscene that is at least 10 minutes or longer',
      isVisible: false,
      option: '',
    },
    {
      id: 4,
      title: 'Leave Your Xbox On',
      description:
        'Complete any game with an achievement for cumulative play time',
      isVisible: false,
      option: '',
    },
    {
      id: 5,
      title: 'Open Minded',
      description:
        'Complete any game where your character has access to mind control abilities',
      isVisible: false,
      option: '',
    },
    {
      id: 6,
      title: 'Pet Rock',
      description:
        'Complete any game where you can throw a rock to distract enemies (it must be a distraction mechanic, not an attack mechanic)',
      isVisible: false,
      option: '',
    },
    {
      id: 7,
      title: 'Prime Completions Matter',
      description: 'Complete any game published on Xbox by Prime Matter',
      isVisible: false,
      option: '',
    },
    {
      id: 8,
      title: 'Radiation Celebration',
      description:
        'Complete any game where your character can wear a gasmask or hazmat suit',
      isVisible: false,
      option: '',
    },
    {
      id: 9,
      title: 'They Said The Thing',
      description:
        'Complete any game where a character says the name of the game in the dialogue',
      isVisible: false,
      option: '',
    },
    {
      id: 10,
      title: 'What a Mouthful',
      description: 'Complete any game with six or more words in the title',
      isVisible: false,
      option: '',
    },
  ];
}
