import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeWish } from "../../helpers/wish";
import { getFooter } from "../../store/actions/homePageAction";
import "./wish.css";

export const WishBuy = ({ item, setData, data, ind, kindtype }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useSelector((state) => state.botReducer.currencys);
  const curr = useSelector((state) => state.languageReducer.currency);
  const info = useSelector((state) => state?.homePageReducer.footer);

  useEffect(() => {
    dispatch(getFooter());
  }, [dispatch]);

  return (
    <div className="wish-car-box" key={item.id}>
      <div className="wish-close">
        <CloseIcon
          sx={{ color: "black" }}
          fontSize="medium"
          onClick={() => {
            data?.splice(ind, 1);
            setData([...data]);
            dispatch(removeWish("buy", item?.id, kindtype));
          }}
        />
      </div>
      <div className="wish-item-car" style={{ height: "100%", width: "80%" }}>
        <div className="wish-item-car-img-box">
          <img src={item.images[0]} alt="images" />
        </div>
        <div>
          <button
            className="button"
            onClick={() =>
              navigate(
                kindtype === "apartment"
                  ? `/sale/apartment/${item?.id}`
                  : kindtype === "house"
                  ? `/sale/house/${item?.id}`
                  : kindtype === "commercial"
                  ? `/sale/commercial/${item?.id}`
                  : kindtype === "land"
                  ? `/sale/land/${item?.id}`
                  : "/wish"
              )
            }
          >
            {" "}
            {t("view")}
          </button>
        </div>
      </div>
      <div
        className="wish-item-car"
        style={{ height: "100%", width: "100%", alignItems: "center" }}
      >
        <div className="wish-item-desc buyBox">
          <div>
            <div className="wish-item-desc-title-box">
              <h3>{item?.inner_code}</h3>
              <h3 style={{ margin: "10px 0", marginBottom: 30 }}>
                {item?.category}
              </h3>
            </div>
            <div
              className="wish-item-info-box"
              style={{ color: "white" }}
            ></div>
            <div className="home-buy-info-box">
              <div className="home-buy-info">
                <div className="dot"></div>
                <div>
                  {item?.rooms} {t("room")}
                </div>
              </div>

              <div className="home-buy-info">
                <div className="dot"></div>
                <div>
                  {item?.floor} {t("floor")}
                </div>
              </div>

              <div className="home-buy-info">
                <div className="dot"></div>
                <div>
                  {t("area")} {item?.area}
                </div>
              </div>

              <div className="home-buy-info">
                <div className="dot"></div>
                <div>
                  {item && curr === "amd"
                    ? Math.floor(item?.price * currency?.AMD)
                    : curr === "rub"
                    ? Math.floor(item?.price * currency?.RUB)
                    : curr === "eur"
                    ? Math.floor(item?.price * currency?.EUR)
                    : item?.price}

                  <span className="dram">
                    {" "}
                    {curr === "amd"
                      ? "Դ"
                      : curr === "rub"
                      ? "₽"
                      : curr === "eur"
                      ? "€"
                      : "$"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href={`tel:${info?.vatarqi_bazhin?.slice(0, 13)}`}>
              <button className="button">{t("callUs")}</button>
            </a>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
