import React from "react";
import "./payments.css";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
const Fail = () => {

  const {t} = useTranslation()
  return (
    <div>
      <div className="main">
        <div>
          <span>
            <CloseIcon sx={{ color: "white" }} fontSize="large" />
          </span>
          <h1>{t("tank-you")} !!!</h1>
        <p>{t("payment-fail")}</p>
        </div>
      </div>
    </div>
  );
};

export default Fail;
