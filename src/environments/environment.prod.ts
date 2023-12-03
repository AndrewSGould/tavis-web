// TODO: clean up the different uses of the urls..

export const environment = {
  production: false,
  api: {
    domain: 'bcmx.org',
    base: 'https://bcmx.org/',
    baseUrl: 'https://api.bcmx.org/',
    token: 'https://api.bcmx.org/token/refresh',
  },
  discordSignin:
    'https://discord.com/api/oauth2/authorize?client_id=1163210249864495274&response_type=token&redirect_uri=https%3A%2F%2Fbcmx.org%2Fprofile&scope=identify+guilds+guilds.join+guilds.members.read',
};
