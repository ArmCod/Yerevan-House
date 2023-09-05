import axios from "axios";
import { keys } from "../../assets/keys";
import { BOT_QUESTION, CHANGE_DETAILE, GET_CURRENCY } from "../types";

export const botQuestion = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.apiKey}/chat/add`, data)
      .then(function (response) {
        if (response.status === 200) {
          dispatch({ type: BOT_QUESTION, payload: data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const changeDetaile = (type) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_DETAILE, payload: type });
  };
};

export const getCurrencys = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/currency`, data)
      .then(function (response) {
        if (response.status === 200) {
          dispatch({ type: GET_CURRENCY, payload: response.data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
