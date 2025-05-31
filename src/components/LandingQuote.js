import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/context';

const LandingQuote = React.memo(() => {
  const {
    background,
    setBackground,
    bgSoundVolume,
    isLandingOpen,
    setIsLandingOpen,
    isMuted,
    bgSound,
    bgColor,
  } = useGlobalContext();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'https://api.api-ninjas.com/v1/quotes?category=inspirational';
  const config = {
    headers: {
      'X-Api-Key': 'pnJLrED905ZrTmnWS88uoQ==XtlBWnzorkutt0Ig',
    },
  };

  const getQuotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(url, config);
      setData(res.data[0]);
    } catch (error) {
      console.error(error);
      setError('Failed to load quote');
      // Fallback quote
      setData({
        quote:
          'The present moment is the only time over which we have dominion.',
        author: 'Thích Nhất Hạnh',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsLandingOpen(false);
    setBackground(background);

    if (!isMuted) {
      bgSound.current.volume = bgSoundVolume;
      bgSound.current.play();
    }
  }, [
    setIsLandingOpen,
    setBackground,
    background,
    isMuted,
    bgSound,
    bgSoundVolume,
  ]);

  useEffect(() => {
    getQuotes();
  }, [getQuotes]);

  return (
    <div
      className={`fixed inset-0 ${bgColor} bg-opacity-95 backdrop-blur-sm text-white flex items-center justify-center flex-col transition-all duration-700 ease-in-out ${
        isLandingOpen
          ? 'z-[60] opacity-100 scale-100'
          : '-z-50 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className='advice absolute bottom-8 text-center text-sm opacity-80 animate-pulse'>
        🎧 Use headphones for optimal experience
      </div>

      <div className='quote-container w-full max-w-2xl px-8 flex flex-col justify-center items-center space-y-6'>
        <div className='w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 animate-bounce'>
          <span className='text-2xl'>🧘‍♀️</span>
        </div>

        {isLoading ? (
          <div className='space-y-4 w-full'>
            <div className='h-6 bg-white/20 rounded animate-pulse'></div>
            <div className='h-6 bg-white/20 rounded animate-pulse w-3/4 mx-auto'></div>
            <div className='h-4 bg-white/20 rounded animate-pulse w-1/2 ml-auto'></div>
          </div>
        ) : (
          <div className='space-y-6 text-center animate-fade-in'>
            <blockquote className='text-xl md:text-2xl font-light leading-relaxed italic'>
              "{data?.quote}"
            </blockquote>
            <cite className='text-lg opacity-80 not-italic'>
              — {data?.author}
            </cite>
          </div>
        )}

        {error && <div className='text-yellow-300 text-sm'>{error}</div>}

        <button
          className='mt-8 py-3 px-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg font-medium'
          onClick={handleClose}
          disabled={isLoading}
        >
          ✨ Begin Your Journey
        </button>
      </div>
    </div>
  );
});

LandingQuote.displayName = 'LandingQuote';
export default LandingQuote;
