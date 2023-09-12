import { Dispatch, SetStateAction, useEffect, useState } from "react";

const getValue = (key: string): string => {
  if (typeof window !== "undefined") {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? storedValue : "0";
  }
  return "0";
};

type useLocalStorageType = [string, Dispatch<SetStateAction<string>>];


export const useLocalStorage = function (key: string): useLocalStorageType {
  const [value, setValue] = useState(() => getValue(key));

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  useEffect(() => {
    const storedValue = getValue(key);
    if (storedValue !== value) {
      setValue(storedValue);
    }
  }, [key]);

  return [value, setValue];
};