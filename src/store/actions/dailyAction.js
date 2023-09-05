import axios from "axios";
import { keys } from "../../assets/keys/index";
import {
  GET_DAILY_APARTMENTS,
  GET_DAILY_HOTELS,
  GET_DAILY_HOUSES,
} from "../types";

// ------------------------------------------------ apartments -----------------------------------------------------------------------
export const getDailyApartments = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/flat`, { params: { ...data } })
      .then(function (response) {
        dispatch({ type: GET_DAILY_APARTMENTS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getDailyApartmentsPaginatio = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/flat`, { params: { ...page } })
      .then(function (response) {
        dispatch({ type: GET_DAILY_APARTMENTS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// ----------------------------------------------- houses ----------------------------------------------------------------------------

export const getDailyHouses = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/house`, { params: { ...data } })
      .then(function (response) {
        dispatch({ type: GET_DAILY_HOUSES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
export const getDailyHousesPaginatio = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/house`, { params: { ...page } })
      .then(function (response) {
        dispatch({ type: GET_DAILY_HOUSES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
// ------------------------------------------ hotels ---------------------------------------

export const getDailyComercial = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/commercial`, {
        params: { ...data, type: "For Rent" },
      })
      .then(function (response) {
        dispatch({ type: GET_DAILY_HOTELS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getDailyComercialPaginatio = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/commercial`, {
        params: { ...page, type: "For Rent" },
      })
      .then(function (response) {
        dispatch({ type: GET_DAILY_HOTELS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

////////////////////////

export const setVuie = (type, id) => {
  return (dispatch) => {
    if (type === "commercial") {
      axios
        .get("https://back.yerevanhouse.net/api/addcommercialview", {
          params: { id },
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
    if (type === "apartment") {
      axios
        .get("https://back.yerevanhouse.net/api/addflatview", {
          params: { id },
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
    if (type === "house") {
      axios
        .get("https://back.yerevanhouse.net/api/addhouseview", {
          params: { id },
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
    if (type === "land") {
      axios
        .get("https://back.yerevanhouse.net/api/addlandareasview", {
          params: { id },
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
  };
};
