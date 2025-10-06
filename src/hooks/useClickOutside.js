import { useCallback, useEffect } from "react";

/**
 * Closes an open UI when clicking outside a referenced element.
 *
 * Adds a 'mousedown' listener to detect outside clicks and cleans it up on unmount.
 *
 * @param ref - Ref of the element to monitor for outside clicks.
 * @param setIsOpen - Setter controlling the open/closed state.
 * @returns {Function} toggleDropdown - handler to toggle the open state.
 */
const useClickOutside = (ref, setIsOpen) => {
  const hideDropdown = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        hideDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideDropdown, ref]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return { toggleDropdown };
};

export default useClickOutside;
