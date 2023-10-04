import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCities,
  getCity,
  getRegions,
} from "../../../store/actions/locationActions";
import "../filters.css";
import { getSaleHusesPagination } from "../../../store/actions/saleApartmentAction";

export default function FilterHouse({
  isTablet,
  onClose,
  data,
  setData,
  checks,
  setChecks,
  axko,
  setAxko,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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
      getSaleHusesPagination({
        ...istino,
        type: "Sale",
        page: page_idx,
      })
    );
    const queryString = new URLSearchParams(istino).toString();
    navigate(
      `/sale/houses/` +
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
            className="primary"
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
                value={data.min_price}
                name="min_price"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={data.max_price}
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
                value={data.min_lead_area}
                name="min_lead_area"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={data.max_lead_area}
                name="max_lead_area"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="filterItem">
          <h4>{t("livingArea")}</h4>
          <div className="dubleSelect max-min-box">
            <div>
              <input
                className="input"
                placeholder={t("min")}
                type="number"
                value={data.min_area}
                name="min_area"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={data.max_area}
                name="max_area"
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
                value={data.min_room}
                name="min_room"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={data.max_room}
                name="max_room"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="filterItem">
          <h4>{t("type")}</h4>
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
                      `${checks?.house}`.toLowerCase() === "house".toLowerCase()
                    }
                    name="house"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("tnak")}
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
                      `${checks?.townhouse}`.toLowerCase() ===
                      "townhouse".toLowerCase()
                    }
                    name="townhouse"
                    onChange={(e) => handleChangeCheck(e)}
                  />
                }
                label={t("taunHouse")}
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
                      `${checks?.country_house}`.toLowerCase() ===
                      "country house".toLowerCase()
                    }
                    name="country_house"
                    onChange={(e) => handleChangeCheck(e, "country house")}
                  />
                }
                label={t("country_house")}
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
                      `${checks?.panel}`.toLowerCase() === "panel".toLowerCase()
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
            </FormGroup>
          </div>
        </div>

        <div className="filterItem">
          <h4>{t("floor")}</h4>
          <div className="dubleSelect max-min-box">
            <div>
              <input
                className="input"
                placeholder={t("min")}
                type="number"
                value={data.min_floor}
                name="min_floor"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder={t("max")}
                type="number"
                value={data.max_floor}
                name="max_floor"
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
                      `${checks?.old_renovated}`.toLowerCase() ===
                      "old renovated".toLowerCase()
                    }
                    name="old_renovated"
                    onChange={(e) => handleChangeCheck(e, "old renovated")}
                  />
                }
                label={t("oldPair")}
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
                      `${checks?.partially_renovated}`.toLowerCase() ===
                      "partially renovated".toLowerCase()
                    }
                    name="partially_renovated"
                    onChange={(e) =>
                      handleChangeCheck(e, "partially renovated")
                    }
                  />
                }
                label={t("partially")}
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
                      `${checks?.euro_renovated}`.toLowerCase() ===
                      "euro renovated".toLowerCase()
                    }
                    name="euro_renovated"
                    onChange={(e) => handleChangeCheck(e, "euro renovated")}
                  />
                }
                label={t("euroPair")}
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
                      `${checks?.["0_pointed"]}`.toLowerCase() ===
                      "0-pointed".toLowerCase()
                    }
                    name="0_pointed"
                    onChange={(e) => handleChangeCheck(e, "0-pointed")}
                  />
                }
                label={t("0_pointed")}
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
}