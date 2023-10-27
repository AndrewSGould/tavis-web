import { environment } from '../environments/environment';

const getBcmLeaderboardList = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/getBcmLeaderboardList`).then((response) => response.json());
};

const getBcmPlayer = (id: number): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/getBcmPlayer?playerId=${id}`).then((response) => response.json());
};

const getBcmRgsc = (id: number): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/rgscStats?playerId=${id}`).then((response) => response.json());
};

export { getBcmLeaderboardList, getBcmPlayer, getBcmRgsc };
