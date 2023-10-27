/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { setOrdinal } from '../utils/ordinal';
import { getBcmPlayer, getBcmRgsc } from '../services/bcm.service';
import { dateToString } from '../utils/date';

interface PlayerParams {
  id: string;
  [key: string]: string | undefined;
}

const Player = () => {
  const { id } = useParams<PlayerParams>();
  const [bcmPlayerSummary, setBcmPlayerSummary] = useState<any>(null);
  const [rgscSummary, setRgscSummary] = useState<any>(null);

  if (!id) {
    return <Navigate to="/not-found" replace />;
  }

  useEffect(() => {
    try {
      const idInt = parseInt(id, 10);
      getBcmPlayer(idInt).then((data) => {
        setBcmPlayerSummary(data);
      });
      getBcmRgsc(idInt).then((data) => {
        setRgscSummary(data);
      });
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  return (
    <section className="flex flex-col items-center">
      <div className="m-4 w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 shadow">
        <div className="flex flex-col items-center p-4">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="/no-login_robot.png"
            alt="Player avatar"
          />
          <h5 className="mb-1 text-xl font-medium text-white">
            {bcmPlayerSummary.player.name}
            &nbsp;(
            {setOrdinal(bcmPlayerSummary.ranking.rank)}
          </h5>
          <span className="text-sm text-gray-400">
            {bcmPlayerSummary.player.region}-{bcmPlayerSummary.player.area}
          </span>
        </div>
        <div className="p flex flex-col items-center pb-4 text-xs text-gray-300">
          <span>Total Score: {bcmPlayerSummary.score}</span>
        </div>
      </div>

      <ul className="list-inside space-y-1 text-center text-gray-400">
        <li>
          RGSC:
          <span className="font-semibold text-white">
            {rgscSummary.rgscsCompleted}
            /12
          </span>
          with
          <span className="font-semibold text-white">
            {rgscSummary.currentRandom.title}
          </span>
          and
          <span className="font-semibold text-white">
            {rgscSummary.rerollsRemaining}
          </span>
          rerolls left
        </li>
        <li>
          ABC Challenge:
          <span className="font-semibold text-white">15/25</span> | Odd Jobs:
          <span className="font-semibold text-white">4/5</span> | Yearlies:
          <span className="font-semibold text-white">12/52</span>
        </li>
      </ul>

      <div className="m-5 inline-flex rounded-md shadow-sm">
        <a
          aria-current="page"
          className="rounded-l-lg border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 hover:text-white focus:z-10 focus:text-white focus:ring-2 focus:ring-green-500"
          href="/"
        >
          RGSC
        </a>
        <a
          href="/"
          className="border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 hover:text-white focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500"
        >
          ABC
        </a>
        <a
          href="/"
          className="border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 hover:text-white focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500"
        >
          Completed Games
        </a>
        <a
          href="/"
          className="border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 hover:text-white focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500"
        >
          Odd Jobs
        </a>
        <a
          href="/"
          className="rounded-r-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 hover:text-white focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500"
        >
          Yearlies
        </a>
      </div>

      <table className="w-full text-left text-sm text-gray-400">
        <thead className="bg-gray-700 text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Ratio
            </th>
            <th scope="col" className="px-6 py-3">
              Estimate
            </th>
            <th scope="col" className="px-6 py-3">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {bcmPlayerSummary.games &&
            bcmPlayerSummary.games.map((game: any) => (
              <tr
                className="border-b border-gray-700 bg-gray-800"
                key={game.id}
              >
                <td className="px-6 py-4">
                  {dateToString(game.completionDate)}
                </td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  {game.title}
                </th>
                <td className="px-6 py-4">{game.ratio}</td>
                <td className="px-6 py-4">{game.estimate || '--'}</td>
                <td className="px-6 py-4">
                  {game.estimate !== null ? game.points : '--'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Player;
