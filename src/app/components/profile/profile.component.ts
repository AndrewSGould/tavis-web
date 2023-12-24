import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/models/authenticated-response.model';
import { DiscordAuth } from 'src/app/models/discord-auth.model';
import { DiscordService } from 'src/app/services/discord.service';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { BcmRegDialogComponent } from 'src/app/dialogs/bcm-reg/bcm-reg-dialog';
import { BcmUnregDialogComponent } from 'src/app/dialogs/bcm-unreg/bcm-unreg-dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as isoCountries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  discordSignin: string = environment.discordSignin;
  discordUser: string | undefined = undefined;
  isUserAuthenticated: boolean = false;
  bcmRegStatus: boolean = false;
  origBcmRegStatus: boolean = false;
  bcmRegDate: Date | undefined = undefined;
  gamertag: string | undefined = undefined;

  authCheckLoading: boolean = true;
  discordCheckLoading: boolean = true;
  rolesCheckLoading: boolean = true;
  regCheckLoading: boolean = true;
  locationLoading: boolean = false;
  locUpdated: boolean = false;
  form: FormGroup;
  countries: { code: string; name: string }[] = [];
  states: { code: string; name: string }[] = [];
  roles: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private discordService: DiscordService,
    private jwtService: JwtService,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.route = route;
    this.http = http;
    this.userService = userService;
    this.discordService = discordService;
    this.jwtService = jwtService;
    this.router = router;
    this.location = location;
    this.dialog = dialog;

    this.form = this.fb.group({
      country: [''],
      state: [''],
    });
  }

  ngOnInit(): void {
    isoCountries.registerLocale(en);

    this.userService.user$.subscribe((data) => {
      if (data.roles.length === 0 && !localStorage.getItem('roles'))
        this.userService.fetchRoles().subscribe((data: string[]) => {
          this.roles = data;
          console.log(data);
          this.userService.updateUserRoles(data);
          this.rolesCheckLoading = false;
        });
      else {
        this.roles = JSON.parse(localStorage.getItem('roles')!);
        this.rolesCheckLoading = false;
      }
    });

    this.countries = Object.entries(isoCountries.getNames('en'))
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => {
        if (a.name.toLowerCase() === 'united states of america') {
          return -1;
        } else if (b.name.toLowerCase() === 'united states of america') {
          return 1;
        }
        return a.name.localeCompare(b.name);
      });

    this.states = [
      { code: 'AL', name: 'Alabama' },
      { code: 'AK', name: 'Alaska' },
      { code: 'AZ', name: 'Arizona' },
      { code: 'AR', name: 'Arkansas' },
      { code: 'CA', name: 'California' },
      { code: 'CO', name: 'Colorado' },
      { code: 'CT', name: 'Connecticut' },
      { code: 'DE', name: 'Delaware' },
      { code: 'FL', name: 'Florida' },
      { code: 'GA', name: 'Georgia' },
      { code: 'HI', name: 'Hawaii' },
      { code: 'ID', name: 'Idaho' },
      { code: 'IL', name: 'Illinois' },
      { code: 'IN', name: 'Indiana' },
      { code: 'IA', name: 'Iowa' },
      { code: 'KS', name: 'Kansas' },
      { code: 'KY', name: 'Kentucky' },
      { code: 'LA', name: 'Louisiana' },
      { code: 'ME', name: 'Maine' },
      { code: 'MD', name: 'Maryland' },
      { code: 'MA', name: 'Massachusetts' },
      { code: 'MI', name: 'Michigan' },
      { code: 'MN', name: 'Minnesota' },
      { code: 'MS', name: 'Mississippi' },
      { code: 'MO', name: 'Missouri' },
      { code: 'MT', name: 'Montana' },
      { code: 'NE', name: 'Nebraska' },
      { code: 'NV', name: 'Nevada' },
      { code: 'NH', name: 'New Hampshire' },
      { code: 'NJ', name: 'New Jersey' },
      { code: 'NM', name: 'New Mexico' },
      { code: 'NY', name: 'New York' },
      { code: 'NC', name: 'North Carolina' },
      { code: 'ND', name: 'North Dakota' },
      { code: 'OH', name: 'Ohio' },
      { code: 'OK', name: 'Oklahoma' },
      { code: 'OR', name: 'Oregon' },
      { code: 'PA', name: 'Pennsylvania' },
      { code: 'RI', name: 'Rhode Island' },
      { code: 'SC', name: 'South Carolina' },
      { code: 'SD', name: 'South Dakota' },
      { code: 'TN', name: 'Tennessee' },
      { code: 'TX', name: 'Texas' },
      { code: 'UT', name: 'Utah' },
      { code: 'VT', name: 'Vermont' },
      { code: 'VA', name: 'Virginia' },
      { code: 'WA', name: 'Washington' },
      { code: 'WV', name: 'West Virginia' },
      { code: 'WI', name: 'Wisconsin' },
      { code: 'WY', name: 'Wyoming' },
    ];

    this.origBcmRegStatus = this.bcmRegStatus;

    this.jwtService.token.subscribe((token) => {
      if (!token) token = localStorage.getItem('jwt') ?? '';
      this.isUserAuthenticated = !this.jwtService.isTokenExpired(token);
      this.authCheckLoading = false;
    });

    this.userService.xblUser$.subscribe((data: any) => {
      this.gamertag = data.gamertag;
    });

    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.login(code);
      }

      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [accessToken, tokenType] = [
        fragment.get('access_token'),
        fragment.get('token_type'),
      ];

      if (accessToken) {
        this.connectDiscord(tokenType!, accessToken);
        this.getRegistrations();
        this.getUserLocation();
      }

      if (!code && !accessToken) {
        this.retrieveDiscord();
        this.getRegistrations();
        this.getUserLocation();
      }
    });
  }

  login = (openXblCode: string) => {
    this.http
      .post<AuthenticatedResponse>(
        environment.api.baseUrl + 'auth/login',
        { openXblCode },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('gamertag', response.gamertag);
          localStorage.setItem('avatar', response.avatar);
          localStorage.setItem('roles', JSON.stringify(response.roles));

          this.userService.updateProfile({
            gamertag: response.gamertag,
            avatar: response.avatar,
          });

          this.userService.updateUser({ roles: response.roles });

          this.jwtService.updateToken(response.token);

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              code: null,
            },
            queryParamsHandling: 'merge',
          });

          this.retrieveDiscord();
        },
        error: (err: any) => {
          this.authCheckLoading = false;
          this.discordCheckLoading = false;
          this.rolesCheckLoading = false;
          this.regCheckLoading = false;
          if (!err.includes('403 Forbidden')) alert(err);
          console.error(err);
        },
      });
  };

  connectDiscord = (tokenType: string, accessToken: string) => {
    this.http
      .post<DiscordAuth>(
        environment.api.baseUrl + 'auth/integrate-discord',
        { tokenType, accessToken },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('roles', JSON.stringify(response.roles));
          this.userService.updateUser({ roles: response.roles });
          this.roles = JSON.parse(localStorage.getItem('roles')!);

          this.location.replaceState(this.location.path().split('#')[0]);

          this.retrieveDiscord();
        },
        error: (err: any) => {
          this.authCheckLoading = false;
          this.discordCheckLoading = false;
          this.rolesCheckLoading = false;
          this.regCheckLoading = false;
          if (!err.includes('403 Forbidden')) alert(err);
          console.error(err);
        },
      });
  };

  retrieveDiscord = () => {
    this.discordService.getConnection().subscribe({
      next: (data: any) => {
        if (data) this.discordUser = data.globalName;
        this.discordCheckLoading = false;
      },
      error: (err: any) => {
        this.authCheckLoading = false;
        this.discordCheckLoading = false;
        this.rolesCheckLoading = false;
        this.regCheckLoading = false;
        console.error(err);
      },
    });
  };

  onBcmReg(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      let dialog = this.dialog.open(BcmRegDialogComponent, {
        data: {},
        maxWidth: '700px',
      });

      dialog.backdropClick().subscribe(() => {
        this.bcmRegStatus = this.origBcmRegStatus;
      });

      dialog.afterClosed().subscribe((data: any) => {
        if (data) {
          this.bcmRegDate = data.registrationDate.regDate;
          this.roles = data.roles;
          localStorage.setItem('roles', JSON.stringify(data.roles));
          this.userService.updateUser({ roles: data.roles });
        }
      });
    } else {
      let dialog = this.dialog.open(BcmUnregDialogComponent, {
        data: {},
        maxWidth: '700px',
      });

      dialog.backdropClick().subscribe(() => {
        this.bcmRegStatus = this.origBcmRegStatus;
      });
    }
  }

  getRegistrations(): void {
    this.userService.fetchRegistrations().subscribe({
      next: (registration: any) => {
        this.regCheckLoading = false;
        if (!registration) return;

        if (registration.name === 'Better Completions Matter') {
          this.bcmRegStatus = this.origBcmRegStatus = true;
          this.bcmRegDate = registration.date;
        }
      },
      error: (err: any) => {
        this.authCheckLoading = false;
        this.discordCheckLoading = false;
        this.rolesCheckLoading = false;
        this.regCheckLoading = false;

        if (!err.includes('403 Forbidden')) alert(err);
        console.error(err);
        this.regCheckLoading = false;
      },
    });

    this.discordService.getConnection().subscribe({
      next: (data: any) => {
        if (data) this.discordUser = data.globalName;
        this.discordCheckLoading = false;
      },
      error: (err: any) => {
        this.authCheckLoading = false;
        this.discordCheckLoading = false;
        this.rolesCheckLoading = false;
        this.regCheckLoading = false;
        console.error(err);
      },
    });
  }

  updateUserLocation = () => {
    this.locationLoading = true;
    this.userService.updateUserLocation(this.form.value).subscribe(() => {
      this.locationLoading = false;
      this.locUpdated = true;

      setTimeout(() => {
        this.locUpdated = false;
      }, 3000);
    });
  };

  getUserLocation = () => {
    this.userService.getUserLocation().subscribe((data: any) => {
      this.form.patchValue({
        country: data.country,
        state: data.state,
      });
    });
  };

  resetStateSelection = () => {
    this.form.get('state')?.reset();
  };
}
