// Hook for managing Web Audio API context and playback state
import { useRef, useState, useEffect } from 'react';

export function useAudio() {
  const audioCtxRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return { getAudioContext, isPlaying, setIsPlaying };
}
