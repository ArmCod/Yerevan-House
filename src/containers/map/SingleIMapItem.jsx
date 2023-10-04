import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MapSingle = ({ handleClose, data, category, type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const language = useSelector((state) => state?.languageReducer.lang);
  const handleNavigate = () => {
    if (type == "Sale") {
      if (category == "Flat") {
        navigate(`/sale/apartment/${data?.id}`);
      } else if (category === "House") {
        navigate(`/sale/house/${data?.id}`);
      } else if (category === "Land_area") {
        navigate(`/sale/land/${data?.id}`);
      } else if (category === "Commercial") {
        navigate(`/sale/commercial/${data?.id}`);
      }
    } else {
      if (category == "Flat") {
        navigate(`/daily/apartment/${data?.id}`);
      } else if (category === "House") {
        navigate(`/daily/house/${data?.id}`);
      } else if (category === "Commercial") {
        navigate(`/daily/commercial/${data?.id}`);
      }
    }
  };
  return (
    <div className="mapY mapC">
      <div className="mapCloseBox">
        <CloseIcon
          sx={{ color: "#F2B84D" }}
          fontSize="medium"
          onClick={handleClose}
        />
      </div>
      <img src={data?.images[0]} alt="singleMap" className="mapSingleImage" />
      <h4>
        {language === "en"
          ? data?.title_en
          : language === "ru"
          ? data?.title_ru
          : data?.title_am}
      </h4>
      <div className="mapsSingleCallBox">
        <h3 onClick={handleNavigate}>{t("showMore")}</h3>
      </div>
    </div>
  );
};

export default MapSingle;
