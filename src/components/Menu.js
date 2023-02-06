import React, { useEffect, useRef, useState } from "react";
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
    bgSound,
    bgColor,
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
      className={`${bgColor} bg-opacity-60 w-full h-[93%] absolute duration-500 bottom-0 z-50 flex flex-col items-center md:pt-20 md:gap-10 p-10
       text-white ${
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
                bgSound.current.pause();
              }
              setBackground("rain");
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
                bgSound.current.pause();
              }
              setBackground("beach");
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
              bgSound.current.pause();

              setIsBgRelated(true);
            }}
          >
            bg-related
          </button>
          <button
            onClick={() => {
              bgSound.current.pause();

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
          className="volume-slider cursor-pointer"
          type="range"
          min={0}
          max={0.7}
          step={0.01}
          value={bgSoundVolume}
          onChange={(event) => {
            setBgSoundVolume(event.target.value);
          }}
          onTouchEnd={(event) => {
            setBgSoundVolume(event.target.value);
            console.log("ciao");
          }}
        />
        <div
          className="be-careful absolute  p-2 right-[10%] -bottom-10 bg-black 
        "
        >
          the sound could be very loud
        </div>
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (isMuted === true) {
            } else {
            }
          }}
        >
          {bgSoundVolume === 0 || isMuted ? (
            <GoMute className="text-2xl md:text-4xl" />
          ) : (
            <GoUnmute className="text-2xl md:text-4xl" />
          )}
        </button>
      </div>

      <div className="test bg-green-500 mt-10"></div>
    </div>
  );
}

export default Menu;
