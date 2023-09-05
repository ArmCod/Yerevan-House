import axios from "axios";
import { keys } from "../../assets/keys/index";
import Swal from "sweetalert2";
import {
  GET_CUURENT_CALENDAR,
  GET_SALE_APARTMENTS,
  GET_SALE_COMERCIAL,
  GET_SALE_HOUSES,
  GET_SALE_LANDS,
  GET_SALE_SINGLE,
  GET_WISH,
  GET_WISH_DAILY,
  SALE_SINGLE_CLEANUP,
  WISH_CLEANUP,
} from "../types";

// ------------------------------------------------ apartments -----------------------------------------------------------------------
export const getSaleApartments = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/flat`, { params: { ...data, type: "Sale" } })
      .then(function (response) {
        dispatch({ type: GET_SALE_APARTMENTS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSaleApartmentsPagination = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/flat`, { params: { ...page, type: "Sale" } })
      .then(function (response) {
        dispatch({ type: GET_SALE_APARTMENTS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// ------------------------------------------------ houses -------------------------------------------------------------------------------

export const getSaleHuses = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/house`, { params: { ...data } })
      .then(function (response) {
        dispatch({
          type: GET_SALE_HOUSES,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSaleHusesPagination = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/house`, { params: { ...page, type: "Sale" } })
      .then(function (response) {
        dispatch({ type: GET_SALE_HOUSES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// ------------------------------------------------- lands ------------------------------------------------------------------------------------

export const getSaleLands = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/landareas`, { params: { ...data, type: "Sale" } })
      .then(function (response) {
        dispatch({ type: GET_SALE_LANDS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSaleLandsPaginatio = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/landareas`, { params: { ...page, type: "Sale" } })
      .then(function (response) {
        dispatch({ type: GET_SALE_LANDS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// ------------------------------------------------- comercial ------------------------------------------------------------------------------------

export const getSaleComercial = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/commercial`, { params: { ...data, type: "Sale" } })
      .then(function (response) {
        dispatch({ type: GET_SALE_COMERCIAL, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSaleComercialPaginatio = (page) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/commercial`, { params: { ...page, type: "Sale" } })
      .then(function (response) {
        dispatch({ type: GET_SALE_COMERCIAL, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// ----------------------------------------------- single ------------------------------------------

export const getSaleSingle = (id, kindtype) => {
  return (dispatch) => {
    axios
      .get(
        kindtype === "apartment"
          ? `${keys.apiKey}/flat/current`
          : kindtype === "house"
          ? `${keys.apiKey}/house/current`
          : kindtype === "commercial"
          ? `${keys.apiKey}/commercial/current`
          : kindtype === "land"
          ? `${keys.apiKey}/landareas/current`
          : null,
        { params: { id } }
      )
      .then(function (response) {
        dispatch({ type: GET_SALE_SINGLE, payload: response.data[0] });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const saleSingleCleanup = () => {
  return (dispatch) => {
    dispatch({ type: SALE_SINGLE_CLEANUP });
  };
};

export const getWishAction = (params) => {
  return (dispatch) => {
    params.map(async (item) => {
      await axios
        .get(
          item.kindtype === "apartment"
            ? `${keys.apiKey}/flat/current`
            : item.kindtype === "house"
            ? `${keys.apiKey}/house/current`
            : item.kindtype === "commercial"
            ? `${keys.apiKey}/commercial/current`
            : item.kindtype === "land"
            ? `${keys.apiKey}/landareas/current`
            : null,
          { params: { id: Number(item.id) } }
        )
        .then(function (response) {
          dispatch({
            type: GET_WISH,
            payload: [response.data[0], item.kindtype],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
};

export const wishCleanUp = () => {
  return (dispatch) => {
    dispatch({ type: WISH_CLEANUP });
  };
};

export const getWishActionDaily = (params) => {
  return (dispatch) => {
    params.map((item) => {
      return axios
        .get(
          item.kindtype === "apartment"
            ? `${keys.apiKey}/flat/current`
            : item.kindtype === "house"
            ? `${keys.apiKey}/house/current`
            : item.kindtype === "commercial"
            ? `${keys.apiKey}/commercial/current`
            : item.kindtype === "land"
            ? `${keys.apiKey}/landareas/current`
            : null,
          { params: { id: Number(item.id) } }
        )
        .then(function (response) {
          dispatch({
            type: GET_WISH_DAILY,
            payload: [
              response.data[0],
              {
                kindtype: item.kindtype,
                bad: item.bad,
                count: item.count,
                start: item.start,
                end: item.end,
              },
            ],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
};

//----------------------------------------------- search -----------------------------------------------------

export const getSingleWithSearch = (code, message) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/search/code`, {
        params: code,
      })
      .then(function (response) {
        if (response.data === "None") {
          Swal.fire({
            icon: "error",
            title: message,
          });
        } else {
          let item;
          let type;
          if (response.data.Commercial.length !== 0) {
            item = response.data.Commercial[0];
            type = "commercial";
          }
          if (response.data.Flats.length !== 0) {
            item = response.data.Flats[0];
            type = "apartment";
          }
          if (response.data.Houses.length !== 0) {
            item = response.data.Houses[0];
            type = "house";
          }
          if (response.data.Land_areas.length !== 0) {
            item = response.data.Land_areas[0];
            type = "land";
          }

          if (item.type === "Sale") {
            window.location.href = `/sale/${type}/${item.id}`;
            dispatch({ type: GET_SALE_SINGLE, payload: item });
          } else {
            window.location.href = `/daily/${type}/${item.id}`;
            dispatch({ type: GET_SALE_SINGLE, payload: item });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const searchHomePage = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/search/categories`, { params: data })
      .then(function (response) {
        dispatch({ type: GET_SALE_SINGLE, payload: response?.data?.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

////////////// ------------------------------ calendar ----------------------------------------------------

export const getCurrentCalendar = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.apiKey}/order/formulate`, { params: data })
      .then(function (response) {
        dispatch({ type: GET_CUURENT_CALENDAR, payload: response?.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
