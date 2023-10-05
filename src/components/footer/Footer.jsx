import React, { useEffect } from "react";
import "./footer.css";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useNavigate } from "react-router-dom";
import {
  CurrencySwitcher,
  LanguageSwitcher,
  NavBarSearch,
} from "../languageSwitcher/LanguageSwitcher";
import {
  DAILY_APARTMENT_PAGE,
  SALE_COMERCIAL_PAGE,
  SALE_HOUSES_PAGE,
  SALE_LANDS_PAGE,
  SALE_PAGE,
} from "../../routing/urls";
import { useDispatch, useSelector } from "react-redux";
import { getFooter } from "../../store/actions/homePageAction";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state?.homePageReducer.footer);
  const language = useSelector((state) => state?.languageReducer.lang);
  const year = new Date().getFullYear();
  useEffect(() => {
    dispatch(getFooter());
  }, []);
  return (
    <footer>
      <div className="top">
        <div className="pages">

          <ul>
            <h3>{t("goodLinks")}</h3>
            <li>
              <Link to="/">{t("home")}</Link>
            </li>
            <li>
              <Link to={'/sale/apartments/none&none/1'}>{t("sale")}</Link>
            </li>
            <li>
              <Link to={'/daily/apartments/none&none/1'}>{t("daily")}</Link>
            </li>
                     </ul>

          <ul>
            <h3>{t("callUs")}</h3>
            <li>
              <LocalPhoneIcon
                fontSize="small"
                sx={{
                  color: "black",
                }}
              />
              <Link to="#">
                {t("saleDepatment")} {data?.vatarqi_bazhin}
              </Link>
            </li>
            <li>
              <LocalPhoneIcon
                fontSize="small"
                sx={{
                  color: "black",
                }}
              />
              <Link to="#">
                {t("rentDepatment")} {data?.vardzakalutyan_bazhin}
              </Link>
            </li>
            <li>
              <MailOutlineIcon
                fontSize="small"
                sx={{
                  color: "black",
                }}
              />{" "}
              <Link to="#">
                {t("sale_email")}: {data?.sale_email}
              </Link>
            </li>
            <li>
              <MailOutlineIcon
                fontSize="small"
                sx={{
                  color: "black",
                }}
              />{" "}
              <Link to="#">
                {t("rent_email")}: {data?.rent_email}
              </Link>
            </li>
            <li>
              <DesktopWindowsIcon
                fontSize="small"
                sx={{
                  color: "black",
                }}
              />{" "}
              <Link to="#">
                {t("adres")}{" "}
                {language == "en"
                  ? data?.address_en
                  : language == "ru"
                    ? data?.address_ru
                    : data?.address_am}
              </Link>
            </li>
          </ul>
          <ul>
            <h3>{t("findUs")}</h3>
            <li style={{ marginLeft: 25 }}>
              <a href={data?.facebook} target="_blank">
                <FacebookIcon
                  fontSize="large"
                  sx={{
                    color: "black",
                  }}
                />
              </a>
              <a href={data?.instagram} target="_blank">
                <InstagramIcon
                  fontSize="large"
                  sx={{
                    color: "black",
                  }}
                />
              </a>
            </li>

          </ul>
        </div>
      </div>
      <div className="info-footer">
        <div className="armcoding">By ArmCoding - &copy; {year} Բոլոր իրավունքները պաշտպանված են </div>
      </div>
    </footer>
  );
}
