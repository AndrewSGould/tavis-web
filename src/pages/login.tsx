import React from 'react';

const Login = () => {
  const connectDiscord = () => {
    // TODO: Implement
    window.location.href = '/';
  };

  return (
    <section>
      <div className="px-6 text-gray-800">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
          <button
            type="button"
            onClick={connectDiscord}
            className="inline-block cursor-pointer rounded bg-green-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg disabled:pointer-events-none disabled:opacity-25"
          >
            Connect
          </button>
        </div>
      </div>
    </section>
  );
};
export default Login;
