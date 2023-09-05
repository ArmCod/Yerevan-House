import axios from "axios";
import { keys } from "../../assets/keys";
import { GET_MAP_SIGLE, GET_WISH_TEXT, GET_YEREVAN_MAP_DATA } from "../types";

export const getYerevanMapData = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/map/list`, { params: data })
      .then(function (response) {
        if (response.data !== "none") {
          dispatch({ type: GET_YEREVAN_MAP_DATA, payload: response.data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const showMapItem = (id, type, category) => {
  return (dispatch) => {
    if (type === "Sale") {
      if (category === "Flat") {
        axios
          .get(`${keys.apiKey}/flat/current`, { params: { id } })
          .then(function (response) {
            dispatch({ type: GET_MAP_SIGLE, payload: response.data[0] });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (category === "House") {
        axios
          .get(`${keys.apiKey}/house/current`, { params: { id } })
          .then(function (response) {
            dispatch({ type: GET_MAP_SIGLE, payload: response.data[0] });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (category === "Land_area") {
        axios
          .get(`${keys.apiKey}/landareas/current`, { params: { id } })
          .then(function (response) {
            dispatch({ type: GET_MAP_SIGLE, payload: response.data[0] });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (category === "Commercial") {
        axios
          .get(`${keys.apiKey}/commercial/current`, { params: { id } })
          .then(function (response) {
            dispatch({ type: GET_MAP_SIGLE, payload: response.data[0] });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      if (category === "Flat") {
        axios
          .get(`${keys.apiKey}/flat/current`, { params: { id } })
          .then(function (response) {
            dispatch({ type: GET_MAP_SIGLE, payload: response.data[0] });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (category === "House") {
        axios
          .get(`${keys.apiKey}/house/current`, { params: { id } })
          .then(function (response) {
            dispatch({ type: GET_MAP_SIGLE, payload: response.data[0] });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (category === "Commercial") {
        axios
          .get(`${keys.apiKey}/commercial/current`, { params: { id } })
          .then(function (response) {
            dispatch({ type: GET_MAP_SIGLE, payload: response.data[0] });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
};

export const getWishText = (id) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/product/condition`)
      .then(function (response) {
        dispatch({ type: GET_WISH_TEXT, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const forming = (data) => {
  return (dispatch) => {
    axios
      .post("https://back.yerevanhouse.net/api/pay", data)
      .then(function (response) {
        localStorage.setItem("order-id", response.data.id);
        window.location.href = response.data.link;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
