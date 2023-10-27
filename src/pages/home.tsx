import React from 'react';

const Home = () => (
  <section className="margin-auto m-auto flex max-w-2xl flex-col gap-6">
    <h3 className="text-xl font-semibold">
      Welcome, fellow Achievement Hunters!
    </h3>
    <p>
      Our website is still under construction, just like that secret room in
      your favorite RPG that you&spos;re convinced holds the ultimate loot.
      <br />
      <br />
      But, while we&apos;re building this place, join our merry band of
      achievement aficionados in the Discord and stay tuned for leaderboards,
      stats, and more badges than a scout&apos;s sash.&nbsp;
      <br />
      <br />
      Until then, keep gaming, keep conquering, and keep chasing those
      achievements like they owe you money!&nbsp;
      <br />
      <br />
      Cheers, The BCMX Team (Work-in-Progress Edition)*
    </p>
    <iframe
      title="Discord Widget"
      src="https://discord.com/widget?id=1075212224467046430&theme=dark"
      width="350"
      height="300"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      className="mt-6 self-center"
    />
  </section>
);
export default Home;
