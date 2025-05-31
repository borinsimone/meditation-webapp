import React, { useEffect, useCallback } from 'react';
import Menu from './components/Menu';
import Timer from './components/Timer';
import LandingQuote from './components/LandingQuote';
import meditationLogo from './assets/images/zen-meditation.png';
import Background from './components/Background';
import { useGlobalContext } from './context/context';
import { GiLotus } from 'react-icons/gi';
import { BsFillGearFill } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const App = React.memo(() => {
  const {
    setIsMenuOpen,
    isMenuOpen,
    isTimerOpen,
    setIsTimerOpen,
    bgColor,
    toggleMenu,
    isLandingOpen,
  } = useGlobalContext();

  const handleTimerToggle = useCallback(() => {
    setIsTimerOpen(!isTimerOpen);
    setIsMenuOpen(false);
  }, [isTimerOpen, setIsTimerOpen, setIsMenuOpen]);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='main-container'>
      <div className='container'>
        <LandingQuote />
        <Background />
        <Menu />

        {/* Title with better animation */}
        <h1
          className={`text-white text-2xl md:text-4xl w-full text-center absolute top-[10vh] font-light tracking-wide transition-all duration-700 ${
            isLandingOpen
              ? 'opacity-0 translate-y-8'
              : 'opacity-100 translate-y-0'
          }`}
        >
          Your journey starts from You
        </h1>

        {/* Logo with hover animation */}
        <div
          className={`absolute top-[30%] md:top-[20%] lg:top-[30%] left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
            isLandingOpen
              ? 'opacity-0 scale-95 translate-y-8'
              : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          <img
            src={meditationLogo}
            className='h-[300px] md:h-[400px] aspect-square filter drop-shadow-2xl hover:scale-105 transition-transform duration-300'
            alt='Meditation logo'
          />
        </div>

        {/* Main meditation button */}
        <div
          className={`absolute bottom-[15vh] left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
            isLandingOpen
              ? 'opacity-0 translate-y-8'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            className='group relative p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30'
            onClick={handleTimerToggle}
            aria-label='Open meditation timer'
          >
            <GiLotus className='text-[60px] md:text-[80px] text-white transition-transform duration-300 group-hover:rotate-12' />
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse'></div>
          </button>
          <p className='text-white text-center mt-2 text-sm opacity-80'>
            Start Meditation
          </p>
        </div>

        {/* Menu button */}
        <div
          className={`absolute bottom-[5vh] left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ${
            isLandingOpen
              ? 'opacity-0 translate-y-8'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            className='group p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30'
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <AiOutlineCloseCircle className='text-[35px] md:text-[50px] text-white transition-transform duration-300 group-hover:rotate-90' />
            ) : (
              <BsFillGearFill className='text-[35px] md:text-[50px] text-white transition-transform duration-300 group-hover:rotate-180' />
            )}
          </button>
        </div>

        <Timer />
      </div>
    </div>
  );
});

App.displayName = 'App';
export default App;
