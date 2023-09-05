import { GET_SALE_HOUSES } from "../types";

const initialState = {
  houses: [],
  count: null,
};

export const saleHousesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALE_HOUSES:
      return {
        ...state,
        houses: action.payload[0].data,
        count: action.payload[1],
      };
    default:
      return state;
  }
};
