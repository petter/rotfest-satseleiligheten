'use client';

import { useEffect, useRef } from 'react';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to play audio after user interaction
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Set volume to 50%
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Auto-play was prevented:', error);
          });
        }
        
        // Remove the event listener after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <audio 
      ref={audioRef} 
      loop 
      autoPlay
      className="hidden"
    >
      <source src="/music/background-music.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
