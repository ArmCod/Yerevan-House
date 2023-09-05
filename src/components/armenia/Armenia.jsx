import React from "react";
import "./armenia.css";
import ararat from "../../assets/images/ararat.png";
import Divaider from "../divaider/Divaider";
import armenia1 from "../../assets/images/armenia1.png";
import armenia2 from "../../assets/images/armenia2.png";
import armenia3 from "../../assets/images/armenia3.png";
import {
  ABOUT_COUNTRY_PAGE,
  FESTIVALS_PAGE,
  SIGHTSEEING_PAGE,
} from "../../routing/urls";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ArmeniaItem({ image, title, description, path }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="armeniaItem" onClick={() => navigate(path)}>
      <img src={image} className="itemImage" />
      <div className="linear">
        <div className="armeniaInfoBox">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="vuewMoreBox">
          <button className="button" onClick={() => navigate(path)}>
            {t("showMore")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Armenia() {
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      image: armenia1,
      title: t("aboutCountry"),
      description: t("aboutCountryLong"),
      path: ABOUT_COUNTRY_PAGE,
    },
    {
      id: 2,
      image: armenia2,
      title: t("sightseeing"),
      description: t("sightseeingLong"),
      path: SIGHTSEEING_PAGE,
    },
    {
      id: 3,
      image: armenia3,
      title: t("festivales"),
      description: t("festivalesLong"),
      path: FESTIVALS_PAGE,
    },
  ];
  return (
    <div className="armenia">
      <img src={ararat} alt="ararat" className="ararat" />
      <div className="bannerTitleBox">
        <div className="titleBox">
          <Divaider width="30" />
          <div className="title">
            <h1>{t("aboutUs")}</h1>
          </div>
          <Divaider width="30" />
        </div>
      </div>
      <div className="infoBoxArm">
        {data?.map(({ id, title, description, image, path }) => {
          return (
            <ArmeniaItem
              key={id}
              image={image}
              title={title}
              description={description}
              path={path}
            />
          );
        })}
      </div>
    </div>
  );
}
