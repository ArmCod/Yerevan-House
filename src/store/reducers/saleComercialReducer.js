import { GET_SALE_COMERCIAL } from "../types";

const initialState = {
  comercial: [],
  count: null,
};

export const saleComercialReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALE_COMERCIAL:
      return {
        ...state,
        comercial: action.payload[0].data,
        count: action.payload[1],
      };
    default:
      return state;
  }
};
