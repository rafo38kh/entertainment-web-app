import { useEffect, useState } from "react";

type UseDebounceProps = {
  initialSearchTerm: string;
  delay: number;
};

const useDebounce = ({ initialSearchTerm, delay }: UseDebounceProps) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(initialSearchTerm);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(initialSearchTerm);
    }, delay);

    return () => clearTimeout(debounceTimeout);
  }, [initialSearchTerm, delay]);

  return debouncedSearchTerm;
};

export default useDebounce;
