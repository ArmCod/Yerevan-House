import { useEffect, useState } from "react";
import "./partner.css";
import { useFormik } from "formik";
import Divaider from "../../components/divaider/Divaider";
import { useIsTablet } from "../../helpers/useScreenType";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getRegions } from "../../store/actions/locationActions";
import "react-phone-number-input/style.css";
import { getCountries } from "react-phone-number-input";

import * as Yup from "yup";
import { useTranslation } from "react-i18next";
export default function Partner() {
  const isTablet = useIsTablet();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countries = getCountries();
  const cities = useSelector((state) => state?.locationReducer.cities);
  const regions = useSelector((state) => state?.locationReducer.regions);
  const language = useSelector((state) => state?.languageReducer.lang);
  useEffect(() => {
    dispatch(getCities());
    dispatch(getRegions());
  }, [dispatch]);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    type: Yup.string().required("Required"),
    saleType: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
    currencyType: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    hoodType: Yup.string().required("Required"),
    streat: Yup.string().required("Required"),
    houseNumber: Yup.string().required("Required"),
    appartementNumber: Yup.string(),
    phoneNumber: Yup.string().required("Required"),
    countryCode: Yup.string().required("Country code is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    type: "",
    saleType: "Sale",
    price: "",
    currencyType: "",
    city: "",
    hoodType: "",
    streat: "",
    houseNumber: "",
    appartementNumber: "",
    phoneNumber: "",
    countryCode: countries[7],
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (Object.keys(formik.errors).length === 0) {
      }
    },
  });

  return (
    <div className="partner">
      <div className="titleBox">
        {!isTablet && <Divaider width="30" />}
        <div className="title">
          <h1>{t("getPartner")}</h1>
        </div>
        {!isTablet && <Divaider width="30" />}
      </div>
      <div className="partner-forming">
        <form onSubmit={formik.handleSubmit}>
          <div className="partner-form-inputes-box">
            <div className="partner-form-inpute">
              <p>{t("name")}</p>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="input"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{t("requred")}</div>
              ) : null}
            </div>
            <div className="partner-form-inpute">
              <p>{t("secondName")}</p>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="input"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{t("requred")}</div>
              ) : null}
            </div>
            <div className="partner-form-inpute">
              <p>{t("email")}</p>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="input"
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{t("requred")}</div>
              ) : null}
            </div>
            <div className="partner-form-inpute">
              <p>{t("category")}</p>
              <select
                name="type"
                className="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {formik.values.saleType === "Sale" ? (
                  <>
                    <option value="Flat">{t("apatments")}</option>
                    <option value="House">{t("houses")}</option>
                    <option value="Land_area">{t("lands")}</option>
                    <option value="Commercial">{t("comercial")}</option>
                  </>
                ) : (
                  <>
                    <option value="Flat">{t("apatments")}</option>
                    <option value="House">{t("houses")}</option>
                    <option value="Commercial">{t("comercial")}</option>
                  </>
                )}
              </select>
            </div>
            <div className="partner-form-inpute">
              <p>{t("realtype")}</p>
              <select
                name="saleType"
                className="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="Sale">{t("sale")}</option>
                <option value="For Rent">{t("rent")}</option>
                <option value="Short Term">{t("short")}</option>
              </select>
            </div>
            <div className="partner-form-inpute">
              <p>{t("price")}</p>
              <input
                id="price"
                name="price"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="input"
              />
            </div>
            <div className="partner-form-inpute">
              <p>{t("currency")}</p>
              <select
                name="currencyType"
                className="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="amd">AMD</option>
                <option value="rub">RUB</option>
                <option value="usd">USD</option>
              </select>
            </div>
            <div className="partner-form-inpute">
              <p>{t("city")}</p>
              <select
                name="city"
                className="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {cities?.map(
                  ({
                    id,
                    localization_kay_am,
                    localization_kay_ru,
                    localisation_kay,
                  }) => {
                    return (
                      <option key={id} value={localization_kay_am}>
                        {language == "en"
                          ? localisation_kay
                          : language == "ru"
                          ? localization_kay_ru
                          : localization_kay_am}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
            <div className="partner-form-inpute">
              <p>{t("hood")}</p>
              <select
                name="hoodType"
                className="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {regions?.map(({ id, title_am, title_ru, title_en }) => {
                  return (
                    <option key={id} value={id}>
                      {language == "en"
                        ? title_en
                        : language == "ru"
                        ? title_ru
                        : title_am}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="partner-form-inpute">
              <p>{t("street")}</p>
              <input
                id="streat"
                name="streat"
                type="streat"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streat}
                className="input"
              />
            </div>
            <div className="partner-form-inpute-app-house">
              <div>
                <p>{t("build")}</p>
                <input
                  id="houseNumber"
                  name="houseNumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseNumber}
                  className="input"
                />
              </div>
              <div>
                <p>{t("tun")}</p>
                <input
                  id="appartementNumber"
                  name="appartementNumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.appartementNumber}
                  className="input"
                />
              </div>
            </div>
          </div>
          <div className="submit-partner-box">
            <button className="button" type="submit">
              {t("send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
