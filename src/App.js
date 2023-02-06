import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import SignIn from "./components/SignIn";
import Timer from "./components/Timer";
import LandingQuote from "./components/LandingQuote";
import meditationLogo from "./assets/images/zen-meditation.png";
import beach from "./assets/video/beach.mp4";
import rain from "./assets/video/rain.mp4";
import Background from "./components/Background";
import { useState } from "react";
import { useGlobalContext } from "./context/context";
import { GiLotus } from "react-icons/gi";

function App() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    isSigninOpen,
    setIsSigninOpen,
    toggleSignin,
    isTimerOpen,
    setIsTimerOpen,
    background,
    bgColor,
  } = useGlobalContext();
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty(
    "--vh",
    `${vh}px`
  );
  // console.log(window.innerHeight);
  // console.log(localStorage);

  return (
    <div
      className={`App    w-screen overflow-hidden flex justify-center  ${bgColor}`}
    >
      <div className="container relative max-w-[1200px] h-full overflow-hidden">
        <LandingQuote />

        <Background />
        <Menu />
        <div className="title text-white text-2xl md:text-4xl w-full text-center absolute top-[10vh]">
          Your journey start from you
        </div>
        <img
          src={meditationLogo}
          className="absolute top-[30%] md:top-[20%] left-[calc(50%-200px)] h-[400px] aspect-square"
          alt=""
        />
        <div
          className={`main-icon absolute bottom-[10vh]  left-0 w-full grid place-content-center  `}
        >
          <GiLotus
            className=" text-[70px] md:text-[120px] text-white cursor-pointer select-none"
            onClick={() => {
              setIsTimerOpen(!isTimerOpen);
              setIsMenuOpen(false);
              setIsSigninOpen(false);
            }}
          />
        </div>
        <Navbar />
        <SignIn />
        <Timer />
      </div>
    </div>
  );
}

export default App;
