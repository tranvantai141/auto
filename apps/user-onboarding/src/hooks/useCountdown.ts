import React, { useCallback, useEffect } from 'react';

export type CountdownOptions = {
  startImmediately?: boolean;
};

function useCountdown(duration: number, options?: CountdownOptions) {
  const [countdown, setCountdown] = React.useState(duration);
  const [isPaused, setIsPaused] = React.useState(!options?.startImmediately);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback(() => {
    setCountdown(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = setInterval(
      () => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            return 0;
          }

          return prevCountdown - 1;
        });
      },
      isPaused ? undefined : 1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);

  return { countdown, pause, resume, reset };
}

export default useCountdown;
