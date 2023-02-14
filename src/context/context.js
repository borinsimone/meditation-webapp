import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

const GlobalContext = React.createContext();

const ContextProvider = ({ children }) => {
  //MENU CONTEXT
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //MEDITATION CONTEXT
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  const [timerOn, setTimerOn] = useState(false);
  //MEDITATION SETTING CONTEXT
  const [currentSong, setCurrentSong] = useState("");
  // BACKGROUND & VOLUME CONTEXT
  const [background, setBackground] = useState(() => {
    const data = localStorage.getItem("background");
    if (data !== null) {
      return data;
    } else {
      return "beach";
    }
  });

  const [bgSoundVolume, setBgSoundVolume] = useState(() => {
    const data = localStorage.getItem("bgSoundVolume");
    if (data !== null) {
      const parsedData = JSON.parse(data);
      return parsedData;
    } else {
      return 0.2;
    }
  });
  useEffect(() => {
    localStorage.setItem("bgSoundVolume", bgSoundVolume);
  }, [bgSoundVolume]);
  const [isMuted, setIsMuted] = useState(() => {
    const data = localStorage.getItem("isMuted");
    if (data !== null) {
      const parsedData = JSON.parse(data);
      return parsedData;
    } else {
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem(
      "isMuted",
      JSON.stringify(isMuted)
    );
  }, [isMuted]);

  const [isBgRelated, setIsBgRelated] = useState(true);

  const bgSound = useRef();

  const [isLandingOpen, setIsLandingOpen] = useState(true);

  let rainColor = "bg-slate-600";
  let beachColor = "bg-[#FA9A50]";
  let bgColor =
    background === "rain" ? rainColor : beachColor;

  return (
    <GlobalContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        toggleMenu,
        isTimerOpen,
        setIsTimerOpen,
        background,
        setBackground,
        timerOn,
        setTimerOn,
        currentSong,
        setCurrentSong,
        bgSoundVolume,
        setBgSoundVolume,
        isBgRelated,
        setIsBgRelated,
        isMuted,
        setIsMuted,
        isLandingOpen,
        setIsLandingOpen,
        bgSound,
        bgColor,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export { GlobalContext, ContextProvider };
