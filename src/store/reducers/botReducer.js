import { BOT_QUESTION, CHANGE_DETAILE, GET_CURRENCY } from "../types";

const initialState = {
  userData: [],
  sale: null,
  currencys: null
};

export const botReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOT_QUESTION:
      return {
        ...state,
        userData: action.payload,
      };
    case CHANGE_DETAILE:
      return {
        ...state,
        sale: action.payload,
      };
    case GET_CURRENCY:
      return {
        ...state,
        currencys: action.payload
      }
    default:
      return state;
  }
};
