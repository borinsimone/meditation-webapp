import React, { useCallback } from 'react';
import { useGlobalContext } from '../context/context';
import { GoUnmute, GoMute } from 'react-icons/go';

const Menu = React.memo(() => {
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

  const handleBackgroundChange = useCallback(
    (newBackground) => {
      if (isBgRelated) {
        bgSound.current.pause();
      }
      setBackground(newBackground);
    },
    [isBgRelated, bgSound, setBackground]
  );

  const handleMusicTypeChange = useCallback(
    (isRelated) => {
      bgSound.current.pause();
      setIsBgRelated(isRelated);
    },
    [bgSound, setIsBgRelated]
  );

  return (
    <div
      className={`${bgColor} bg-opacity-80 backdrop-blur-lg w-full h-full fixed transition-all duration-500 ease-in-out bottom-0 z-50 flex flex-col
       items-center justify-center gap-8 p-8 text-white ${
         isMenuOpen ? 'left-0 opacity-100' : '-left-full opacity-0'
       }`}
    >
      {/* BACKGROUND SETTINGS */}
      <div className='change-background w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20'>
        <h3 className='text-xl font-semibold mb-4 text-center'>
          Choose Background
        </h3>
        <div className='btn-container flex gap-3 justify-center'>
          <button
            className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
              background === 'rain'
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => handleBackgroundChange('rain')}
            aria-pressed={background === 'rain'}
          >
            🌧️ Rain
          </button>
          <button
            className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
              background === 'beach'
                ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => handleBackgroundChange('beach')}
            aria-pressed={background === 'beach'}
          >
            🏖️ Beach
          </button>
        </div>
      </div>

      {/* BACKGROUND MUSIC SETTINGS */}
      <div className='change-background-music w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20'>
        <h3 className='text-xl font-semibold mb-4 text-center'>
          Background Music
        </h3>
        <div className='btn-container flex gap-3 justify-center'>
          <button
            className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
              isBgRelated
                ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => handleMusicTypeChange(true)}
            aria-pressed={isBgRelated}
          >
            🎵 Ambient
          </button>
          <button
            className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
              !isBgRelated
                ? 'bg-green-500 text-white shadow-lg transform scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            onClick={() => handleMusicTypeChange(false)}
            aria-pressed={!isBgRelated}
          >
            🧘 Relax
          </button>
        </div>
      </div>

      {/* BACKGROUND VOLUME SETTINGS */}
      <div className='bg-volume-management w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20'>
        <h3 className='text-xl font-semibold mb-4 text-center'>
          Volume Control
        </h3>
        <div className='flex items-center gap-4'>
          <span className='text-sm opacity-70 min-w-fit'>Volume:</span>
          <input
            className='volume-slider flex-1 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer transition-all duration-200 hover:bg-white/40'
            type='range'
            min={0}
            max={0.5}
            step={0.01}
            value={bgSoundVolume}
            onChange={(event) => setBgSoundVolume(event.target.value)}
            aria-label='Background volume'
          />
          <button
            className='p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/20'
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute background' : 'Mute background'}
          >
            {isMuted ? (
              <GoMute className='text-2xl' />
            ) : (
              <GoUnmute className='text-2xl' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

Menu.displayName = 'Menu';
export default Menu;
