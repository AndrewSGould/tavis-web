export const environment = {
  production: false,
  api: {
    domain: 'bcmx.org',
    base: 'https://www.bcmx.org/',
    baseUrl: 'https://www.bcmx.org/api/',
    token: 'https://www.bcmx.org/api/token/refresh',
  },
  discordSignin:
    'https://discord.com/api/oauth2/authorize?client_id=1163210249864495274&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fprofile&response_type=token&scope=guilds%20identify%20guilds.members.read',
  // TODO: instead of token, we should do code?
};
