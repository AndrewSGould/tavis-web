// TODO: clean up the different uses of the urls..

// eslint-disable-next-line import/prefer-default-export
export const environment = {
  production: false,
  api: {
    domain: 'bcmx.org',
    base: 'https://www.bcmx.org/',
    baseUrl: 'https://www.bcmx.org/api/',
    token: 'https://www.bcmx.org/api/token/refresh',
  },
  discordSignin:
    'https://discord.com/api/oauth2/authorize?client_id=1159341858862940190&redirect_uri=http%3A%2F%2Fbcmx.org%2Fprofile&response_type=token&scope=identify%20connections%20guilds.members.read%20guilds.join%20guilds',
};
