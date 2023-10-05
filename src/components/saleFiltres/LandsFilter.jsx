import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useIsTablet } from "../../helpers/useScreenType";
import {
  getCities,
  getCity,
  getRegions,
} from "../../store/actions/locationActions";
import { getSaleLandsPaginatio } from "../../store/actions/saleApartmentAction";
import "./filters.css";

const Filter = ({
  isTablet,
  onClose,
  data,
  setData,
  checks,
  setChecks,
  setPage,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { both, page_idx } = useParams();

  const cities = useSelector((state) => state?.locationReducer.cities);
  const regions = useSelector((state) => state?.locationReducer.regions);
  const language = useSelector((state) => state?.languageReducer.lang);

  useEffect(() => {
    dispatch(getRegions());
    dispatch(getCity());
    dispatch(getCities());
  }, [both, dispatch]);

  useLayoutEffect(() => {
    const params = new URLSearchParams(both);
    const obj = {};
    const obj2 = {};
    for (const [key, value] of params.entries()) {
      obj[`${key}`] = value;
      if (Object.keys(checks).includes(key)) {
        obj2[key] = value;
      }
    }
    setChecks({ ...obj2 });
    setData({ ...obj });
  }, [both]);

  const handleChangeCheck = useCallback(
    (e, name) => {
      if (!!e.target.checked) {
        if (!name) {
          checks[e.target.name] = e.target.name;
          setChecks({ ...checks });
        } else {
          checks[e.target.name] = name;
          setChecks({ ...checks });
        }
      } else {
        checks[e.target.name] = null;
        setChecks({ ...checks });
      }
    },
    [checks]
  );

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const minmaxdetect = (main, first, second) => {
    if (main[first] !== "" && main[second] === "") {
      main[second] = "10000000000";
    } else if (main[first] === "" && main[second] !== "") {
      main[first] = "0";
    }
  };

  const setFilters = () => {
    minmaxdetect(data, "min_price", "max_price");
    minmaxdetect(data, "min_area", "max_area");
    let truth = {
      ...checks,
      ...data,
    };
    let istino = {};
    for (let key in truth) {
      if (truth[key] !== "" && truth[key] !== null) {
        istino[key] = truth[key];
      }
    }
    dispatch(
      getSaleLandsPaginatio({
        ...istino,
        page: page_idx,
      })
    );
    setPage(page_idx);
    const queryString = new URLSearchParams(istino).toString();
    navigate(
      `/sale/lands/` +
        new URLSearchParams(queryString).toString() +
        "/" +
        page_idx
    );
  };
  return (
    <>
      {isTablet && (
        <div className="close-drawer">
          <CloseIcon
            sx={{ color: "#4e8cb8" }}
            fontSize="large"
            onClick={onClose}
          />
        </div>
      )}
      <div className={isTablet ? "filterBoxDrawer" : "filterBox"}>
        <div className="filterItem">
          <h4>{t("region")}</h4>
          <div>
            <select
              name="region"
              className="select"
              value={data?.region}
              onChange={(e) => {
                if (e.target.value !== "none") {
                  let a = regions?.find(
                    (res) => res.title_en === e.target.value
                  )?.id;

                  dispatch(getCity(a));
                } else {
                  dispatch(getCities());
                }

                handleChange(e);
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

        <div className="filterItem">
          {/* <h4>{t("region")}</h4> */}

          <div>
            <select
              name="city"
              className="select"
              value={data?.city}
              onChange={handleChange}
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

        <div className="filterItem">
          <h4>{t("price")}</h4>
          <div className="dubleSelect max-min-box">
            <div>
              <input
                className="input"
                placeholder={t("min")}
                type="number"
                value={data?.min_price}
                name="min_price"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={data?.max_price}
                name="max_price"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("makeres")}</h4>
          <div className="dubleSelect max-min-box">
            <div>
              <input
                className="input"
                placeholder={t("min")}
                type="number"
                value={data?.min_area}
                name="min_area"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={data?.max_area}
                name="max_area"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="filterItem">
          <h4>{t("hatkutyun")}</h4>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    checked={
                      `${checks?.agricultural}`.toLowerCase() ===
                      "agricultural".toLowerCase()
                    }
                    name="agricultural"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("agricultural")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    name="for_residential_development"
                    checked={
                      `${checks?.for_residential_development}`.toLowerCase() ===
                      "for residential development".toLowerCase()
                    }
                    onChange={(e) =>
                      handleChangeCheck(e, "for residential development")
                    }
                  />
                }
                label={t("for_residential_development")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    checked={
                      `${checks?.for_industrial_use}`.toLowerCase() ===
                      "for industrial use".toLowerCase()
                    }
                    name="for_industrial_use"
                    onChange={(e) => handleChangeCheck(e, "for industrial use")}
                  />
                }
                label={t("for_industrial_use")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    checked={
                      `${checks?.manufacturing_area}`.toLowerCase() ===
                      "manufacturing area".toLowerCase()
                    }
                    name="manufacturing_area"
                    onChange={(e) => handleChangeCheck(e, "manufacturing area")}
                  />
                }
                label={t("manufacturing_area")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    checked={
                      `${checks?.for_public_buildings}`.toLowerCase() ===
                      "for public buildings".toLowerCase()
                    }
                    name="for_public_buildings"
                    onChange={(e) =>
                      handleChangeCheck(e, "for public buildings")
                    }
                  />
                }
                label={t("for_public_buildings")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    checked={
                      `${checks?.universal_spase}`.toLowerCase() ===
                      "universal spase".toLowerCase()
                    }
                    name="universal_spase"
                    onChange={(e) => handleChangeCheck(e, "universal spase")}
                  />
                }
                label={t("for_general_purpose")}
              />
            </FormGroup>
          </div>
        </div>
        {/* <div className="filterItem">
          <h4>Շինություն</h4>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    onChange={(e) => changeBuildingType(1)}
                  />
                }
                label="Առկա է"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#4e8cb8",
                      "&.Mui-checked": {
                        color: "#4e8cb8",
                      },
                    }}
                    onChange={(e) => changeBuildingType(2)}
                  />
                }
                label="Առկա չէ"
              />
            </FormGroup>
          </div>
        </div> */}
        <div className="filterItem">
          <button className="button" onClick={() => setFilters()}>
            {t("use")}
          </button>
        </div>
      </div>
    </>
  );
};
export default function LandsFilter({
  data,
  setData,
  checks,
  setChecks,
  axko,
  setAxko,
  setPage,
}) {
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
            <FilterAltIcon sx={{ color: "#4e8cb8" }} fontSize="large" />
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Filter
              isTablet={isTablet}
              onClose={toggleDrawer("left", false)}
              setPage={setPage}
              data={data}
              setData={setData}
              checks={checks}
              setChecks={setChecks}
              axko={axko}
              setAxko={setAxko}
            />
          </Drawer>
        </>
      ) : (
        <Filter
          data={data}
          setPage={setPage}
          setData={setData}
          checks={checks}
          setChecks={setChecks}
          axko={axko}
          setAxko={setAxko}
        />
      )}
    </div>
  );
}
