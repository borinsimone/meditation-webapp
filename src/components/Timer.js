import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import { useGlobalContext } from "../context/context";
import end_meditation_bell from "../assets/sound/end_meditation.mp3";
import waterFlowingSound from "../assets/sound/meditation sound/Water_Flowing_And_Birds.wav";
import waterfallSound from "../assets/sound/meditation sound/Small_Waterfall.wav";
import songs from "../assets/sound/meditation sound/song.json";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillGearFill,
} from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiRestartLine } from "react-icons/ri";
import { GoUnmute, GoMute } from "react-icons/go";
import TimerSetting from "./TimerSetting";

function Timer() {
  const {
    isTimerOpen,
    setIsTimerOpen,
    timerOn,
    setTimerOn,
    bgColor,
    isMuted,
    bgSoundVolume,
    setBgSoundVolume,
  } = useGlobalContext();

  const [endMeditationSound, setEndMeditationSound] =
    useState(() => {
      const data = localStorage.getItem(
        "endMeditationSound"
      );
      if (data !== null) {
        const parsedData = JSON.parse(data);
        return parsedData;
      } else {
        return true;
      }
    });

  useEffect(() => {
    localStorage.setItem(
      "endMeditationSound",
      JSON.stringify(endMeditationSound)
    );
  }, [endMeditationSound]);

  const [startingMinute, setStartingMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const timerValue = useRef();
  let time = startingMinute * 60;

  useEffect(() => {
    if (isTimerOpen === false) {
      setStartingMinute(0);
      setSeconds(0);
      setMinutes(0);
      timerValue.current.value = "";
    }
  }, [isTimerOpen]);

  useEffect(() => {
    setSeconds(Math.floor(time % 60));
    setMinutes(Math.floor(time / 60));
  }, [startingMinute, time]);
  useEffect(() => {}, [time]);
  const [volume, setVolume] = useState(0.0);

  const [userVolume, setUserVolume] = useState(0.7);

  useEffect(() => {
    let interval = null;

    if (timerOn && time > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0 && minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }, 1000);
    }
    if (timerOn && minutes === 0 && seconds === 0) {
      setTimerOn(false);
      clearInterval(interval);
      if (endMeditationSound && isTimerOpen) {
        let end_meditation_sound = new Audio(
          end_meditation_bell
        );
        end_meditation_sound.volume = 0.05;
        end_meditation_sound.play();
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerOn, seconds, minutes]);

  useEffect(() => {
    let volumeInterval;
    if (timerOn && currentSong !== "") {
      currentSong.volume = volume;

      currentSong.play();
      volumeInterval = setInterval(() => {
        if (volume <= userVolume) {
          setVolume(volume + 0.01);
        } else {
          clearInterval(volumeInterval);
        }
      }, 10);
    }
    if (timerOn === false && currentSong !== "") {
      currentSong.volume = volume;

      volumeInterval = setInterval(() => {
        if (volume >= 0.01) {
          setVolume(volume - 0.01);
        } else {
          clearInterval(volumeInterval);
        }
      }, 10);

      if (
        volume < 0.01 &&
        (minutes === 0 || seconds === 0)
      ) {
        currentSong.pause();

        currentSong.load();
      }
    }
    if (
      timerOn === false &&
      currentSong !== "" &&
      volume < 0.01 &&
      (minutes !== 0 || seconds !== 0)
    ) {
      currentSong.pause();

      setVolume(0.0);
    }
    return () => {
      clearInterval(volumeInterval);
    };
  });

  useEffect(() => {
    setVolume(userVolume);
  }, [userVolume]);

  const handleChange = (event) => {
    event.preventDefault();
  };
  const resetTimer = () => {
    setSeconds(Math.floor(time % 60));
    setMinutes(Math.floor(time / 60));
    setTimerOn(false);
    if (currentSong !== "") {
      currentSong.load();
    }
  };
  const [isTimerSettingOpen, setIsTimerSettingOpen] =
    useState(true);

  useEffect(() => {
    setIsTimerSettingOpen(true);
  }, [isTimerOpen]);
  useEffect(() => {
    if (isTimerSettingOpen) {
      setTimerOn(false);
      if (prevBgVolume) {
        setBgSoundVolume(prevBgVolume);
      }
    }
  }, [isTimerSettingOpen]);

  //SONG FOR MEDITATION

  const [currentSong, setCurrentSong] = useState("");
  let waterFlowing_Sound = new Audio(waterFlowingSound);
  let waterfall_Sound = new Audio(waterfallSound);

  const songList = [waterFlowing_Sound, waterfall_Sound];
  const [prevBgVolume, setPrevBgVolume] = useState();
  return (
    <div
      className={`timer-container text-white absolute top-[calc(45%-30%)] left-[calc(50%-40%)] lg:left-[calc(50%-25%)] rounded
     ${bgColor} w-[80%] lg:w-[50%] h-[60%] flex items-center justify-center flex-col duration-500 ${
        isTimerOpen ? "opacity-1 z-40" : "opacity-0 -z-20"
      }`}
    >
      <TimerSetting
        isTimerSettingOpen={isTimerSettingOpen}
        setIsTimerSettingOpen={setIsTimerSettingOpen}
        timerValue={timerValue}
        setStartingMinute={setStartingMinute}
        handleChange={handleChange}
        setEndMeditationSound={setEndMeditationSound}
        endMeditationSound={endMeditationSound}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        songList={songList}
      />
      <AiOutlineCloseCircle
        className="absolute top-5 right-5 text-3xl cursor-pointer z-20"
        onClick={() => {
          setIsTimerOpen(false);
        }}
      />

      <div
        className={`counter-container border relative ${bgColor} w-[80%] h-[40%] md:w-[70%] md:h-[40%]  flex items-center justify-center rounded-md`}
      >
        <div className=" relative counter text-6xl md:text-9xl ">
          {minutes}:{seconds < 10 ? "0" + seconds : seconds}{" "}
        </div>
      </div>

      <div className="sound-management  flex flex-col items-center justify-center gap-4 w-[80%] md:w-[70%]">
        <div className="play-pause w-full  flex   items-center justify-center gap-4 text-4xl  ">
          {timerOn ? (
            <BsFillPauseFill
              className="text-5xl md:text-7xl cursor-pointer"
              onClick={() => {
                setTimerOn(!timerOn);
                if (!isMuted) {
                  setBgSoundVolume(prevBgVolume);
                }
              }}
            />
          ) : (
            <BsFillPlayFill
              className="text-5xl md:text-7xl cursor-pointer"
              onClick={() => {
                setTimerOn(!timerOn);
                if (!isMuted) {
                  setPrevBgVolume(bgSoundVolume);
                  setBgSoundVolume(0);
                }
              }}
            />
          )}
          <RiRestartLine
            className="text-3xl md:text-5xl cursor-pointer"
            onClick={resetTimer}
          />
        </div>
        <div className="volume-management flex flex-col items-center justify-center gap-4">
          <input
            className="volume-slider "
            type="range"
            min={0}
            max={0.4}
            step={0.02}
            value={userVolume}
            onChange={(event) => {
              setUserVolume(event.target.valueAsNumber);
            }}
          />
          <button
            onClick={() => {
              if (
                currentSong.muted === false &&
                currentSong !== ""
              ) {
                currentSong.muted = true;
              } else if (
                currentSong.muted === true &&
                currentSong !== ""
              ) {
                currentSong.muted = false;
              }
            }}
          >
            {currentSong.muted === true ? (
              <GoMute className="text-2xl md:text-4xl " />
            ) : (
              <GoUnmute className="text-2xl md:text-4xl " />
            )}
          </button>
        </div>
        <div
          className="timer-settings cursor-pointer w-fit flex items-center justify-center text-2xl md:text-3xl capitalize gap-2 bg-slate-100/20 px-2 py-1 rounded"
          onClick={() => {
            if (isTimerSettingOpen === false) {
              setIsTimerSettingOpen(true);
            }
          }}
        >
          <BsFillGearFill className="text-3xl md:text-5xl" />
          settings
        </div>
      </div>
    </div>
  );
}

export default Timer;
