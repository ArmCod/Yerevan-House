import React, { useLayoutEffect } from "react";
import "./forming.css";
import { Formik } from "formik";

import TermsModal from "../../components/termsModal/TermsModal";
import Input from "../../components/input/Input";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { phoneRegExp } from "../../helpers/validations";
import { useDispatch, useSelector } from "react-redux";
import { getWishData } from "../../helpers/wish";
import {
  getWishActionDaily,
  wishCleanUp,
} from "../../store/actions/saleApartmentAction";
import { forming, getWishText } from "../../store/actions/mapAction";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export function getDayDifference(startDate, endDate) {
  var start = new Date(startDate.toUTCString());
  var end = new Date(endDate.toUTCString());
  var difference = end - start;
  var daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

export default function Forming() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const houseData = JSON.parse(localStorage.getItem("basket-house"));
  const currency = useSelector((state) => state.botReducer.currencys);
  const dailyWish = useSelector((state) => state.saleLandsReducer.dailyWish);
  const data = getWishData();

  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState("all");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  useLayoutEffect(() => {
    dispatch(getWishActionDaily(data.daily));
    dispatch(getWishText());
    return () => {
      dispatch(wishCleanUp());
    };
  }, [dispatch]);

  const formingValidateSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t("layn"))
      .max(15, t("layn"))
      .required(t("requred")),
    lastName: Yup.string()
      .min(5, t("layn"))
      .max(20, t("aveli"))
      .required(t("requred")),
    email: Yup.string().email(t("invalid")).required(t("req")),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, t("num"))
      .min(5, t("layn"))
      .max(20, t("aveli")),
    secondPhoneNumber: Yup.string()
      .matches(phoneRegExp, t("requred"))
      .min(5, t("layn"))
      .max(20, t("aveli")),
    secondEmail: Yup.string().email(t("invalid")).required(t("req")),
  });
  const startDate = new Date(data?.daily[0]?.start.slice(0, 10));
  const endDate = new Date(data?.daily[0]?.end.slice(0, 10));
  const difference =
    getDayDifference(startDate, endDate) === 0
      ? 1
      : getDayDifference(startDate, endDate);
  const endTime = data?.daily[0]?.end.slice(11, 16);
  let showHalf;
  switch (true) {
    case endTime == "13:00":
      showHalf = true;
      break;
    case endTime == "14:00":
      showHalf = true;
      break;
    case endTime == "15:00":
      showHalf = true;
      break;
    case endTime == "16:00":
      showHalf = true;
      break;
    default:
      showHalf = false;
  }
  let price = showHalf
    ? difference * Number(Math.floor(houseData?.price * currency?.AMD)) +
      Number(data?.daily[0]?.bad) * 2000 -
      Math.floor(Number(Math.floor(houseData?.price * currency?.AMD)) / 2)
    : difference * Number(Math.floor(houseData?.price * currency?.AMD)) +
      Number(data?.daily[0]?.bad) * 2000;

  return (
    <div className="formin-box">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          secondPhoneNumber: "",
          secondEmail: "",
        }}
        validationSchema={formingValidateSchema}
        onSubmit={(values) => {
          let kindType = null;

          if (data?.daily[0]?.kindtype == "apartment") {
            kindType = "Flat";
          } else if (data?.daily[0]?.kindtype == "house") {
            kindType = "House";
          } else if (data?.daily[0]?.kindtype == "land") {
            kindType = "Land_area";
          } else if (data?.daily[0]?.kindtype == "commercial") {
            kindType = "Commercial";
          }

          dispatch(
            forming({
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              payeremail: values.email,
              phone: values.phoneNumber,
              second_phone: values.secondPhoneNumber,
              pro_id: dailyWish[0][0]?.id,
              type: kindType,
              start: data?.daily[0]?.start,
              end: data?.daily[0]?.end,
              price:
                value == "all" ? String(price) + "00" : String(value) + "00",
              bed: data?.daily[0]?.bad,
              people: data?.daily[0]?.count,
            })
          );
        }}
      >
        {({ errors, handleSubmit }) => (
          <div className="formin-content">
            <form onSubmit={handleSubmit}>
              <div
                className="titleBox"
                style={{
                  justifyContent: "center",
                }}
              >
                <div className="title">
                  <h1>{t("payment")}</h1>
                </div>
              </div>

              <div className="forming-inputs-box">
                <div className="forming-input">
                  <p>{t("name")}</p>
                  <Input name={"firstName"} type={"text"} />
                </div>
                <div className="forming-input">
                  <p>{t("secondName")}</p>
                  <Input name={"lastName"} type={"text"} />
                </div>
                <div className="forming-input">
                  <p>{t("email")}</p>
                  <Input name={"email"} type={"email"} />
                </div>
                <div className="forming-input">
                  <p>{t("phone")}</p>
                  <Input name={"phoneNumber"} type={"text"} />
                </div>
                <div className="forming-input">
                  <p>{t("other")}</p>
                  <Input name={"secondPhoneNumber"} type={"text"} />
                </div>
                <div className="forming-input">
                  <p>{t("vcharox")}</p>
                  <Input name={"secondEmail"} type={"email"} />
                </div>
              </div>

              <div className="promo-price">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value={"all"}
                        control={<Radio />}
                        label={`${t("yndhanur")} ${price} Դ`}
                      />
                      <FormControlLabel
                        value={houseData?.advance}
                        control={<Radio />}
                        label={`${t("preSalery")} ${
                          Math.floor(houseData?.advance * currency?.AMD) *
                          difference
                        } Դ`}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="pay-box">
                <span className="button" onClick={handleOpen}>
                  {t("payman")}
                </span>

                <TermsModal open={open} setOpen={setOpen} setShow={setShow} />
                {Object.keys(errors).length === 0 && show && (
                  <button type="submit" className="button">
                    {t("continue")}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
