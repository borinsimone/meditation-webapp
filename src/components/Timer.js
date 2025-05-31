import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import '../index.css';
import { useGlobalContext } from '../context/context';
import end_meditation_bell from '../assets/sound/end_meditation.mp3';
import waterFlowingSound from '../assets/sound/meditation sound/Water_Flowing_And_Birds.wav';
import waterfallSound from '../assets/sound/meditation sound/Small_Waterfall.wav';
import songs from '../assets/sound/meditation sound/song.json';
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillGearFill,
} from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiRestartLine } from 'react-icons/ri';
import { GoUnmute, GoMute } from 'react-icons/go';
import TimerSetting from './TimerSetting';

const Timer = React.memo(() => {
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

  const [endMeditationSound, setEndMeditationSound] = useState(() => {
    const data = localStorage.getItem('endMeditationSound');
    if (data !== null) {
      const parsedData = JSON.parse(data);
      return parsedData;
    } else {
      return true;
    }
  });

  const [startingMinute, setStartingMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [volume, setVolume] = useState(0.0);
  const [userVolume, setUserVolume] = useState(0.7);
  const [isTimerSettingOpen, setIsTimerSettingOpen] = useState(true);
  const [currentSong, setCurrentSong] = useState('');
  const [prevBgVolume, setPrevBgVolume] = useState();

  const timerValue = useRef();
  // Create audio objects with useMemo to prevent recreation on every render
  const waterFlowing_Sound = useMemo(() => new Audio(waterFlowingSound), []);
  const waterfall_Sound = useMemo(() => new Audio(waterfallSound), []);
  const songList = useMemo(
    () => [waterFlowing_Sound, waterfall_Sound],
    [waterFlowing_Sound, waterfall_Sound]
  );

  let time = startingMinute * 60;

  // Memoize formatted time
  const formattedTime = useMemo(() => {
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, [minutes, seconds]);

  const resetTimer = useCallback(() => {
    setSeconds(Math.floor(time % 60));
    setMinutes(Math.floor(time / 60));
    setTimerOn(false);
    if (currentSong !== '') {
      currentSong.load();
    }
  }, [time, currentSong, setTimerOn]);

  const handlePlayPause = useCallback(() => {
    setTimerOn(!timerOn);
    if (!timerOn && !isMuted) {
      setPrevBgVolume(bgSoundVolume);
      setBgSoundVolume(0);
    } else if (timerOn && !isMuted) {
      setBgSoundVolume(prevBgVolume);
    }
  }, [
    timerOn,
    isMuted,
    bgSoundVolume,
    prevBgVolume,
    setTimerOn,
    setBgSoundVolume,
    setPrevBgVolume,
  ]);

  const handleChange = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    localStorage.setItem(
      'endMeditationSound',
      JSON.stringify(endMeditationSound)
    );
  }, [endMeditationSound]);

  useEffect(() => {
    if (isTimerOpen === false) {
      setStartingMinute(0);
      setSeconds(0);
      setMinutes(0);
      timerValue.current.value = '';
    }
  }, [isTimerOpen]);

  useEffect(() => {
    setSeconds(Math.floor(time % 60));
    setMinutes(Math.floor(time / 60));
  }, [startingMinute, time]);
  useEffect(() => {}, [time]);

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
        let end_meditation_sound = new Audio(end_meditation_bell);
        end_meditation_sound.volume = 0.05;
        end_meditation_sound.play();
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerOn, seconds, minutes, endMeditationSound, isTimerOpen, setTimerOn]);

  useEffect(() => {
    let volumeInterval;
    if (timerOn && currentSong !== '') {
      currentSong.volume = volume;
      currentSong.play();
      volumeInterval = setInterval(() => {
        if (volume <= userVolume) {
          setVolume((prev) => prev + 0.01);
        } else {
          clearInterval(volumeInterval);
        }
      }, 10);
    }
    if (timerOn === false && currentSong !== '') {
      currentSong.volume = volume;
      volumeInterval = setInterval(() => {
        if (volume >= 0.01) {
          setVolume((prev) => prev - 0.01);
        } else {
          clearInterval(volumeInterval);
        }
      }, 10);

      if (volume < 0.01 && (minutes === 0 || seconds === 0)) {
        currentSong.pause();
        currentSong.load();
      }
    }
    if (
      timerOn === false &&
      currentSong !== '' &&
      volume < 0.01 &&
      (minutes !== 0 || seconds !== 0)
    ) {
      currentSong.pause();
      setVolume(0.0);
    }
    return () => {
      clearInterval(volumeInterval);
    };
  }, [timerOn, currentSong, volume, userVolume, minutes, seconds]);

  useEffect(() => {
    setVolume(userVolume);
  }, [userVolume]);

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
  }, [isTimerSettingOpen, prevBgVolume, setBgSoundVolume, setTimerOn]);

  const handleMuteToggle = useCallback(() => {
    if (currentSong !== '') {
      currentSong.muted = !currentSong.muted;
    }
  }, [currentSong]);

  return (
    <div
      className={`timer-container text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl
     ${bgColor} w-[90vw] max-w-md h-auto p-6 flex items-center justify-center flex-col transition-all duration-700 ease-in-out backdrop-blur-md ${
        isTimerOpen
          ? 'opacity-100 z-40 scale-100 pointer-events-auto'
          : 'opacity-0 -z-20 scale-95 pointer-events-none'
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

      <button
        className='absolute top-4 right-4 text-3xl cursor-pointer z-20 hover:text-red-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10'
        onClick={() => setIsTimerOpen(false)}
        aria-label='Close timer'
      >
        <AiOutlineCloseCircle />
      </button>

      <div
        className={`counter-container border-2 border-white/30 relative ${bgColor} w-full max-w-sm h-32 flex items-center justify-center rounded-xl mb-6 backdrop-blur-sm transition-all duration-300 hover:border-white/50`}
      >
        <div className='counter text-4xl md:text-6xl font-mono tracking-wider animate-pulse'>
          {formattedTime}
        </div>
      </div>

      <div className='sound-management flex flex-col items-center justify-center gap-6 w-full'>
        <div className='play-pause w-full flex items-center justify-center gap-6 text-4xl'>
          <button
            className={`p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
              timerOn
                ? 'bg-red-500/20 hover:bg-red-500/30'
                : 'bg-green-500/20 hover:bg-green-500/30'
            }`}
            onClick={handlePlayPause}
            aria-label={timerOn ? 'Pause timer' : 'Start timer'}
          >
            {timerOn ? (
              <BsFillPauseFill className='text-4xl md:text-6xl' />
            ) : (
              <BsFillPlayFill className='text-4xl md:text-6xl' />
            )}
          </button>

          <button
            className='p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 bg-blue-500/20 hover:bg-blue-500/30'
            onClick={resetTimer}
            aria-label='Reset timer'
          >
            <RiRestartLine className='text-2xl md:text-4xl' />
          </button>
        </div>

        <div className='volume-management flex flex-col items-center justify-center gap-4 w-full'>
          <div className='flex items-center gap-4 w-full'>
            <span className='text-sm opacity-70'>Volume:</span>
            <input
              className='volume-slider flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider'
              type='range'
              min={0}
              max={0.4}
              step={0.02}
              value={userVolume}
              onChange={(event) => setUserVolume(event.target.valueAsNumber)}
              aria-label='Meditation music volume'
            />
          </div>

          <button
            className='p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/10'
            onClick={handleMuteToggle}
            aria-label={currentSong.muted ? 'Unmute music' : 'Mute music'}
          >
            {currentSong.muted === true ? (
              <GoMute className='text-2xl md:text-4xl' />
            ) : (
              <GoUnmute className='text-2xl md:text-4xl' />
            )}
          </button>
        </div>

        <button
          className='timer-settings cursor-pointer flex items-center justify-center text-lg gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm'
          onClick={() => setIsTimerSettingOpen(true)}
          aria-label='Open timer settings'
        >
          <BsFillGearFill className='text-xl' />
          Settings
        </button>
      </div>
    </div>
  );
});

Timer.displayName = 'Timer';
export default Timer;
