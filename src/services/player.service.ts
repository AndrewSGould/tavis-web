// eslint-disable-next-line import/no-unresolved
import { environment } from '../environments/environment';

const getCompletedGames = (id: number): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}player/getCompletedGames?playerId=${id}`).then(
    (response) => response.json(),
  );
};

// eslint-disable-next-line import/prefer-default-export
export { getCompletedGames };
