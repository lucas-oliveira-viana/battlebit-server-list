import React from 'react';
import GitHubLogo from './assets/github.png';

function Footer() {
  return (
    <footer className="bg-black p-12">
      <h2 className="text-zinc-300 font-bold mb-2 text-xl">
        About BattleBit Server List
      </h2>
      <p className="text-zinc-300 mb-2">
        BattleBit Server List is a website for players to check the server status while
        they are outside of the game using{' '}
        <a
          className="font-bold underline underline-offset-2 hover:text-zinc-400"
          target="_blank"
          href="https://publicapi.battlebit.cloud/Servers/GetServerList"
        >
          BattleBit Servers Public API.
        </a>
      </p>
      <div className="flex gap-2 items-center">
        <img src={GitHubLogo} className="w-6 h-6" />
        <a
          href="https://github.com/lucas-oliveira-viana/battlebit-server-list"
          target="_blank"
          className="text-zinc-300 hover:text-zinc-400 font-bold underline underline-offset-2"
        >
          https://github.com/lucas-oliveira-viana/battlebit-server-list
        </a>
      </div>
    </footer>
  );
}

export default Footer;
