import React, { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSaleSingle } from "../../store/actions/saleApartmentAction";
import { useTranslation } from "react-i18next";
import { changeDetaile } from "../../store/actions/botAction";
import { addDots } from "../../helpers/addDots";

export default function CardDaily({
  stap,
  image,
  category,
  location,
  price,
  views,
  footage,
  rooms,
  floor,
  path,
  type,
  variant,
  item,
}) {
  const currency = useSelector((state) => state.botReducer.currencys);
  const curr = useSelector((state) => state.languageReducer.currency);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state) => state?.languageReducer.lang);
  const features = [
    {
      id: 1,
      text: t("new_building"),
      show:
        `${item?.new_building}`.toLowerCase() === "new_building".toLowerCase(),
    },
    {
      id: 2,
      text: t("elevator"),
      show: `${item?.elevator}`.toLowerCase() === "elevator".toLowerCase(),
    },
    {
      id: 3,
      text: t("internet"),
      show: `${item?.internet}`.toLowerCase() === "internet".toLowerCase(),
    },
    {
      id: 4,
      text: t("cooling"),
      show: `${item?.cooling}`.toLowerCase() === "cooling".toLowerCase(),
    },
    {
      id: 5,
      text: t("refrigerator"),
      show:
        `${item?.refrigerator}`.toLowerCase() === "refrigerator".toLowerCase(),
    },
    {
      id: 6,
      text: t("balconies"),
      show: `${item?.balconies}`.toLowerCase() === "balconies".toLowerCase(),
    },
  ];
  return (
    <div className="card-daily" style={{ cursor: "pointer" }}>
      <img src={image} alt="cartImg" />
      <div
        className="cardDaily-info-box"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3>
          {" "}
          {language == "en"
            ? item?.title_en
            : language == "ru"
            ? item?.title_ru
            : item?.title_hy}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {features?.[0]?.show == false && (
            <div>
              <div className="feature" style={{ width: 230 }}>
                <div style={{ color: "red", userSelect: "none" }}>X</div>
                <div>{features?.[0]?.text}</div>
              </div>
            </div>
          )}
          {features?.map((itema, index) => {
            if (itema?.show) {
              return (
                <div key={itema.id}>
                  <div className="feature" style={{ width: 230 }}>
                    <div className="featuresDot"></div>
                    <div>
                      {itema.show && itema.text} {itema.show && itema?.value}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }} className="card-daily-bottom">
          <div>
            {footage} {language == "en" ? "m" : language == "ru" ? "м" : "մ"}{" "}
            <sup>2</sup>
          </div>
          <div>
            {rooms}{" "}
            {rooms !== "" && rooms !== null && rooms !== undefined && t("room")}
          </div>
          <div>
            {floor}{" "}
            {floor !== "" &&
              floor !== null &&
              rooms !== undefined &&
              t("floor")}
          </div>
          <div className="card-other-info">
            <div>
              <RemoveRedEyeIcon sx={{ color: "#4e8cb8" }} fontSize="small" />
            </div>
            <div>{views}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0 10px 0",
          }}
          className="card-daily-bottom-price"
        >
          <div>
            {price !== 0 && item?.paym !== 1 ? (
              <h3>
                {curr && curr == "amd"
                  ? addDots(Math.floor(price * currency?.AMD))
                  : curr == "rub"
                  ? addDots(Math.floor(price * currency?.RUB))
                  : curr == "eur"
                  ? addDots(Math.floor(price * currency?.EUR))
                  : addDots(price)}

                <span className="dram">
                  {" "}
                  {curr == "amd"
                    ? "Դ"
                    : curr == "rub"
                    ? "₽"
                    : curr == "eur"
                    ? "€"
                    : "$"}
                </span>
              </h3>
            ) : (
              <h2 style={{ margin: "5px 0" }}>{t("condition")}</h2>
            )}
          </div>
          <button className="button">{t("amragrel")}</button>
        </div>
      </div>
    </div>
  );
}
