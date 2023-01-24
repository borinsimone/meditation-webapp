import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { GoUnmute, GoMute } from "react-icons/go";

function Menu() {
  const {
    isMenuOpen,
    background,
    setBackground,
    bgSoundVolume,
    setBgSoundVolume,
    isBgRelated,
    setIsBgRelated,
    isMuted,
    setIsMuted,
  } = useGlobalContext();
  const [previousVolume, setPreviousVolume] = useState(
    () => {
      const data = localStorage.getItem("previousVolume");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        return parsedData;
      } else {
        return 0.2;
      }
    }
  );
  useEffect(() => {
    localStorage.setItem("previousVolume", previousVolume);
  }, [previousVolume]);
  return (
    <div
      className={`bg-slate-600/80 w-screen h-[93vh] absolute duration-500 bottom-0 z-50 flex flex-col items-center p-10 text-white ${
        isMenuOpen ? "left-0" : "-left-[100%]"
      }`}
    >
      <div className="change-background md:w-[90%] h-20  md:text-2xl flex gap-2 items-center justify-between">
        Choose your background:
        <div className="btn-container flex gap-3">
          <button
            className={` py-2 px-5 rounded duration-500 ${
              background === "rain"
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              if (isBgRelated) {
                setBackground("rain");
              }
            }}
          >
            rain
          </button>
          <button
            className={`py-2 px-5 rounded  duration-500 ${
              background === "beach"
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              if (isBgRelated) {
                setBackground("beach");
              }
            }}
          >
            beach
          </button>
        </div>
      </div>
      <div className="change-background-music md:w-[90%] h-20  md:text-2xl flex gap-2 items-center justify-between">
        Choose your background music:
        <div className="btn-container flex gap-3">
          <button
            className={` py-2 px-5 rounded duration-500  ${
              isBgRelated
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setIsBgRelated(true);
            }}
          >
            bg-related
          </button>
          <button
            onClick={() => {
              setIsBgRelated(false);
            }}
            className={` py-2 px-5 rounded duration-500  ${
              !isBgRelated
                ? "bg-red-400 text-white"
                : "bg-white text-black"
            }`}
          >
            relax
          </button>
        </div>
      </div>
      <div className="bg-volume-management relative md:w-[90%] h-20  md:text-2xl flex gap-2 items-center justify-between">
        set background volume
        <input
          className="volume-slider"
          type="range"
          min={0}
          max={0.7}
          step={0.01}
          // default={0.2}
          value={bgSoundVolume}
          onChange={(event) => {
            setBgSoundVolume(event.target.value);
          }}
        />
        <div
          className="be-careful absolute  p-2 right-[10%] -bottom-10 bg-black 
        "
        >
          the sound could be very high
        </div>
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (isMuted === true) {
              setPreviousVolume(bgSoundVolume);
              setBgSoundVolume(0);
            } else {
              setBgSoundVolume(previousVolume);
            }
          }}
        >
          {bgSoundVolume === 0 ? (
            <GoMute className="text-2xl md:text-4xl" />
          ) : (
            <GoUnmute className="text-2xl md:text-4xl" />
          )}
        </button>
        {/* {bgSoundVolume} */}
      </div>
    </div>
  );
}

export default Menu;
