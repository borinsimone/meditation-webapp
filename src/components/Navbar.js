import React from "react";
import { GiLotus } from "react-icons/gi";
import { FaUserAlt, FaBars } from "react-icons/fa";
import { useGlobalContext } from "../context/context";
function Navbar() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    isSigninOpen,
    setIsSignInOpen,
    toggleSignIn,
    isTimerOpen,
    setIsTimerOpen,
    bgColor,
  } = useGlobalContext();
  return (
    <div
      className={`navbar absolute w-full h-[7%] duration-500  ${bgColor} bg-opacity-80 flex items-center justify-between px-10`}
    >
      <div
        className="menu-icon text-white text-2xl md:text-4xl cursor-pointer"
        onClick={toggleMenu}
      >
        <FaBars />
      </div>
      <div
        className="user-icon text-white text-2xl md:text-4xl cursor-pointer"
        onClick={toggleSignIn}
      >
        <FaUserAlt />
      </div>
    </div>
  );
}

export default Navbar;
