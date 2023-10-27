import { environment } from '../environments/environment';

const fullSync = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}datasync/full`).then((response) => response.json());
};

const syncInfo = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}datasync/syncInfo`).then((response) => response.json());
};

const verifyRandomGameEligibility = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/verifyRandomGameEligibility`).then((response) => response.json());
};

const updateGameInfo = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}datasync/testSyncGameInfo`).then((response) => response.json());
};

const testGwgParse = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}datasync/testGwgParse`).then((response) => response.json());
};

const syncLastMonthsCompletions = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}datasync/lastmonthscompletions`).then((response) => response.json());
};

const produceBcmReport = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/produceBcmReport`).then((response) => response.json());
};

const produceStatReport = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/produceStatReport`).then((response) => response.json());
};

const produceCompletedGamesReport = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/produceCompletedGamesReport`).then((response) => response.json());
};

const recalcBcmLeaderboard = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/recalcBcmLeaderboard`).then((response) => response.json());
};

const unique14chars = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}bcm/unique14chars`).then((response) => response.json());
};

const getAvailableRegions = (): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}user/availableRegions`).then((response) => response.json());
};

const getAvailableAreas = (region: string): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}user/availableAreas?selectedRegion=${region}`).then(
    (response) => response.json(),
  );
};

const create = (data: any): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const update = (id: any, data: any): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const remove = (id: any): Promise<any> => {
  const { baseUrl } = environment.api;
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json());
};

export {
  fullSync,
  syncInfo,
  verifyRandomGameEligibility,
  updateGameInfo,
  testGwgParse,
  syncLastMonthsCompletions,
  produceBcmReport,
  produceStatReport,
  produceCompletedGamesReport,
  recalcBcmLeaderboard,
  unique14chars,
  getAvailableRegions,
  getAvailableAreas,
  create,
  update,
  remove,
};
