import React, { useEffect, useState } from "react";
import "./HomeSearch.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCity,
  getRegions,
} from "../../store/actions/locationActions";
import { searchHomePage } from "../../store/actions/saleApartmentAction";
import { Link, useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import {
  DAILY_APARTMENT_PAGE,
  DAILY_COMMERCIAL_PAGE,
  DAILY_HOUSES_PAGE,
  SALE_COMERCIAL_PAGE,
  SALE_HOUSES_PAGE,
  SALE_LANDS_PAGE,
} from "../../routing/urls";

export default function HomeSearch() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cities = useSelector((state) => state?.locationReducer.cities);
  const regions = useSelector((state) => state?.locationReducer.regions);

  const language = useSelector((state) => state?.languageReducer.lang);
  const [data, setData] = useState({});
  const singleId = useSelector(
    (state) => state?.saleApartmentsReducer.singleId
  );
  const [housetype, setHousetype] = useState("apartments");
  // const [saleType, setType] = useState("Sale");
  const [region, setRegion] = useState("none");
  const [city, setCity] = useState("none");
  const [type, setType] = useState("Sale");
  useEffect(() => {
    dispatch(getCities());
    dispatch(getRegions());
  }, []);
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  const searchProduct = () => {
    if (type == "Sale") {
      if (housetype == "Flat") {
        navigate(`/sale/apartments`);
      } else if (housetype == "House") {
        navigate(SALE_HOUSES_PAGE);
      } else if (housetype == "Land_area") {
        navigate(SALE_LANDS_PAGE);
      } else if (housetype == "Commercial") {
        navigate(SALE_COMERCIAL_PAGE);
      }
    } else if (type == "For Rent") {
      if (housetype == "Flat") {
        navigate(DAILY_APARTMENT_PAGE);
      } else if (housetype == "House") {
        navigate(DAILY_HOUSES_PAGE);
      } else if (housetype == "Commercial") {
        navigate(DAILY_COMMERCIAL_PAGE);
      }
    }
  };
  return (
    <div className="homeSearch">
      <div className="both">
        <div>
          <select
            className="selectsearch"
            onChange={(e) => setHousetype(e.target.value)}
          >
            {type === "Sale" ? (
              <>
                <option value="apartments">{t("apatments")}</option>
                <option value="houses">{t("houses")}</option>
                <option value="lands">{t("lands")}</option>
                <option value="commercial">{t("comercial")}</option>
              </>
            ) : (
              <>
                <option value="apartments">{t("apatments")}</option>
                <option value="houses">{t("houses")}</option>
                <option value="commercial">{t("comercial")}</option>
              </>
            )}
          </select>
        </div>
        <div>
          <select
            className="selectsearch"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Sale">{t("sale")}</option>
            <option value="For Rent">{t("rent")}</option>
          </select>
        </div>
      </div>
      <div className="both">
        <div>
          <div>
            <select
              name="region"
              className="selectsearch"
              onChange={(e) => {
                if (e.target.value !== "none") {
                  let a = regions?.find(
                    (res) => res.title_en === e.target.value
                  )?.id;

                  dispatch(getCity(a));
                } else {
                  dispatch(getCities());
                }

                setRegion(e.target.value);
              }}
            >
              <option value={"none"}>{t("regions")}</option>
              {regions?.map(({ id, title_am, title_ru, title_en }) => {
                if (id !== 12) {
                  return (
                    <option key={id} value={title_en}>
                      {language == "en"
                        ? title_en
                        : language == "ru"
                        ? title_ru
                        : title_am}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>

        <div>
          {/* <h4>{t("region")}</h4> */}

          <div>
            <select
              name="city"
              className="selectsearch"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value={"none"}>{t("cities")}</option>
              {cities?.map(
                ({
                  id,
                  localization_kay_am,
                  localization_kay_ru,
                  localisation_kay,
                }) => {
                  if (id !== 15) {
                    return (
                      <option key={id} value={localisation_kay}>
                        {language == "en"
                          ? localisation_kay
                          : language == "ru"
                          ? localization_kay_ru
                          : localization_kay_am}
                      </option>
                    );
                  }
                }
              )}
            </select>
          </div>
        </div>
      </div>
      <div>
        <Link
          to={`/${
            type === "Sale" ? "sale" : "daily"
          }/${housetype}/region=${region}&city=${city}/1`}
        >
          <button className="button">{t("search")}</button>
        </Link>
      </div>
    </div>
  );
}
