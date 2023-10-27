import React from 'react';

const Profile = () => (
  <>
    <p>Want additional features? Connect your Discord!</p>
    <p className="mt-2 mb-0 pt-1 text-sm font-semibold text-slate-50">
      <a
        href="{{ discordSignin }}"
        className="inline-flex items-center space-x-4 rounded-md bg-indigo-500 px-5 py-3 text-xl font-bold transition duration-75 hover:bg-gray-600"
      >
        <span>Connect your Discord!</span>
      </a>
    </p>
  </>
);
export default Profile;
