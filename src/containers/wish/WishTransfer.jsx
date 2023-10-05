import React, { useState } from "react";
import "./wish.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import visa from "../../assets/images/visa.png";
import masterCard from "../../assets/images/mastercard.png";
import idram from "../../assets/images/idram.png";
import { useNavigate } from "react-router-dom";
import { FORMING_PAGE } from "../../routing/urls";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LuggageIcon from "@mui/icons-material/Luggage";
import { useTranslation } from "react-i18next";

export const WishTransfer = ({ item, removeTransferCar }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const wishCar = JSON.parse(localStorage.getItem("car"));
  const goToBuyCar = (id, variant, price) => {
    localStorage.setItem(
      "basket-car",
      JSON.stringify({
        id,
        variant,
        item: "car",
        price,
      })
    );
    navigate(FORMING_PAGE);
  };

  return (
    <div className="wish-car-box" key={item.id}>
      <div className="wish-close">
        <CloseIcon
          sx={{ color: "black" }}
          fontSize="medium"
          onClick={() => removeTransferCar(item.id)}
        />
      </div>
      <div className="wish-item-car">
        <div className="wish-item-car-img-box">
          <img src={item.image} />
        </div>
        <div>
          {item?.desc ? (
            item?.desc.slice(0, 100) + " " + "..."
          ) : (
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.Lorem Ipsum is
            </p>
          )}
        </div>
      </div>
      <div className="wish-item-desc">
        <div className="wish-item-desc-title-box">
          <h3>{t("preorder")}</h3>
        </div>
        <div className="wish-item-info-box">
          <div className="car-div">
            <PeopleAltIcon sx={{ color: "white" }} fontSize="large" />
            <CloseIcon sx={{ color: "white" }} fontSize="small" />
            <h1 style={{ color: "white" }}>{item?.count}</h1>
          </div>
          <div className="car-div">
            <LuggageIcon sx={{ color: "white" }} fontSize="large" />
            <CloseIcon sx={{ color: "white" }} fontSize="small" />
            <h1 style={{ color: "white" }}>{item?.bag}</h1>
          </div>
        </div>
        <div>
          <div
            className="order-car-detail"
            style={{ padding: "0", color: "white" }}
          >
            <div>
              <h3>Տրանսպորտ՝</h3>
              <p>{item?.category}</p>
            </div>
            <div>
              <h3>Մեկնարկի վայր՝ </h3>
              <p>{wishCar?.startLocation}</p>
            </div>
            <div>
              <h3>Տրանսպորտ՝</h3>
              <p>{wishCar?.endLocation}</p>
            </div>
          </div>
        </div>
        <div>
          <p style={{ color: "#f2b84d" }}>
            Չեղարկում. Ամրագրումը չեղարկելու դեպքում՝ 1000 AMD հետ չի
            վերադարձվում:
          </p>
        </div>
      </div>
      <div className="wish-item-pay">
        <h3 style={{ color: "#f2b84d" }}>{t("transfers")}</h3>
        <div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    sx={{
                      color: "#F2B84D",
                      "&.Mui-checked": {
                        color: "#F2B84D",
                      },
                    }}
                  />
                }
                label={`Վճարել ընդհանուր գինը ${item?.price} AMD `}
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio
                    sx={{
                      color: "#F2B84D",
                      "&.Mui-checked": {
                        color: "#F2B84D",
                      },
                    }}
                  />
                }
                label="Վճարել միայն կանխավճարը
                          1000 AMD
                          "
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <button className="button">{t("go-to-order")}</button>
        </div>
        <div className="wish-item-therms">
          <CheckIcon sx={{ color: "#F2B84D" }} fontSize="large" />
          <p>Վճարեք և անմիջապես կստանաք հաստատում Ձեր էլ. հասցեին</p>
        </div>
        <div>
          <p>Վճարման ձևեր՝</p>
        </div>
        <div
          className="wish-item-therms"
          onClick={() => goToBuyCar(item?.id, "visa", item?.price)}
        >
          <div>
            <img className="wish-visa" src={visa} alt="visa" />
          </div>
          <div onClick={() => goToBuyCar(item?.id, "mastercard", item?.price)}>
            <img className="wish-mater" src={masterCard} alt="mastercard" />
          </div>
          {/* <div>
            <img
              className="wish-idram"
              src={idram}
              alt="idram"
              onClick={() => goToBuyCar(item?.id, "idram", item?.price)}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
