import React from 'react';
import Icon from './assets/icon.png';

function Header() {
  return (
    <header className="bg-zinc-800 h-20 flex justify-start items-center pl-12">
      <img src={Icon} className="w-10 h-10 mr-4" />
      <span className="text-white text-xl font-bold">BATTLEBIT SERVER LIST</span>
    </header>
  );
}

export default Header;