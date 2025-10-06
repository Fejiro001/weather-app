import { useEffect, useState } from "react";

/**
 * Returns a value that updates only after a specified delay has elapsed since the last change.
 * Useful for debouncing fast-changing inputs (e.g., search queries) in React components.
 *
 * The timer resets on each value or delay change and is cleared on unmount.
 *
 * @template T
 * @param {T} value - The value to debounce.
 * @param {number} delay - Delay in milliseconds before the value is applied.
 * @returns {T} The debounced value.
 */
const useDebounce = (value, delay) => {
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
};

export default useDebounce;
