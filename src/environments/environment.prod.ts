// TODO: clean up the different uses of the urls..

export const environment = {
  production: false,
  api: {
    domain: 'bcmx.org',
    base: 'https://www.bcmx.org/',
    baseUrl: 'https://www.bcmx.org/api/',
    token: 'https://www.bcmx.org/api/token/refresh',
  },
  discordSignin:
    'https://discord.com/api/oauth2/authorize?client_id=1164395698586910761&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fprofile&response_type=code&scope=guilds%20identify%20guilds.join%20guilds.members.read',
};
