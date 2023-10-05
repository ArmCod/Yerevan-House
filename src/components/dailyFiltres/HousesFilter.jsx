import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useIsTablet } from "../../helpers/useScreenType";
import { getDailyHouses } from "../../store/actions/dailyAction";
import {
  getCities,
  getCity,
  getRegions,
} from "../../store/actions/locationActions";
import DailyFilterTabs from "./DaylyFilterTabs";
import "./filters.css";

const Filter = ({
  isTablet,
  onCLose,
  dayly,
  data,
  setData,
  checks,
  setChecks,
  axko,
  setAxko,
  setPage,
}) => {
  const { both, page_idx } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cities = useSelector((state) => state?.locationReducer.cities);
  const regions = useSelector((state) => state?.locationReducer.regions);
  const language = useSelector((state) => state?.languageReducer.lang);

  useEffect(() => {
    dispatch(getRegions());
    dispatch(getCity());
    dispatch(getCities());
  }, [dispatch]);

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
      getDailyHouses({
        ...istino,
        page: page_idx,
      })
    );
    setPage(page_idx);
    const queryString = new URLSearchParams(istino).toString();
    navigate(
      `/daily/houses/` +
        new URLSearchParams(queryString).toString() +
        "/" +
        page_idx
    );
  };

  return (
    <>
      {dayly === "For Rent" ? (
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
                      name="generally_renovated"
                      checked={
                        `${checks?.generally_renovated}`.toLowerCase() ===
                        "generally renovated".toLowerCase()
                      }
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
                      onChange={(e) =>
                        handleChangeCheck(e, "cosmetic renovated")
                      }
                    />
                  }
                  label={t("cosmetic")}
                />
              </FormGroup>
            </div>
          </div>
          <div className="filterItem">
            <h4>{t("buildingType")}</h4>
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
                        `${checks?.lets_draw}`.toLowerCase() ===
                        "lets_draw".toLowerCase()
                      }
                      name="lets_draw"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("stone")}
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
                        `${checks?.monolith}`.toLowerCase() ===
                        "monolith".toLowerCase()
                      }
                      name="monolith"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("monolit")}
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
                        `${checks?.panel}`.toLowerCase() ===
                        "panel".toLowerCase()
                      }
                      name="panel"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("panel")}
                />
              </FormGroup>
            </div>
          </div>

          <div className="filterItem">
            <h4>{t("floor")}</h4>
            <div className="dubleSelect max-min-box">
              <div>
                <input
                  className="input"
                  placeholder="Սկսած"
                  type="number"
                  value={data?.min_floor}
                  name="min_floor"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder="մինչև"
                  type="number"
                  value={data?.max_floor}
                  name="max_floor"
                  onChange={handleChange}
                />
              </div>
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
                  value={data?.min_room}
                  name="min_room"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder={t("max")}
                  type="number"
                  value={data?.max_room}
                  name="max_room"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="filterItem">
            <h4>{t("bathroom")}</h4>
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
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(1)}
                      />
                    }
                    label="1"
                  />
                  <FormControlLabel
                    value="2"
                    control={
                      <Radio
                        sx={{
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(2)}
                      />
                    }
                    label="2"
                  />
                  <FormControlLabel
                    value="3"
                    control={
                      <Radio
                        sx={{
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(3)}
                      />
                    }
                    label="3"
                  />
                  <FormControlLabel
                    value="4"
                    control={
                      <Radio
                        sx={{
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(4)}
                      />
                    }
                    label="4+"
                  />
                </RadioGroup>
              </FormControl>
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
                        `${checks?.new_building}`.toLowerCase() ===
                        "new_building".toLowerCase()
                      }
                      name="new_building"
                      onChange={(e) => handleChangeCheck(e, "new_building")}
                    />
                  }
                  label={t("newBuilding")}
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
                        `${checks?.elevator}`.toLowerCase() ===
                        "elevator".toLowerCase()
                      }
                      name="elevator"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("elevator")}
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
                        `${checks?.children}`.toLowerCase() ===
                        "children".toLowerCase()
                      }
                      name="children"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("childs")}
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
                  label={t("fastGas")}
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
                  label={t("fastContition")}
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
                        `${checks?.open_sofa}`.toLowerCase() ===
                        "open sofa".toLowerCase()
                      }
                      name="open_sofa"
                      onChange={(e) => handleChangeCheck(e, "open sofa")}
                    />
                  }
                  label={t("open_sofa")}
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
                        `${checks?.balconies}`.toLowerCase() ===
                        "balconies".toLowerCase()
                      }
                      name="balconies"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("balkon")}
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
                        `${checks?.balcone_furniture}`.toLowerCase() ===
                        "balcone furniture".toLowerCase()
                      }
                      name="balcone_furniture"
                      onChange={(e) =>
                        handleChangeCheck(e, "balcone furniture")
                      }
                    />
                  }
                  label={t("balcone_furniture")}
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
                        `${checks?.flat_furniture}`.toLowerCase() ===
                        "flat furniture".toLowerCase()
                      }
                      name="flat_furniture"
                      onChange={(e) => handleChangeCheck(e, "flat furniture")}
                    />
                  }
                  label={t("flat_furniture")}
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
                        `${checks?.kitchen_furniture}`.toLowerCase() ===
                        "kitchen furniture".toLowerCase()
                      }
                      name="kitchen_furniture"
                      onChange={(e) =>
                        handleChangeCheck(e, "kitchen furniture")
                      }
                    />
                  }
                  label={t("kitchen_furniture")}
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
                        `${checks?.swimming_pool}`.toLowerCase() ===
                        "swimming pool".toLowerCase()
                      }
                      name="swimming_pool"
                      onChange={(e) => handleChangeCheck(e, "swimming pool")}
                    />
                  }
                  label={t("swimming_pool")}
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
                        `${checks?.jacuzzi}`.toLowerCase() ===
                        "jacuzzi".toLowerCase()
                      }
                      name="jacuzzi"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("jacuzzi")}
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
                        `${checks?.sauna}`.toLowerCase() ===
                        "sauna".toLowerCase()
                      }
                      name="sauna"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("sauna")}
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
                        `${checks?.chat_room}`.toLowerCase() ===
                        "chat room".toLowerCase()
                      }
                      name="chat_room"
                      onChange={(e) => handleChangeCheck(e, "chat room")}
                    />
                  }
                  label={t("chat_room")}
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
                        `${checks?.smart}`.toLowerCase() ===
                        "smart".toLowerCase()
                      }
                      name="smart"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("smart")}
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
                        `${checks?.gas_stove}`.toLowerCase() ===
                        "gas stove".toLowerCase()
                      }
                      name="gas_stove"
                      onChange={(e) => handleChangeCheck(e, "gas stove")}
                    />
                  }
                  label={t("gas_stove")}
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
                        `${checks?.refrigerator}`.toLowerCase() ===
                        "refrigerator".toLowerCase()
                      }
                      name="refrigerator"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("refrigerator")}
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
                        `${checks?.washing_machine}`.toLowerCase() ===
                        "washing machine".toLowerCase()
                      }
                      name="washing_machine"
                      onChange={(e) => handleChangeCheck(e, "washing machine")}
                    />
                  }
                  label={t("washing_machine")}
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
                        `${checks?.stove}`.toLowerCase() ===
                        "stove".toLowerCase()
                      }
                      name="stove"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("stove")}
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
      ) : (
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
            <h4>{t("floor")}</h4>
            <div className="dubleSelect max-min-box">
              <div>
                <input
                  className="input"
                  placeholder="Սկսած"
                  type="number"
                  value={data?.min_floor}
                  name="min_floor"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder="մինչև"
                  type="number"
                  value={data?.max_floor}
                  name="max_floor"
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
                  name="min_area"
                  value={data?.min_area}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder={t("max")}
                  type="number"
                  name="max_area"
                  value={data?.max_area}
                  onChange={handleChange}
                />
              </div>
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
                  value={data?.min_room}
                  name="min_room"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder={t("max")}
                  type="number"
                  value={data?.max_room}
                  name="max_room"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="filterItem">
            <h4>{t("bathroom")}</h4>
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
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(1)}
                      />
                    }
                    label="1"
                  />
                  <FormControlLabel
                    value="2"
                    control={
                      <Radio
                        sx={{
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(2)}
                      />
                    }
                    label="2"
                  />
                  <FormControlLabel
                    value="3"
                    control={
                      <Radio
                        sx={{
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(3)}
                      />
                    }
                    label="3"
                  />
                  <FormControlLabel
                    value="4"
                    control={
                      <Radio
                        sx={{
                          color: "#4e8cb8",
                          "&.Mui-checked": {
                            color: "#4e8cb8",
                          },
                        }}
                        onChange={() => setAxko(4)}
                      />
                    }
                    label="4+"
                  />
                </RadioGroup>
              </FormControl>
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
                        `${checks?.new_building}`.toLowerCase() ===
                        "new building".toLowerCase()
                      }
                      name="new_building"
                      onChange={(e) => handleChangeCheck(e, "new building")}
                    />
                  }
                  label={t("newBuilding")}
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
                        `${checks?.elevator}`.toLowerCase() ===
                        "elevator".toLowerCase()
                      }
                      name="elevator"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("elevator")}
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
                        `${checks?.children}`.toLowerCase() ===
                        "children".toLowerCase()
                      }
                      name="children"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("childs")}
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
                  label={t("fastGas")}
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
                  label={t("fastContition")}
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
                        `${checks?.open_sofa}`.toLowerCase() ===
                        "open sofa".toLowerCase()
                      }
                      name="open_sofa"
                      onChange={(e) => handleChangeCheck(e, "open sofa")}
                    />
                  }
                  label={t("open_sofa")}
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
                        `${checks?.balconies}`.toLowerCase() ===
                        "balconies".toLowerCase()
                      }
                      name="balconies"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("balkon")}
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
                        `${checks?.balcone_furniture}`.toLowerCase() ===
                        "balcone furniture".toLowerCase()
                      }
                      name="balcone_furniture"
                      onChange={(e) =>
                        handleChangeCheck(e, "balcone furniture")
                      }
                    />
                  }
                  label={t("balcone_furniture")}
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
                        `${checks?.flat_furniture}`.toLowerCase() ===
                        "flat furniture".toLowerCase()
                      }
                      name="flat_furniture"
                      onChange={(e) => handleChangeCheck(e, "flat furniture")}
                    />
                  }
                  label={t("flat_furniture")}
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
                        `${checks?.kitchen_furniture}`.toLowerCase() ===
                        "kitchen furniture".toLowerCase()
                      }
                      name="kitchen_furniture"
                      onChange={(e) =>
                        handleChangeCheck(e, "kitchen furniture")
                      }
                    />
                  }
                  label={t("kitchen_furniture")}
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
                        `${checks?.swimming_pool}`.toLowerCase() ===
                        "swimming pool".toLowerCase()
                      }
                      name="swimming_pool"
                      onChange={(e) => handleChangeCheck(e, "swimming pool")}
                    />
                  }
                  label={t("swimming_pool")}
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
                        `${checks?.jacuzzi}`.toLowerCase() ===
                        "jacuzzi".toLowerCase()
                      }
                      name="jacuzzi"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("jacuzzi")}
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
                        `${checks?.sauna}`.toLowerCase() ===
                        "sauna".toLowerCase()
                      }
                      name="sauna"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("sauna")}
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
                        `${checks?.chat_room}`.toLowerCase() ===
                        "chat room".toLowerCase()
                      }
                      name="chat_room"
                      onChange={(e) => handleChangeCheck(e, "chat room")}
                    />
                  }
                  label={t("chat_room")}
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
                        `${checks?.playground}`.toLowerCase() ===
                        "playground".toLowerCase()
                      }
                      name="playground"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("playground")}
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
                        `${checks?.barbeque}`.toLowerCase() ===
                        "barbeque".toLowerCase()
                      }
                      name="barbeque"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("barbeque")}
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
                        `${checks?.smart}`.toLowerCase() ===
                        "smart".toLowerCase()
                      }
                      name="smart"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("smart")}
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
                        `${checks?.work_table}`.toLowerCase() ===
                        "work table".toLowerCase()
                      }
                      name="work_table"
                      onChange={(e) => handleChangeCheck(e, "work table")}
                    />
                  }
                  label={t("work_table")}
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
                        `${checks?.natural_gas}`.toLowerCase() ===
                        "natural gas".toLowerCase()
                      }
                      name="natural_gas"
                      onChange={(e) => handleChangeCheck(e, "")}
                    />
                  }
                  label={t("gas")}
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
                        `${checks?.gas_stove}`.toLowerCase() ===
                        "gas stove".toLowerCase()
                      }
                      name="gas_stove"
                      onChange={(e) => handleChangeCheck(e, "gas stove")}
                    />
                  }
                  label={t("gas_stove")}
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
                        `${checks?.refrigerator}`.toLowerCase() ===
                        "refrigerator".toLowerCase()
                      }
                      name="refrigerator"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("refrigerator")}
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
                        `${checks?.washing_machine}`.toLowerCase() ===
                        "washing machine".toLowerCase()
                      }
                      name="washing_machine"
                      onChange={(e) => handleChangeCheck(e, "washing machine")}
                    />
                  }
                  label={t("washing_machine")}
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
                        `${checks?.dryer}`.toLowerCase() ===
                        "dryer".toLowerCase()
                      }
                      name="dryer"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("dryer")}
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
                        `${checks?.stove}`.toLowerCase() ===
                        "stove".toLowerCase()
                      }
                      name="stove"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("stove")}
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
                        `${checks?.dish}`.toLowerCase() === "dish".toLowerCase()
                      }
                      name="dish"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("dish")}
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
                        `${checks?.bedding}`.toLowerCase() ===
                        "bedding".toLowerCase()
                      }
                      name="bedding"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("bedding")}
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
                        `${checks?.towel}`.toLowerCase() ===
                        "towel".toLowerCase()
                      }
                      name="towel"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("towel")}
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
                        `${checks?.hygiene}`.toLowerCase() ===
                        "hygiene".toLowerCase()
                      }
                      name="hygiene"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("hygiene")}
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
                        `${checks?.clean}`.toLowerCase() ===
                        "clean".toLowerCase()
                      }
                      name="clean"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("clean")}
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
                        `${checks?.security}`.toLowerCase() ===
                        "security".toLowerCase()
                      }
                      name="security"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("security")}
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
                        `${checks?.camera}`.toLowerCase() ===
                        "camera".toLowerCase()
                      }
                      name="camera"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("camera")}
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
                        `${checks?.smooke}`.toLowerCase() ===
                        "smooke".toLowerCase()
                      }
                      name="smooke"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("smooke")}
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
                        `${checks?.event}`.toLowerCase() ===
                        "event".toLowerCase()
                      }
                      name="event"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("event")}
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
                        `${checks?.animal}`.toLowerCase() ===
                        "animal".toLowerCase()
                      }
                      name="animal"
                      onChange={(e) => handleChangeCheck(e)}
                    />
                  }
                  label={t("animal")}
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
      )}
    </>
  );
};
export default function HousesFilter({
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
      <DailyFilterTabs dayly={type} setDayly={setType} />
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
              dayly={type}
              onClose={toggleDrawer("left", false)}
              data={data}
              setPage={setPage}
              setType={setType}
              type={type}
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
            dayly={type}
            data={data}
            setPage={setPage}
            setType={setType}
            type={type}
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
