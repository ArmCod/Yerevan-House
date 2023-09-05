import axios from "axios";
import { keys } from "../../assets/keys/index";
import { GET_TRANSFERS, GET_POSITIONS, GET_FAST_SALE } from "../types";

export const getTransfers = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/transfer`, { params: data })
      .then(function (response) {
        dispatch({ type: GET_TRANSFERS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getPositions = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/position`, { params: data })
      .then(function (response) {
        dispatch({ type: GET_POSITIONS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getFastSale = (data) => {
  return async (dispatch) => {
    let allItems = [];
      axios.all([ axios.get(`${keys.apiKey}/flat`, { params: { ...data, urgent: 1 } }),
      axios.get(`${keys.apiKey}/house`, { params: { ...data, urgent: 1 } }),
      axios.get(`${keys.apiKey}/commercial`, { params: { ...data, urgent: 1 } }),
    axios.get(`${keys.apiKey}/landareas`, { params: { ...data, urgent: 1 } })])
      .then(axios.spread((firstResponse, secondResponse, thirdResponse,fourthResponse) => {  
    let items1 = firstResponse.data[0].data.map((i) => {
      return { ...i, item_type: "apartments" };
    });
    allItems.push(...items1);
    let items2 = secondResponse.data[0].data.map((i) => {
      return { ...i, item_type: "house" };
    });
    allItems.push(...items2);
    let items3 = thirdResponse.data[0].data.map((i) => {
      return { ...i, item_type: "com" };
    });
    allItems.push(...items3);
    let items4 = thirdResponse.data[0].data.map((i) => {
      return { ...i, item_type: "lands" };
    });
    allItems.push(...items4);
    dispatch({ type: GET_FAST_SALE, payload: allItems });
  }))
.catch(error => console.log(error));

  };
};
