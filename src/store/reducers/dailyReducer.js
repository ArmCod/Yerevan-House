import {
  GET_CUURENT_CALENDAR,
  GET_DAILY_APARTMENTS,
  GET_DAILY_HOTELS,
  GET_DAILY_HOUSES,
} from "../types";

const initialState = {
  apartments: [],
  apartmentsCount: null,
  houses: [],
  housesCount: null,
  currentCalendar: null,
  comercial: [],
  comercialCount: null
};

export const DailtReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DAILY_APARTMENTS:
      return {
        ...state,
        apartments: action.payload[0].data,
        apartmentsCount: action.payload[1],
      };
    case GET_DAILY_HOUSES:
      return {
        houses: action.payload[0].data,
        housesCount: action.payload[1],
      };
    case GET_CUURENT_CALENDAR:
      return {
        ...state,
        currentCalendar: action.payload,
      };
    case GET_DAILY_HOTELS:
      return {
        ...state,
        comercial: action.payload[0].data,
        comercialCount: action.payload[1],
      }
    default:
      return state;
  }
};
