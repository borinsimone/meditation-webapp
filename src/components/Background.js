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
  const relax = useRef();
  // useEffect(() => {
  // console.log(bgSound.current.id)
  // }, [background,isBgRelated])

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
    console.log(bgSound.current.id);
    console.log(isBgRelated);
    if (!isMuted && !isLandingOpen) {
      bgSound.current.load();
      bgSound.current.volume = bgSoundVolume;
      bgSound.current.play();
    }
    localStorage.setItem("background", background);
  }, [background, isBgRelated]);

  // useEffect(() => {
  //   if (!isBgRelated && !isMuted && !isLandingOpen) {
  //     bgSound.current.pause();
  //     relax.current.play();
  //   } else if (isBgRelated && !isMuted && !isLandingOpen) {
  //     relax.current.pause();
  //   }
  // }, [isBgRelated]);

  return (
    <div>
      {/* <button
        className="absolute top-20  w-24 bg-black z-50 text-white"
        onClick={() => {
          localStorage.clear();
        }}
      >
        {bgSound.current ? bgSound.current.volume : ""}
      </button> */}
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
      <img
        src={require("../assets/video/beach.gif")}
        alt=""
        className={`h-full w-full max-w-[1200px] fixed ${
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
        id="rain"
        ref={
          background === "rain" && isBgRelated
            ? bgSound
            : rain
        }
      ></audio>
      {/* BEACH */}

      {/* BEACH SOUND */}
      <audio
        src={require("../assets/sound/beach.mp3")}
        onPlaying={() => {
          setCurrentBgSong("beach");
        }}
        id="beach"
        ref={
          background === "beach" && isBgRelated
            ? bgSound
            : beach
        }
        // ref={beach}
      ></audio>
      {/* RELAX BACKGROUND */}
      <audio
        src={require("../assets/sound/relax-background.mp3")}
        // onPlaying={() => {
        //   setCurrentBgSong("relax");
        // }}
        loop
        id="relax"
        ref={!isBgRelated ? bgSound : relax}
      ></audio>
    </div>
  );
}

export default Background;

// useEffect(() => {
//   if (isBgRelated === false && isLandingOpen === false) {
//     bgSound.current.pause();
//   } else if (
//     isBgRelated &&
//     !isMuted &&
//     isLandingOpen === false
//   ) {
//     bgSound.current.load();
//     bgSound.current.volume = bgSoundVolume;
//     bgSound.current.play();
//   }
// }, [isBgRelated, isLandingOpen]);

// useEffect(() => {
//   bgSound.current.volume = bgSoundVolume;
// }, [bgSoundVolume]);

// useEffect(() => {
//   if (timerOn === true) {
//     bgSound.current.pause();
//   }
//   if (
//     timerOn === false &&
//     !isMuted &&
//     isLandingOpen === false
//   ) {
//     bgSound.current.play();
//   }
// }, [timerOn]);
