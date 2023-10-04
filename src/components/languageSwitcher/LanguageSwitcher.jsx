import { useEffect, useState } from "react";
import i18next from "i18next";
import cookies from "js-cookie";
import "./languageSwitcher.css";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLanguage,
  changeCurrency,
} from "../../store/actions/languageAction";
import { getSingleWithSearch } from "../../store/actions/saleApartmentAction";
import { useTranslation } from "react-i18next";
export function LanguageSwitcher() {
  const languages = [
    {
      id: 1,
      langEn: "am",
      lengRu: "арм",
      lengAm: "Հայ.",
      image: <span>🇦🇲&emsp;</span>,
    },
    {
      id: 2,
      langEn: "en",
      lengRu: "анг",
      lengAm: "Անգ.",
      image: <span>🇺🇸&emsp;</span>,
    },
    {
      id: 3,
      langEn: "ru",
      lengRu: "ру",
      lengAm: "Ռուս.",
      image: <span>🇷🇺&emsp;</span>,
    },
  ];
  const dispatch = useDispatch();
  const currentLang = cookies.get("i18next");
  const [activeLang, setActiveLang] = useState(currentLang);
  const [activeImage, setActiveImage] = useState("");

  const selectLange = (e) => {
    i18next.changeLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
    setActiveLang(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const flag = languages.filter((i) => i.langEn == activeLang)[0].image;
    setActiveImage(flag);
  }, [currentLang]);

  return (
    <div>
      {" "}
      <select
        id="cars"
        onChange={selectLange}
        defaultValue={localStorage.getItem("language") || "am"}
        className="select languageBox"
      >
        {languages.map((item) => {
          return (
            <option
              key={item.id}
              value={item.langEn}
              className={
                item.lang === activeLang ? "language active" : "language"
              }
            >
              {item.langEn}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function CurrencySwitcher() {
  const currencyes = [
    { id: 1, name: "amd" },
    { id: 2, name: "usd" },
    { id: 3, name: "rub" },
    { id: 4, name: "eur" },
  ];
  const dispatch = useDispatch();
  const [active, setActive] = useState("USD");

  const selectCurrency = (e) => {
    localStorage.setItem("currency", e.target.value);
    setActive(e.target.value);
    dispatch(changeCurrency(e.target.value));
  };

  return (
    <div>
      <select
        id="cars"
        onChange={selectCurrency}
        className="select languageBox"
        defaultValue={localStorage.getItem("currency") || "usd"}
      >
        {currencyes.map((item) => {
          return (
            <option
              key={item.id}
              name={item.name}
              value={item.name}
              className={item.lang === active ? "language active" : "language"}
            >
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function NavBarSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");
  const singleId = useSelector(
    (state) => state?.saleApartmentsReducer.singleId
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchWithCode = (e) => {
    e.preventDefault();
    dispatch(getSingleWithSearch({ search: value }, t("tunyCodovChka")));
    if (singleId) {
      navigate(`/sale/${singleId}`);
    }
    setValue("");
    handleClose();
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ minWidth: "30px" }}
      >
        <SearchIcon
          sx={{ color: "white" }}
          onClick={handleClick}
          fontSize="medium"
        />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <form
            onSubmit={searchWithCode}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              className="input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <button style={{ border: 0, backgroundColor: "inherit" }}>
              <SearchIcon sx={{ color: "#F2B84D" }} fontSize="small" />
            </button>
          </form>
        </MenuItem>
      </Menu>
    </div>
  );
}
