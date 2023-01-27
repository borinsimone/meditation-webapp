import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/context";

function Background() {
  const {
    background,
    setBackground,
    timerOn,
    setTimerOn,
    bgSoundVolume,
    setBgSoundVolume,
    isBgRelated,
    setIsBgRelated,
    isLandingOpen,
    setIsLandingOpen,
    isMuted,
    setIsMuted,
    bgSound,
  } = useGlobalContext();

  const [currentBgSong, setCurrentBgSong] = useState("");
  const rain = useRef();
  const beach = useRef();

  useEffect(() => {
    if (isMuted && isBgRelated && isLandingOpen === false) {
      bgSound.current.pause();
 
    }
    if (
      !isMuted &&
      isBgRelated &&
      isLandingOpen === false
    ) {
      bgSound.current.play();
      console.log("oaaaaaaaaaaaa");
 
    }
  }, [isMuted]);

  useEffect(() => {
    console.log(bgSound.current.id);
    if (
      isBgRelated &&
      !isMuted &&
      !isLandingOpen &&
      bgSound.current &&
      bgSound.current.id === background
    ) {
      bgSound.current.load();
      bgSound.current.volume = bgSoundVolume;
      bgSound.current.play();

    }
    localStorage.setItem("background", background);
  }, [background]);
  useEffect(() => {
    if (isBgRelated === false && isLandingOpen === false) {
      bgSound.current.pause();
    } else if (
      isBgRelated &&
      !isMuted &&
      isLandingOpen === false
    ) {
      bgSound.current.play();
    }

  }, [isBgRelated, isLandingOpen]);

  useEffect(() => {
    bgSound.current.volume = bgSoundVolume;
   
  }, [bgSoundVolume]);

  useEffect(() => {
    if (timerOn === true) {
  
    }
    if (
      timerOn === false &&
   
      !isMuted &&
      isLandingOpen === false
    ) {
      bgSound.current.play();
   
    }

  }, [timerOn]);

  return (
    <div>
      <button
        className="absolute top-20  w-24 bg-black z-50 text-white"
        onClick={() => {
          localStorage.clear();
        }}
      >
        {bgSound.current ? bgSound.current.volume : ""}
      </button>
      {/* RAIN */}
      <img
        src={require("../assets/video/rain.gif")}
        alt=""
        className={`h-full w-full fixed  ${
          background === "rain"
            ? "z-0 opacity-1"
            : "-z-50 opacity-0"
        }`}
      />
      <img
        src={require("../assets/video/beach.gif")}
        alt=""
        className={`h-full w-full fixed ${
          background === "beach"
            ? "z-0 opacity-1"
            : "-z-50 opacity-0"
        }`}
      />
   
      {/* RAIN SOUND */}
      <audio
        src={require("../assets/sound/rain.mp3")}
        onPlaying={() => {
          setCurrentBgSong("rain");
        }}
        // ref={rain}
        id="rain"
        ref={background === "rain" ? bgSound : rain}
      ></audio>
      {/* BEACH */}
     

      {/* BEACH SOUND */}
      <audio
        src={require("../assets/sound/beach.mp3")}
        onPlaying={() => {
          setCurrentBgSong("beach");
        }}
        id="beach"
        ref={background === "beach" ? bgSound : beach}
        // ref={beach}
      ></audio>
    </div>
  );
}

export default Background;
