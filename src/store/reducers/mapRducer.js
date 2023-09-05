import { GET_MAP_SIGLE, GET_WISH_TEXT, GET_YEREVAN_MAP_DATA } from "../types";

const initialState = {
  list: [],
  single: null,
  wishText: null,
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_YEREVAN_MAP_DATA:
      return {
        ...state,
        list: action.payload,
      };
    case GET_MAP_SIGLE:
      return {
        ...state,
        single: action.payload,
      };
    case GET_WISH_TEXT:
      return {
        ...state,
        wishText: action.payload,
      };
    default:
      return state;
  }
};
