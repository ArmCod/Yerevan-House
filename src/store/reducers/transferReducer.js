import { GET_FAST_SALE, GET_POSITIONS, GET_TRANSFERS } from "../types";

const initialState = {
  transfers: [],
  count: null,
  positions: [],
  fastSale: [],
  fastCount: null,
};

export const transfersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSFERS:
      return {
        ...state,
        transfers: action.payload[0].data,
        count: action.payload[1],
      };
    case GET_POSITIONS:
      return {
        ...state,
        positions: action.payload.data,
      };
    case GET_FAST_SALE:
      return {
        ...state,
        fastSale: action.payload,
      };
    default:
      return state;
  }
};
