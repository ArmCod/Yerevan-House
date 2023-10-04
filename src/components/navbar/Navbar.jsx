import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FAST_SALE, GET_PARTNER_PAGE, HOME_PAGE } from "../../routing/urls";
import {
  CurrencySwitcher,
  LanguageSwitcher,
  NavBarSearch,
} from "../languageSwitcher/LanguageSwitcher";
import "./Navbar.css";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const wishcount = useSelector(
    (state) => state.saleApartmentsReducer.wishcount
  );
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wishData = JSON.parse(localStorage.getItem("wish")) || {
    buy: [],
    daily: [],
  };
  const [count, setCount] = useState(
    wishData?.buy?.length + wishData?.daily?.length
  );
  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    setActive(false);
  }, [location?.pathname]);
  useEffect(() => {
    const wishDataSecond = JSON.parse(localStorage.getItem("wish")) || {
      buy: [],
      daily: [],
    };
    setCount(wishDataSecond?.buy?.length + wishDataSecond?.daily?.length);
  }, [wishcount]);
  const menuPages = [
    { id: 1, path: HOME_PAGE, name: t("home") },
    { id: 2, path: "/sale/apartments/none&none/1", name: t("sale") },
    {
      id: 3,
      path: "/daily/apartments/none&none/1",
      name: t("daily"),
    },
    {
      id: 5,
      path: GET_PARTNER_PAGE,
      name: t("partner"),
    },
    {
      id: 6,
      path: FAST_SALE,
      name: t("urgent"),
    },
  ];
  return (
    <nav className="navbar-all">
      <section className="navbar">
        <h1 className="navbar-logo">
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
        </h1>
        <div className="menu-icon">
          {active ? (
            <CloseIcon
              sx={{ color: "white" }}
              onClick={handleClick}
              fontSize="large"
            />
          ) : (
            <MenuIcon
              sx={{ color: "white" }}
              onClick={handleClick}
              fontSize="large"
            />
          )}
        </div>
        <ul
          className={
            active ? "nav-menu active menuhidden" : "nav-menu menuhidden"
          }
        >
          {menuPages.map((item, index) => {
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={
                    location.pathname.slice(0, 7) === item.path.slice(0, 7)
                      ? "nav-links-active"
                      : "nav-links"
                  }
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className={active ? "nav-menu active" : "nav-menu"}>
          {menuPages.map((item, index) => {
            return (
              <li key={item.id} className="menuvisible">
                <Link
                  to={item.path}
                  className={
                    location.pathname.slice(0, 7) === item.path.slice(0, 7)
                      ? "nav-links-active"
                      : "nav-links"
                  }
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li
            onClick={() => {
              navigate("/wish");
            }}
            id="target-element"
            className="star-box"
          >
            <ShoppingBasketIcon
              sx={{ color: "white", fontSize: "35px", cursor: "pointer" }}
            />
            {count !== "NaN" && count !== 0 && (
              <span className="star-count">{count}</span>
            )}
          </li>
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <CurrencySwitcher />
          </li>
          <li>
            <NavBarSearch />
          </li>
        </ul>
      </section>
    </nav>
  );
}
