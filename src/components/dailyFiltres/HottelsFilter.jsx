import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button, Drawer, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useIsTablet } from "../../helpers/useScreenType";
import { getCities, getRegions } from "../../store/actions/locationActions";
import "./filters.css";

const Filter = ({ isTablet, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [region, setRegion] = useState();
  const [minRoomes, setMinRoomes] = useState();
  const [maxRoomes, setMaxRoomes] = useState();
  const [star, setStar] = useState(3);
  const [startValue, setStartValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [endValue, setEndValue] = useState(dayjs("2014-08-18T21:11:54"));
  const handleChangeStart = (newValue) => {
    setStartValue(newValue);
  };
  const handleChangeEnd = (newValue) => {
    setEndValue(newValue);
  };
  const regions = useSelector((state) => state?.locationReducer.regions);
  const language = useSelector((state) => state?.languageReducer.lang);
  useEffect(() => {
    dispatch(getCities());
    dispatch(getRegions());
  }, [dispatch]);

  return (
    <>
      {isTablet && (
        <div className="close-drawer">
          <CloseIcon className="primary" fontSize="large" onClick={onClose} />
        </div>
      )}
      <div className={isTablet ? "filterBoxDrawer" : "filterBox"}>
        <div className="filterItem">
          <h4>{t("region")}</h4>
          <div>
            <select
              name="cars"
              className="select"
              onChange={(e) => setRegion(e.target.value)}
            >
              {regions?.map(({ id, title_am, title_ru, title_en }) => {
                return (
                  <option key={id} value={title_en}>
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
        </div>

        <div className="filterItem">
          <h4>{t("start")}</h4>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={startValue}
                onChange={handleChangeStart}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("end")}</h4>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={endValue}
                onChange={handleChangeEnd}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("room")}</h4>
          <div className="dubleSelect max-min-box">
            <div>
              <input
                className="input"
                placeholder={t("min")}
                type="number"
                value={minRoomes}
                onChange={(e) => setMinRoomes(e.target.value)}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={maxRoomes}
                onChange={(e) => setMaxRoomes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("stars")}</h4>
          <div onClick={() => setStar(1)} className="stars">
            {star == 1 ? (
              <StarIcon className="primary" />
            ) : (
              <StarBorderIcon className="primary" />
            )}
          </div>
          <div onClick={() => setStar(2)} className="stars">
            {star == 2 ? (
              <>
                <StarIcon className="primary" />
                <StarIcon className="primary" />
              </>
            ) : (
              <>
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
              </>
            )}
          </div>
          <div onClick={() => setStar(3)} className="stars">
            {star == 3 ? (
              <>
                <StarIcon className="primary" />
                <StarIcon className="primary" />
                <StarIcon className="primary" />
              </>
            ) : (
              <>
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
              </>
            )}
          </div>
          <div onClick={() => setStar(4)} className="stars">
            {star == 4 ? (
              <>
                <StarIcon className="primary" />
                <StarIcon className="primary" />
                <StarIcon className="primary" />
                <StarIcon className="primary" />
              </>
            ) : (
              <>
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
              </>
            )}
          </div>
          <div onClick={() => setStar(5)} className="stars">
            {star == 5 ? (
              <>
                <StarIcon className="primary" />
                <StarIcon className="primary" />
                <StarIcon className="primary" />
                <StarIcon className="primary" />
                <StarIcon className="primary" />
              </>
            ) : (
              <>
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
                <StarBorderIcon className="primary" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function HotelsFilter() {
  const isTablet = useIsTablet();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      {isTablet ? (
        <>
          <Button onClick={toggleDrawer("left", true)}>
            <FilterAltIcon className="primary" fontSize="large" />
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Filter isTablet={isTablet} onClose={toggleDrawer("left", false)} />
          </Drawer>
        </>
      ) : (
        <>
          <Filter />
        </>
      )}
    </div>
  );
}
