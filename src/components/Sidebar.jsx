import React from 'react';
import { FiHome, FiBarChart2, FiMapPin, FiCalendar, FiSettings, FiLogOut } from 'react-icons/fi';

function Sidebar() {
  return (
    <div className="bg-[#131b2c] w-20 ml-10 mt-20 rounded-3xl h-auto p-6 flex flex-col justify-between shadow-lg">
      {/* Top Section with Logo */}
      <div>
        <div className="flex justify-center mb-10">
          <img
            src="https://img.icons8.com/3d-fluency/94/moon-symbol.png"
            alt="logo"
            className="w-16 h-16 mb-4 transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Sidebar Menu */}
        <div className="flex flex-col gap-8 cursor-pointer">
          <div className="group flex flex-col items-center">
            <FiHome className=" text-[#742BEC] scale-110 w-8 h-8 mb-2 transition-transform duration-300 hover:scale-110" />
            <span className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Dashboard
            </span>
          </div>
          <div className="group flex flex-col items-center">
            <FiBarChart2 className="text-white w-8 h-8 mb-2 transition-transform duration-300 hover:scale-110" />
            <span className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Analytics
            </span>
          </div>
          <div className="group flex flex-col items-center">
            <FiMapPin className="text-white w-8 h-8 mb-2 transition-transform duration-300 hover:scale-110" />
            <span className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Map
            </span>
          </div>
          <div className="group flex flex-col items-center">
            <FiCalendar className="text-white w-8 h-8 mb-2 transition-transform duration-300 hover:scale-110" />
            <span className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Calendar
            </span>
          </div>
          <div className="group mb-20 flex flex-col items-center">
            <FiSettings className="text-white w-8 h-8 mb-2 transition-transform duration-300 hover:scale-110" />
            <span className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Settings
            </span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="group flex  flex-col items-center cursor-pointer">
        <FiLogOut className="text-white w-8 h-8 mb-2 transition-transform duration-300 hover:scale-110" />
        <span className="text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Logout
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
