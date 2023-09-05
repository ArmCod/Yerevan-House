import { GET_SALE_LANDS, GET_WISH, GET_WISH_DAILY, WISH_CLEANUP } from "../types";

const initialState = {
  lands: [],
  count: null,
  saleWish: [],
  dailyWish: [],
};

export const saleLandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALE_LANDS:
      return {
        ...state,
        lands: action.payload[0].data,
        count: action.payload[1],
      };
    case GET_WISH: {
      return {
        ...state,
        saleWish: [...state.saleWish, action.payload],
      };
    }
    case GET_WISH_DAILY:
      return {
        ...state,
        dailyWish: [...state.dailyWish, action.payload],
      };
    case WISH_CLEANUP:
      return {
        ...state,
        saleWish: [],
        dailyWish: []
      }
    default:
      return state;
  }
};
