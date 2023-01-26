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
  } = useGlobalContext();

  const [currentBgSong, setCurrentBgSong] = useState("");
  const rain = useRef();
  const beach = useRef();
  // const [bgSong, setBgSong] = useState(beach);
  // useEffect(() => {
  //   bgSong.current.pause();

  //   if (background === "rain") {
  //     setBgSong(rain);
  //   }
  //   if (background === "beach") {
  //     setBgSong(beach);
  //   }
  //   bgSong.current.volume = bgSoundVolume;
  //   bgSong.current.play();
  // }, [background]);
  // useEffect(() => {
  //   console.log("ciao");
  // }, [bgSong]);
  useEffect(() => {
    if (isMuted && isBgRelated && isLandingOpen === false) {
      beach.current.pause();
      rain.current.pause();
      // rain.current.mute = false;
      // beach.current.mute = false;
    } else {
      if (currentBgSong === "beach") {
        beach.current.play();
      }
      if (currentBgSong === "rain") {
        rain.current.play();
      }
    }
  }, [isMuted]);

  useEffect(() => {
    if (isBgRelated && isLandingOpen === false) {
      if (background === "rain") {
        rain.current.volume = bgSoundVolume;
        rain.current.play();
        if (currentBgSong === "beach") {
          beach.current.pause();
        }
      }
      if (background === "beach") {
        beach.current.volume = bgSoundVolume;
        beach.current.play();
        if (currentBgSong === "rain") {
          rain.current.pause();
        }
      }
    }
    localStorage.setItem("background", background);
  }, [background]);
  useEffect(() => {
    if (isBgRelated === false) {
      beach.current.pause();
      rain.current.pause();

      // relaxmusic.volume = bgSoundVolume;
      // relaxmusic.current.play();
    } else {
      if (
        background === "rain" &&
        isLandingOpen === false
      ) {
        rain.current.volume = bgSoundVolume;
        rain.current.play();
      }
      if (
        background === "beach" &&
        isLandingOpen === false
      ) {
        beach.current.volume = bgSoundVolume;
        beach.current.play();
      }
    }
  }, [isBgRelated, isLandingOpen]);

  useEffect(() => {
    rain.current.volume = bgSoundVolume;
    beach.current.volume = bgSoundVolume;
  }, [bgSoundVolume]);

  useEffect(() => {
    if (timerOn === true) {
      rain.current.pause();
      beach.current.pause();
    }
    if (
      timerOn === false &&
      background === "rain" &&
      isLandingOpen === false
    ) {
      rain.current.play();
    }
    if (
      timerOn === false &&
      background === "beach" &&
      isLandingOpen === false
    ) {
      beach.current.play();
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
        non toccare questo pulsante
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
      {/* <video
        className={`video-background ${
          background === "rain"
            ? "z-0 opacity-1"
            : "-z-50 opacity-0"
        }  `}
        autoPlay
        loop
        muted
      >
        <source
          src={require("../assets/video/rain.mp4")}
          type="video/mp4"
        />
      </video> */}
      {/* RAIN SOUND */}
      <audio
        src={require("../assets/sound/rain.mp3")}
        onPlaying={() => {
          setCurrentBgSong("rain");
        }}
        ref={rain}
      ></audio>
      {/* BEACH */}
      {/* <video
        className={`video-background ${
          background === "beach"
            ? "z-0 opacity-1"
            : "-z-50 opacity-0"
        }  `}
        autoPlay
        loop
        muted
      >
        <source
          src={require("../assets/video/beach.mp4")}
          type="video/mp4"
        />
      </video> */}

      {/* BEACH SOUND */}
      <audio
        src={require("../assets/sound/beach.mp3")}
        onPlaying={() => {
          setCurrentBgSong("beach");
        }}
        ref={beach}
      ></audio>
    </div>
  );
}

export default Background;
