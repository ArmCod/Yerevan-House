import React, { useEffect } from "react";
import "./payments.css";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import axios from "axios";
const Success = () => {

  const {t} = useTranslation()

  useEffect(()=>{
    axios.post("https://back.yerevanhouse.net/api/success", {
     id:localStorage.getItem("order-id")
    })
    .then(function (response) {
      localStorage.removeItem('order-id');
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  return (
    <div className="main">
      <div>
        <span className="succes">
          <CheckIcon sx={{ color: "white" }} fontSize="large" />
        </span>
        <h1>{t("tank-you")} !!!</h1>
        <p>{t("payment-succes")}</p>
      </div>
    </div>
  );
};

export default Success;
