import { CHANGE_CURRENCY, CHANGE_LANGUAGE } from "../types";

const initialState = {
  lang: localStorage.getItem("language"),
  currency: localStorage.getItem("currency"),
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    default:
      return state;
  }
};
