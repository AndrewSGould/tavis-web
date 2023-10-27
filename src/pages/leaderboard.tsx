import React, { useEffect, useState } from 'react';
import { dateToString } from '../utils/date';
import { getBcmLeaderboardList } from '../services/bcm.service';
import { setOrdinal } from '../utils/ordinal';

const Leaderboard = () => {
  // const [leaderboard, setLeaderboard] = useState([]);
  const [lastScan, setLastScan] = useState(new Date());

  useEffect(() => {
    getBcmLeaderboardList().then((res) => {
      setLastScan(res.lastScan);
    });
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-400">
        <caption className="bg-gray-800 p-5 text-left text-lg font-semibold text-white">
          Better Completions Matter 2024
          <span className="text-sm font-thin text-gray-500">
            Last Updated:&nbsp;
            {dateToString(lastScan)}
          </span>
          <p className="mt-1 text-sm font-normal text-gray-400">
            This leaderboard updates automatically at the beginning of each
            month, defaulting users in descending order of Total Points
          </p>
        </caption>
        <thead className="bg-gray-700 text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="p-2 sm:p-4" />
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
              <label htmlFor="player-name">Player</label>
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2 text-center sm:table-cell sm:px-6 sm:py-3"
            >
              <label htmlFor="completions">Completions</label>
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2 text-center sm:px-6 sm:py-3 lg:table-cell"
            >
              Avg Ratio
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2 text-center sm:px-6 sm:py-3 lg:table-cell"
            >
              Highest Ratio
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2 text-center sm:px-6 sm:py-3 lg:table-cell"
            >
              Avg Time
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2 text-center sm:px-6 sm:py-3 lg:table-cell"
            >
              Highest Time
            </th>
            <th
              scope="col"
              className="hidden px-4 py-2 text-center sm:px-6 sm:py-3 md:table-cell"
            >
              Avg BCM Points
            </th>
            <th scope="col" className="px-4 py-2 text-center sm:px-6 sm:py-3">
              Total Points
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700 bg-gray-800 hover:cursor-pointer hover:bg-gray-600">
            <td className="w-1 p-1 sm:w-2 sm:p-2">
              <span className="text-lg font-bold text-yellow-400">
                {setOrdinal(1)}
              </span>
              <span className="text-center text-xs font-light">
                <br />
                (+2)
              </span>
            </td>
            <th
              scope="row"
              className="flex items-center whitespace-nowrap px-1 py-4 text-white"
            >
              <svg
                className="-left-1 h-6 w-6 text-gray-400 sm:h-8 sm:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="pl-2 sm:pl-3">
                <div className="font-normal sm:font-semibold">Matt Hazard</div>
                <div className="hidden text-xs font-normal text-gray-500 sm:block">
                  United States - North Carolina
                </div>
              </div>
            </th>
            <td className="hidden px-2 py-2 text-center sm:table-cell">114</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              3.584
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              14.837
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">34.9</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">500</td>
            <td className="hidden px-2 py-2 text-center md:table-cell">
              285.89
            </td>
            <td className="px-2 py-2 text-center">32592</td>
          </tr>
          <tr className="border-b border-gray-700 bg-gray-800 hover:cursor-pointer hover:bg-gray-600">
            <td className="w-1 p-1 sm:w-2 sm:p-2">
              <span className="text-lg font-bold text-slate-500">
                {setOrdinal(2)}
              </span>
              <span className="text-center text-xs font-light">
                <br />
                (-1)
              </span>
            </td>
            <th
              scope="row"
              className="flex items-center whitespace-nowrap px-1 py-4 text-white"
            >
              <svg
                className="-left-1 h-6 w-6 text-gray-400 sm:h-8 sm:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="pl-2 sm:pl-3">
                <div className="font-normal sm:font-semibold">Major Nelson</div>
                <div className="hidden text-xs font-normal text-gray-500 sm:block">
                  United States - Washington
                </div>
              </div>
            </th>
            <td className="hidden px-2 py-2 text-center sm:table-cell">240</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              2.429
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              10.680
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">20.8</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">1000</td>
            <td className="hidden px-2 py-2 text-center md:table-cell">
              101.60
            </td>
            <td className="px-2 py-2 text-center">24386</td>
          </tr>
          <tr className="border-b border-gray-700 bg-gray-800 hover:cursor-pointer hover:bg-gray-600">
            <td className="w-1 p-1 sm:w-2 sm:p-2">
              <span className="text-lg font-bold text-amber-900">
                {setOrdinal(3)}
              </span>
              <span className="text-center text-xs font-light">
                <br />
                (-1)
              </span>
            </td>
            <th
              scope="row"
              className="flex items-center whitespace-nowrap px-1 py-4 text-white"
            >
              <svg
                className="-left-1 h-6 w-6 text-gray-400 sm:h-8 sm:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="pl-2 sm:pl-3">
                <div className="font-normal sm:font-semibold">eohjay</div>
                <div className="hidden text-xs font-normal text-gray-500 sm:block">
                  United States - Ohio
                </div>
              </div>
            </th>
            <td className="hidden px-2 py-2 text-center sm:table-cell">67</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              3.755
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              11.871
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">32.0</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">257</td>
            <td className="hidden px-2 py-2 text-center md:table-cell">
              220.32
            </td>
            <td className="px-2 py-2 text-center">14762</td>
          </tr>
          <tr className="border-b border-gray-700 bg-gray-800 hover:cursor-pointer hover:bg-gray-600">
            <td className="w-1 p-1 sm:w-2 sm:p-2">
              <span>{setOrdinal(4)}</span>
              <span className="text-center text-xs font-light">
                <br />
                (+0)
              </span>
            </td>
            <th
              scope="row"
              className="flex items-center whitespace-nowrap px-1 py-4 text-white"
            >
              <svg
                className="-left-1 h-6 w-6 text-gray-400 sm:h-8 sm:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="pl-2 sm:pl-3">
                <div className="font-normal sm:font-semibold">kT Echo</div>
                <div className="hidden text-xs font-normal text-gray-500 sm:block">
                  United States - Ohio
                </div>
              </div>
            </th>
            <td className="hidden px-2 py-2 text-center sm:table-cell">25</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              3.384
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">
              6.925
            </td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">50.1</td>
            <td className="hidden px-2 py-2 text-center lg:table-cell">500</td>
            <td className="hidden px-2 py-2 text-center md:table-cell">
              210.88
            </td>
            <td className="px-2 py-2 text-center">5272</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
