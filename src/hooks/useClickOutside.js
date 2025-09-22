import { useCallback, useEffect } from "react";

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

  return {};
};

export default useClickOutside;
