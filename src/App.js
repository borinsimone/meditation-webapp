import Menu from "./components/Menu";
import Timer from "./components/Timer";
import LandingQuote from "./components/LandingQuote";
import meditationLogo from "./assets/images/zen-meditation.png";
import Background from "./components/Background";
import { useGlobalContext } from "./context/context";
import { GiLotus } from "react-icons/gi";
import { BsFillGearFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

function App() {
  const {
    setIsMenuOpen,
    isMenuOpen,
    isTimerOpen,
    setIsTimerOpen,
    bgColor,
    toggleMenu,
  } = useGlobalContext();
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty(
    "--vh",
    `${vh}px`
  );

  return (
    <div
      className={`App    w-screen overflow-hidden flex justify-center  ${bgColor}`}
    >
      <div className="container relative max-w-[1200px] h-full overflow-hidden">
        <LandingQuote />

        <Background />
        <Menu />
        <div className="title text-white text-2xl md:text-4xl w-full text-center absolute top-[10vh]">
          Your journey start from You
        </div>
        <img
          src={meditationLogo}
          className="absolute top-[30%] md:top-[20%] lg:top-[30%] left-[calc(50%-200px)] h-[400px] aspect-square"
          alt=""
        />
        <div
          className={`main-icon absolute bottom-[15vh]  left-0 w-full grid place-content-center   `}
        >
          <GiLotus
            className=" text-[70px] md:text-[100px] text-white cursor-pointer select-none"
            onClick={() => {
              setIsTimerOpen(!isTimerOpen);
              setIsMenuOpen(false);
            }}
          />
        </div>
        <div
          className="menu-icon absolute bottom-[5vh]  left-0 w-full grid place-content-center z-50  "
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <AiOutlineCloseCircle className=" text-[40px] md:text-[70px] text-white cursor-pointer select-none" />
          ) : (
            <BsFillGearFill className=" text-[40px] md:text-[70px] text-white cursor-pointer select-none" />
          )}
        </div>

        <Timer />
      </div>
    </div>
  );
}

export default App;
