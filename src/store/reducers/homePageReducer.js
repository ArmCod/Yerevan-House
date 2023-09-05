import {
  GET_ABOUT_US,
  GET_ADVANTAGE,
  GET_ARMENIA,
  GET_FESTIVALS,
  GET_FOOTER,
  GET_SIGHTSEEING,
  GET_SLIDER,
  GET_SUCCESSES,
} from "../types";

const initialState = {
  slider: [],
  aboutUs: {},
  footer: {},
  successes: [],
  advantage: [],
  armenia: [],
  festivals: [],
  sightseeing: [],
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SLIDER:
      return {
        ...state,
        slider: action.payload,
      };
    case GET_ABOUT_US:
      return {
        ...state,
        aboutUs: action.payload,
      };
    case GET_FOOTER:
      return {
        ...state,
        footer: action.payload,
      };
    case GET_SUCCESSES:
      return {
        ...state,
        successes: action.payload,
      };
    case GET_ADVANTAGE:
      return {
        ...state,
        advantage: action.payload,
      };
    case GET_ARMENIA:
      return {
        ...state,
        armenia: action.payload,
      };
    case GET_FESTIVALS:
      return {
        ...state,
        festivals: action.payload,
      };
    case GET_SIGHTSEEING:
      return {
        ...state,
        sightseeing: action.payload,
      };
    default:
      return state;
  }
};
