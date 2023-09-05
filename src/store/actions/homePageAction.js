import axios from "axios";
import { keys } from "../../assets/keys";
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

export const getSliderData = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/slider`)
      .then(function (response) {
        dispatch({ type: GET_SLIDER, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getAboutUs = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/about`)
      .then(function (response) {
        dispatch({ type: GET_ABOUT_US, payload: response.data[0] });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getFooter = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/contact`)
      .then(function (response) {
        dispatch({ type: GET_FOOTER, payload: response.data[0] });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSuccesses = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/successes`)
      .then(function (response) {
        dispatch({ type: GET_SUCCESSES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getAdvantage = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/advantage`)
      .then(function (response) {
        dispatch({ type: GET_ADVANTAGE, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getArmenia = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/armenia`)
      .then(function (response) {
        dispatch({ type: GET_ARMENIA, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getFestivals = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/festival`, { params: { id: 3 } })
      .then(function (response) {
        dispatch({ type: GET_FESTIVALS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSightseeing = () => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/festival`, { params: { id: 2 } })
      .then(function (response) {
        dispatch({ type: GET_SIGHTSEEING, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
