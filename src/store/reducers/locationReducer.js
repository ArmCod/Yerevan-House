import { GET_CITIES, GET_CONDITION, GET_REGIONS, SHOW_SUCCESS } from "../types";

const initialState = {
  cities: [],
  regions: [],
  conditions: {},
  success: false,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case GET_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    case SHOW_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case GET_CONDITION:
      return {
        ...state,
        conditions: action.payload,
      };
    default:
      return state;
  }
};
