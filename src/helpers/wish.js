import { WISH_COUNT } from "../store/types";

export const wishData = JSON.parse(localStorage.getItem("wish"));

export const addWish = (varint, id, kindtype, all) => {
  const wishDataSecond = JSON.parse(localStorage.getItem("wish"))
  return (dispatch) => {
    if (varint === "daily") {

      let newData = {
        ...wishDataSecond,
        daily: [...wishDataSecond?.daily, { ...all, id, kindtype, }],
      };
      localStorage.setItem("wish", JSON.stringify(newData));
    } else if (varint === "buy") {
      let newData = {
        ...wishDataSecond,
        buy: [...wishDataSecond?.buy, { id, kindtype }],
      };
      localStorage.setItem("wish", JSON.stringify(newData));
    }
    dispatch({ type: WISH_COUNT })
  }
};

export const removeWish = (varint, id, kindtype) => {
  const wishDataSecond = JSON.parse(localStorage.getItem("wish"))
  return (dispatch) => {
    if (varint === "daily") {
      let newHouse = wishDataSecond?.daily?.filter((item) => !((String(item.id) === String(id)) && (item?.kindtype === kindtype)));
      let newData = {
        ...wishDataSecond,
        daily: newHouse,
      };
      localStorage.setItem("wish", JSON.stringify(newData));
    } else if (varint === "buy") {

      let newHouse = wishDataSecond?.buy?.filter((item) => !((String(item.id) === String(id)) && (item?.kindtype === kindtype)));
      let newData = {
        ...wishDataSecond,
        buy: newHouse,
      };
      localStorage.setItem("wish", JSON.stringify(newData));
    }
    dispatch({ type: WISH_COUNT })
  }
};

export const getWishData = () => {
  const wishDataSecond = JSON.parse(localStorage.getItem("wish"))
  return {
    buy: wishDataSecond?.buy,
    daily: wishDataSecond?.daily,
  };
};
// wish:{
//     "house-daily":[[id,"apartments"]],
//     "house-buy":[[id,"apartments"]]
// }
