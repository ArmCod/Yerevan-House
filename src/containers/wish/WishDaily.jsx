import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import masterCard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";
import { removeWish } from "../../helpers/wish";
import { FORMING_PAGE } from "../../routing/urls";
import "./wish.css";

export const WishDaily = ({
  item,
  setData,
  data,
  ind,
  kindtype,
  start,
  end,
  bad,
  count,
  wishText,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state) => state?.languageReducer.lang);

  const goToBuyHouse = (id, variant, price) => {
    localStorage.setItem(
      "basket-house",
      JSON.stringify({
        id,
        variant,
        item: "house",
        price,
      })
    );
    navigate(FORMING_PAGE);
  };

  return (
    <div className="wish-car-box" key={item?.id}>
      <div className="wish-close">
        <CloseIcon
          sx={{ color: "black" }}
          fontSize="medium"
          onClick={() => {
            data?.splice(ind, 1);
            setData([...data]);
            dispatch(removeWish("daily", item?.id, kindtype));
          }}
        />
      </div>
      <div className="wish-item-car">
        <div className="wish-item-car-img-box">
          <img src={item?.images[0]} alt="images" />
          <div>
            {wishText
              ? language === "en"
                ? wishText?.description_en
                : language === "ru"
                ? wishText?.description_ru
                : wishText?.description_am
              : "Ինչպես վերցնել բնակատեղի բանալիները. Եթե պատվիրել եք տրանսֆեր օդակայանից, ապա մեր աշխատակիցը կդիմավորի Ձեզ, կուղեկցի բնակատեղ և կհանձնի բանալիները"}
          </div>
        </div>
        <div>
          <button
            className="button"
            onClick={() =>
              navigate(
                kindtype === "apartment"
                  ? `/daily/apartment/${item?.id}`
                  : kindtype === "house"
                  ? `/daily/house/${item?.id}`
                  : kindtype === "commercial"
                  ? `/daily/commercial/${item?.id}`
                  : "/wish"
              )
            }
          >
            {t("view")}{" "}
          </button>
        </div>
      </div>
      <div className="wish-item-pay">
        <h3 style={{ color: "#f2b84d", marginBottom: 5 }}>{t("daily")}</h3>
        <p>
          {t("peopls-count")} - {count}
        </p>
        <p>
          {t("leg")} - {bad}
        </p>
        <p>
          {t("start")}-{" "}
          {start.slice(0, 10) + " " + start.slice(11, start.length)}
        </p>
        <p>
          {t("end")}- {end.slice(0, 10) + " " + end.slice(11, end.length)}
        </p>

        <div className="wish-item-therms">
          <CheckIcon sx={{ color: "#F2B84D" }} fontSize="large" />
          <p>{t("preOrderText")}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <img className="wish-visa" src={visa} alt="visa" />
          </div>
          <div>
            <img className="wish-mater" src={masterCard} alt="mastercard" />
          </div>
        </div>
        <div className="wish-item-therms" style={{ marginTop: 10 }}>
          <div
            onClick={() =>
              goToBuyHouse(item?.id, "visa", Math.floor(item?.price))
            }
          >
            <Button sx={{ textTransform: "none" }}>{t("go-to-order")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
