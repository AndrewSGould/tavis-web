export const environment = {
  production: false,
  api: {
    domain: 'bcmx.org',
    base: 'https://bcmx.org/',
    baseUrl: 'https://bcmx.org/api/',
    token: 'https://bcmx.org/api/token/refresh',
  },
  discordSignin:
    'https://discord.com/api/oauth2/authorize?client_id=1163210249864495274&redirect_uri=https%3A%2F%2Fbcmx.org%2Fprofile&response_type=token&scope=identify%20guilds%20guilds.join%20guilds.members.read',
  // TODO: instead of token, we should do code?
};
