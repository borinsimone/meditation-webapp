import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGlobalContext } from '../context/context';
import '../index.css';
const Background = React.memo(() => {
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
  const [imagesLoaded, setImagesLoaded] = useState({
    rain: false,
    beach: false,
  });

  const handleImageLoad = useCallback(
    (type) => {
      setImagesLoaded((prev) => ({ ...prev, [type]: true }));
    },
    [setImagesLoaded]
  );

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
    localStorage.setItem('background', background);
  }, [background, isBgRelated]);

  return (
    <div className='bg-container'>
      {/* Loading overlay */}
      {(!imagesLoaded.rain || !imagesLoaded.beach) && (
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10'>
          <div className='text-white text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
            <p>Loading meditation environment...</p>
          </div>
        </div>
      )}

      {/* RAIN */}
      <img
        src={require('../assets/video/rain.gif')}
        alt='Peaceful rain scene'
        className={`gif transition-all duration-1000 ease-in-out ${
          background === 'rain'
            ? 'z-0 opacity-100 scale-100'
            : '-z-50 opacity-0 scale-110'
        }`}
        onLoad={() => handleImageLoad('rain')}
      />

      {/* BEACH */}
      <img
        src={require('../assets/video/beach.gif')}
        alt='Serene beach scene'
        className={`gif transition-all duration-1000 ease-in-out ${
          background === 'beach'
            ? 'z-0 opacity-100 scale-100'
            : '-z-50 opacity-0 scale-110'
        }`}
        onLoad={() => handleImageLoad('beach')}
      />

      {/* RAIN SOUND */}
      <audio
        src={require('../assets/sound/rain.mp3')}
        id='rain'
        ref={background === 'rain' && isBgRelated ? bgSound : rain}
        preload='auto'
      ></audio>

      {/* BEACH SOUND */}
      <audio
        src={require('../assets/sound/beach.mp3')}
        id='beach'
        ref={background === 'beach' && isBgRelated ? bgSound : beach}
        preload='auto'
      ></audio>
      {/* RELAX BACKGROUND */}
      <audio
        src={require('../assets/sound/relax-background.mp3')}
        loop
        id='relax'
        ref={!isBgRelated ? bgSound : relax}
        preload='auto'
      ></audio>
    </div>
  );
});

Background.displayName = 'Background';
export default Background;
