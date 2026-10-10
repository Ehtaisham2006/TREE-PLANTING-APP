"use client";

import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  // Direct lazy state initialization for reading data after refresh
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initialValue;
      } catch (error) {
        console.error("Error reading localStorage key:", key, error);
        return initialValue;
      }
    }
    return initialValue;
  });

  // Data update save on local storage '
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting localStorage key:", key, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;