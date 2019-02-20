import { useCallback, useEffect, useRef } from 'react';

export default function useDebouncedCallback(
  callback: (...args: any[]) => any,
  delay: number,
  deps: any[]
) {
  const functionTimeoutHandler = useRef<number | null>(null);
  const debouncedFunction = useCallback(callback, deps);

  useEffect(
    () => () => {
      if (functionTimeoutHandler.current !== null) {
        window.clearTimeout(functionTimeoutHandler.current);
      }
    },
    []
  );

  return (...args: any[]) => {
    if (functionTimeoutHandler.current !== null) {
      window.clearTimeout(functionTimeoutHandler.current);
    }
    functionTimeoutHandler.current = window.setTimeout(() => {
      debouncedFunction(...args);
    }, delay);
  };
}
