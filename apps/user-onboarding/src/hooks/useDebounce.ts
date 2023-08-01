import { useState, useEffect } from 'react';

/**
 * Returns a debounced value.
 * @param value The value to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 * @example
 * const debouncedValue = useDebounce(value, 500);
 */
export default function useDebounce<Value>(value: Value, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
