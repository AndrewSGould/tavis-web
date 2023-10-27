import React from 'react';

const NotFound = () => (
  <div>
    <p>
      Fuck, I broke something.
      <br />
      Please report the issue in detail
      <a
        href="https://github.com/AndrewSGould/tavis-web/issues"
        className="text-blue-700 underline hover:text-blue-500"
      >
        on Github
      </a>
      or on our
      <a
        href="https://discord.gg/V8Tm6maW"
        className="text-blue-700 underline hover:text-blue-500"
      >
        Discord!
      </a>
    </p>
  </div>
);

export default NotFound;
