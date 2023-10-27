import {
  getBcmLeaderboardList,
  getBcmPlayer,
  getBcmRgsc,
} from '../../services/bcm.service';
import { environment } from '../../environments/environment';

describe('BCM Service', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getBcmLeaderboardList', () => {
    it('should call fetch with the correct URL', async () => {
      const { baseUrl } = environment.api;
      await getBcmLeaderboardList();
      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}bcm/getBcmLeaderboardList`,
      );
    });

    it('should return the parsed JSON response', async () => {
      const response = await getBcmLeaderboardList();
      expect(response).toEqual({});
    });
  });

  describe('getBcmPlayer', () => {
    it('should call fetch with the correct URL', async () => {
      const { baseUrl } = environment.api;
      const playerId = 123;
      await getBcmPlayer(playerId);
      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}bcm/getBcmPlayer?playerId=${playerId}`,
      );
    });

    it('should return the parsed JSON response', async () => {
      const playerId = 123;
      const response = await getBcmPlayer(playerId);
      expect(response).toEqual({});
    });
  });

  describe('getBcmRgsc', () => {
    it('should call fetch with the correct URL', async () => {
      const { baseUrl } = environment.api;
      const playerId = 123;
      await getBcmRgsc(playerId);
      expect(global.fetch).toHaveBeenCalledWith(
        `${baseUrl}bcm/rgscStats?playerId=${playerId}`,
      );
    });

    it('should return the parsed JSON response', async () => {
      const playerId = 123;
      const response = await getBcmRgsc(playerId);
      expect(response).toEqual({});
    });
  });
});
