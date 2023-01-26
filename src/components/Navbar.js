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
    setIsSigninOpen,
    toggleSignin,
    isTimerOpen,
    setIsTimerOpen,
  } = useGlobalContext();
  return (
    <div className="navbar absolute w-full h-[7%] bg-slate-600/80 flex items-center justify-between px-10">
      <div
        className="menu-icon text-white text-2xl md:text-4xl cursor-pointer"
        onClick={toggleMenu}
      >
        <FaBars />
      </div>
      <div
        className="user-icon text-white text-2xl md:text-4xl cursor-pointer"
        onClick={toggleSignin}
      >
        <FaUserAlt />
      </div>
    </div>
  );
}

export default Navbar;
// <div className=" navbar absolute bottom-0  w-full h-[8vh] bg-slate-600 flex items-center justify-between px-10">
//   <div className="utility-shadow absolute w-screen bg-slate-100 h-[10vh] -top-[10vh] left-0"></div>
//   <div
//     className="menu-icon text-white text-2xl md:text-4xl cursor-pointer"
//     onClick={toggleMenu}
//   >
//     <FaBars />
//   </div>
//   <div
//     className={`main-icon absolute -top-[40px] left-[calc(50vw-40px)] w-[80px] aspect-square  bg-[#211721]
//     grid place-content-center rounded-[50%] `}
//     onClick={() => {
//       setIsTimerOpen(!isTimerOpen);
//       setIsMenuOpen(false);
//       setIsSigninOpen(false);
//     }}
//   >
//     <GiLotus className=" text-[50px] text-white cursor-pointer select-none" />
//   </div>
//   <div
//     className="user-icon text-white text-2xl md:text-4xl cursor-pointer"
//     onClick={toggleSignin}
//   >
//     <FaUserAlt />
//   </div>
// </div>
