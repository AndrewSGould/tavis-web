import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  ForgotPassword,
  Home,
  Leaderboard,
  Login,
  Player,
  Profile,
  Register,
  SyncManager,
  Admin,
  NotFound,
} from './pages';

const App = () => {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <Login /> },
    { path: '/home', element: <Home /> },
    { path: '/leaderboard', element: <Leaderboard /> },
    { path: '/player/:id', element: <Player /> },
    { path: '/player', element: <Player /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/register', element: <Register /> },
    { path: '/profile', element: <Profile /> },
    { path: '/sync', element: <SyncManager /> },
    { path: '/bcm-admin', element: <Admin /> },
    { path: '/*', element: <NotFound /> },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
