import React from 'react';

function Hamburger({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      className="fixed top-4 left-4 z-20 md:hidden"
      aria-label="Toggle menu"
    >
      <div className="w-6 h-6 flex flex-col justify-between">
        <span className={`bg-white h-0.5 w-full transition-all ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
        <span className={`bg-white h-0.5 w-full transition-all ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`bg-white h-0.5 w-full transition-all ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
      </div>
    </button>
  );
}

export default Hamburger;