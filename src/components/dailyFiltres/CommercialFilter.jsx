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
import { getDailyComercial } from "../../store/actions/dailyAction";
import {
  getCities,
  getCity,
  getRegions,
} from "../../store/actions/locationActions";
import "./filters.css";

const Filter = ({
  isTablet,
  onClose,
  data,
  setData,
  checks,
  setChecks,
  axko,
  setAxko,
  setPage,
}) => {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    minmaxdetect(data, "min_room", "max_room");
    minmaxdetect(data, "min_floor", "max_floor");
    minmaxdetect(data, "min_leadarea", "max_leadarea");
    let truth = { bathroom: axko, ...data, ...checks };
    let istino = {};
    for (let key in truth) {
      if (truth[key] !== "" && truth[key] !== null) {
        istino[key] = truth[key];
      }
    }

    dispatch(
      getDailyComercial({
        ...istino,
        type: "For Rent",
        page: page_idx,
      })
    );
    setPage(page_idx);
    const queryString = new URLSearchParams(istino).toString();
    navigate(
      `/daily/commercial/` +
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
          <h4>{t("street_line")}</h4>
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
                      `${checks?.first_line}`.toLowerCase() ===
                      "First line".toLowerCase()
                    }
                    name="first_line"
                    onChange={(e) => handleChangeCheck(e, "First line")}
                  />
                }
                label={t("first_line")}
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
                      `${checks?.secondary_line}`.toLowerCase() ===
                      "Secondary line".toLowerCase()
                    }
                    name="secondary_line"
                    onChange={(e) => handleChangeCheck(e, "Secondary line")}
                  />
                }
                label={t("secondary_line")}
              />
            </FormGroup>
          </div>
        </div>
        <div className="filterItem">
          <h4>{t("enter")}</h4>
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
                      `${checks?.from_street}`.toLowerCase() ===
                      "from street".toLowerCase()
                    }
                    name="from_street"
                    onChange={(e) => handleChangeCheck(e, "from street")}
                  />
                }
                label={t("from_street")}
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
                      `${checks?.from_yard}`.toLowerCase() ===
                      "from yard".toLowerCase()
                    }
                    name="from_yard"
                    onChange={(e) => handleChangeCheck(e, "from yard")}
                  />
                }
                label={t("from_yard")}
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
                      `${checks?.common_street}`.toLowerCase() ===
                      "common street".toLowerCase()
                    }
                    name="common_street"
                    onChange={(e) => handleChangeCheck(e, "common street")}
                  />
                }
                label={t("common_street")}
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
                      `${checks?.common_yard}`.toLowerCase() ===
                      "common yard".toLowerCase()
                    }
                    name="common_yard"
                    onChange={(e) => handleChangeCheck(e, "common yard")}
                  />
                }
                label={t("common_yard")}
              />
            </FormGroup>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("makeres")}</h4>
          <div className="dubleSelect max-min-box">
            <div>
              <input
                className="input"
                placeholder={t("min")}
                value={data?.min_area}
                type="number"
                name="min_area"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                value={data?.max_area}
                type="number"
                name="max_area"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("remont")}</h4>
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
                      `${checks?.designer_style_renovated}`.toLowerCase() ===
                      "designer style renovated".toLowerCase()
                    }
                    name="designer_style_renovated"
                    onChange={(e) =>
                      handleChangeCheck(e, "designer style renovated")
                    }
                  />
                }
                label={t("designPair")}
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
                      `${checks?.generally_renovated}`.toLowerCase() ===
                      "generally renovated".toLowerCase()
                    }
                    name="generally_renovated"
                    onChange={(e) =>
                      handleChangeCheck(e, "generally renovated")
                    }
                  />
                }
                label={t("generally_renovated")}
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
                      `${checks?.cosmetic_renovated}`.toLowerCase() ===
                      "cosmetic renovated".toLowerCase()
                    }
                    name="cosmetic_renovated"
                    onChange={(e) => handleChangeCheck(e, "cosmetic renovated")}
                  />
                }
                label={t("cosmetic")}
              />
            </FormGroup>
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
                      `${checks?.parking}`.toLowerCase() ===
                      "parking".toLowerCase()
                    }
                    name="parking"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("parking")}
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
                      `${checks?.warm}`.toLowerCase() === "warm".toLowerCase()
                    }
                    name="warm"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("warm")}
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
                      `${checks?.cooling}`.toLowerCase() ===
                      "cooling".toLowerCase()
                    }
                    name="cooling"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("cooling")}
              />
            </FormGroup>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("ogtag_nshan")}</h4>
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
                      `${checks?.parking}`.toLowerCase() ===
                      "parking".toLowerCase()
                    }
                    name="parking"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("parking")}
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
                      `${checks?.warm}`.toLowerCase() === "warm".toLowerCase()
                    }
                    name="warm"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("warm")}
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
                      `${checks?.cooling}`.toLowerCase() ===
                      "cooling".toLowerCase()
                    }
                    name="cooling"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("cooling")}
              />
            </FormGroup>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("ogtag_nshan")}</h4>
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
                      `${checks?.universal_spase}`.toLowerCase() ===
                      "universal spase".toLowerCase()
                    }
                    name="universal_spase"
                    onChange={(e) => handleChangeCheck(e, "universal spase")}
                  />
                }
                label={t("universal_spase")}
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
                      `${checks?.office_space}`.toLowerCase() ===
                      "office spase".toLowerCase()
                    }
                    name="office_space"
                    onChange={(e) => handleChangeCheck(e, "office space")}
                  />
                }
                label={t("office_space")}
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
                      `${checks?.commercial_space}`.toLowerCase() ===
                      "commercial spase".toLowerCase()
                    }
                    name="commercial_space"
                    onChange={(e) => handleChangeCheck(e, "commercial space")}
                  />
                }
                label={t("commercial_space")}
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
            </FormGroup>
          </div>
        </div>

        <div className="filterItem">
          <button className="button" onClick={() => setFilters()}>
            {t("use")}
          </button>
        </div>
      </div>
    </>
  );
};
export default function CommercialFilter({
  type,
  setType,
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
              type={type}
              setType={setType}
              data={data}
              setPage={setPage}
              setData={setData}
              checks={checks}
              setChecks={setChecks}
              axko={axko}
              setAxko={setAxko}
            />
          </Drawer>
        </>
      ) : (
        <>
          <Filter
            type={type}
            setType={setType}
            data={data}
            setPage={setPage}
            setData={setData}
            checks={checks}
            setChecks={setChecks}
            axko={axko}
            setAxko={setAxko}
          />
        </>
      )}
    </div>
  );
}
