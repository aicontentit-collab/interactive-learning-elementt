// Hook for running a requestAnimationFrame loop, returns elapsed time
import { useEffect, useRef } from 'react';

export function useAnimationLoop(callback, running = true) {
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!running) return;

    const loop = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      callback(timestamp - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [callback, running]);
}
