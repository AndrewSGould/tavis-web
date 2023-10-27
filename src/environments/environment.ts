// TODO: clean up the different uses of the urls..

// eslint-disable-next-line import/prefer-default-export
export const environment = {
  production: false,
  api: {
    domain: 'localhost:4300',
    base: 'http://localhost:4300/',
    baseUrl: 'http://localhost:4300/api/',
    token: 'http://localhost:4300/api/token/refresh',
  },
  discordSignin:
    'https://discord.com/api/oauth2/authorize?client_id=1159341858862940190&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fprofile&response_type=token&scope=identify%20connections%20guilds.members.read%20guilds.join%20guilds',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
