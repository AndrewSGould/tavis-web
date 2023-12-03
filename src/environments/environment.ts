export const environment = {
  production: false,
  api: {
    domain: 'localhost',
    base: 'http://localhost:4300/',
    baseUrl: 'http://localhost:4300/',
    token: 'http://localhost:4300/token/refresh',
  },
  discordSignin:
    //'https://discord.com/api/oauth2/authorize?client_id=1163210249864495274&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fprofile&response_type=token&scope=identify%20guilds%20guilds.join%20guilds.members.read',
    'https://discord.com/api/oauth2/authorize?client_id=1163210249864495274&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fprofile&scope=identify+guilds+guilds.join+guilds.members.read',
};
