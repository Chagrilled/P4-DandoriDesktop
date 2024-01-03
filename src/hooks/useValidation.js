import { useMemo } from "react";

const worst = (result0, result1) => result0 || result1;

export const useValidation = ({ value, validators = [] }) => {
  const syncState = useMemo(() => {
    let worstError = undefined;
    for (const validator of validators) {
      worstError = worst(worstError, validator(value));
      if (worstError) {
        return worstError;
      }
    }
    return worstError;
  }, [value, ...validators]);

  return {
    isValid: !syncState,
    isPending: false,
    error: syncState
  };
};
