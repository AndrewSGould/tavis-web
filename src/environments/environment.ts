// TODO: clean up the different uses of the urls..

export const environment = {
  production: false,
  api: {
    domain: 'localhost:4300',
    base: 'http://localhost:4300/',
    baseUrl: 'http://localhost:4300/api/',
    token: 'http://localhost:4300/api/token/refresh',
  },
  discordSignin:
    'https://discord.com/api/oauth2/authorize?client_id=1164407904548438076&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fprofile&response_type=token&scope=identify%20guilds%20guilds.join%20guilds.members.read',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
