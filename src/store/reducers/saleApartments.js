import { GET_SALE_APARTMENTS, GET_SALE_SINGLE, SALE_SINGLE_CLEANUP, WISH_COUNT } from "../types";

const initialState = {
  apartments: [],
  count: null,
  single: null,
  singleId: null,
  wishcount: 0
};

export const saleApartmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALE_APARTMENTS:
      return {
        ...state,
        apartments: action.payload[0].data,
        count: action.payload[1],
      };
    case GET_SALE_SINGLE:
      return {
        ...state,
        single: action.payload,
        singleId: action.payload.id,
      };
    case SALE_SINGLE_CLEANUP:
      return {
        ...state,
        single: null,
        singleId: null,
      }
    case WISH_COUNT:
      return {
        ...state,
        wishcount: state.wishcount + 1
      }
    default:
      return state;
  }
};
