import axios from "axios";
import { keys } from "../../assets/keys";
import {
  GET_CITIES,
  GET_CONDITION,
  GET_ITEM_WITH_CODE,
  GET_REGIONS,
  SHOW_SUCCESS,
} from "../types";

export const getCities = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/city`)
      .then(function (response) {
        dispatch({ type: GET_CITIES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getCity = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${keys.apiKey}/city/current?id=${id}`)
      .then(function (response) {
        dispatch({ type: GET_CITIES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getRegions = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/region`)
      .then(function (response) {
        dispatch({ type: GET_REGIONS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getConditions = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/condition`)
      .then(function (response) {
        dispatch({ type: GET_CONDITION, payload: response.data[0] });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const sendPartnerRequest = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.apiKey}/cooperate/insert`, data)
      .then(function (response) {
        if (response.status === 200) {
          dispatch({ type: SHOW_SUCCESS, payload: true });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const changeSuccess = (data) => {
  return (dispatch) => {
    dispatch({ type: SHOW_SUCCESS, payload: data });
  };
};

export const getItemWithCOde = (code) => {
  return (dispatch) => {
    dispatch({ type: GET_ITEM_WITH_CODE, payload: code });
  };
};
