import { CHANGE_CURRENCY, CHANGE_LANGUAGE } from "../types";

export const changeLanguage = (lang) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_LANGUAGE, payload: lang });
  };
};

export const changeCurrency = (curr) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_CURRENCY, payload: curr });
  };
};
