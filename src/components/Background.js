import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../context/context";

function Background() {
  const {
    background,
    bgSoundVolume,
    isBgRelated,
    isLandingOpen,
    isMuted,
    bgSound,
  } = useGlobalContext();

  const rain = useRef();
  const beach = useRef();
  const relax = useRef();

  // VOLUME/MUTE MANAGEMENT
  useEffect(() => {
    if (isMuted && isLandingOpen === false) {
      bgSound.current.pause();
    }
    if (!isMuted && isLandingOpen === false) {
      bgSound.current.volume = bgSoundVolume;

      bgSound.current.play();
    }
  }, [isMuted]);


  useEffect(() => {
    bgSound.current.volume = bgSoundVolume;
  }, [bgSoundVolume]);

  useEffect(() => {
    bgSound.current.pause();

    if (!isMuted && !isLandingOpen) {
      bgSound.current.load();
      bgSound.current.volume = bgSoundVolume;
      bgSound.current.play();
    }
    localStorage.setItem("background", background);
  }, [background, isBgRelated]);

  return (
    <div>
      {/* RAIN */}
      <img
        src={require("../assets/video/rain.gif")}
        alt=""
        className={`h-full w-full max-w-[1200px] fixed  ${
          background === "rain"
            ? "z-0 opacity-1"
            : "-z-50 opacity-0"
        }`}
      />

      {/* RAIN SOUND */}
      <audio
        src={require("../assets/sound/rain.mp3")}
        id="rain"
        ref={
          background === "rain" && isBgRelated
            ? bgSound
            : rain
        }
      ></audio>
      {/* BEACH */}
      <img
        src={require("../assets/video/beach.gif")}
        alt=""
        className={`h-full w-full max-w-[1200px] fixed ${
          background === "beach"
            ? "z-0 opacity-1"
            : "-z-50 opacity-0"
        }`}
      />
      {/* BEACH SOUND */}
      <audio
        src={require("../assets/sound/beach.mp3")}
        id="beach"
        ref={
          background === "beach" && isBgRelated
            ? bgSound
            : beach
        }
      ></audio>
      {/* RELAX BACKGROUND */}
      <audio
        src={require("../assets/sound/relax-background.mp3")}
        loop
        id="relax"
        ref={!isBgRelated ? bgSound : relax}
      ></audio>
    </div>
  );
}

export default Background;
