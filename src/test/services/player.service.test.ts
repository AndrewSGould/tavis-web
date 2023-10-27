import { getCompletedGames } from '../../services/player.service';

describe('getCompletedGames', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call fetch with the correct URL', async () => {
    const playerId = 123;
    await getCompletedGames(playerId);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4300/api/player/getCompletedGames?playerId=123',
    );
  });

  it('should return the parsed JSON response', async () => {
    const playerId = 123;
    const response = await getCompletedGames(playerId);
    expect(response).toEqual({});
  });
});
