import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./map.css";
import { useTranslation } from "react-i18next";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { getYerevanMapData } from "../../store/actions/mapAction";
import { useIsMobile } from "../../helpers/useScreenType";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";

const MapFiltres = ({
  category,
  setCategory,
  setOpenFiltres,
  type,
  setType,
}) => {
  const { t } = useTranslation();
  const { both } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [checks, setChecks] = useState({
    lets_draw: null,
    monolith: null,
    panel: null,
  });

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minArea, setMinArea] = useState();
  const [maxArea, setMaxArea] = useState();
  const [minRoomes, setMinRoomes] = useState();
  const [maxRoomes, setMaxRoomes] = useState();
  const [minFloor, setMinFool] = useState();
  const [maxFloor, setMaxFool] = useState();
  function filterNonNullValues(inputObj) {
    if (inputObj === null || typeof inputObj !== "object") {
      return null; // Handle invalid input gracefully
    }

    const resultObj = {};

    for (const key of Object.keys(inputObj)) {
      const value = inputObj[key];
      if (value !== null && value !== undefined) {
        resultObj[key] = value;
      }
    }

    return resultObj;
  }

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
    obj.housetype && setCategory(obj.housetype);
    obj.min_price && setMinPrice(obj.min_price);
    obj.max_price && setMaxPrice(obj.max_price);
    obj.min_area && setMinArea(obj.min_area);
    obj.max_area && setMaxArea(obj.max_area);
    obj.min_room && setMinRoomes(obj.min_room);
    obj.max_room && setMaxRoomes(obj.max_room);
    obj.min_floor && setMinFool(obj.min_floor);
    obj.max_floor && setMaxFool(obj.max_floor);
    setChecks(obj2);

    dispatch(
      getYerevanMapData({
        type,
        housetype: category,
        ...obj,
        ...obj2,
      })
    );
  }, []);

  const changeFiltresParams = () => {
    const pathParams = filterNonNullValues({
      ...checks,
      housetype: category,
      min_price: minPrice,
      max_price: maxPrice,
      min_area: minArea,
      max_area: maxArea,
      min_room: minRoomes,
      max_room: maxRoomes,
      min_floor: minFloor,
      max_floor: maxFloor,
    });
    console.log(category, "00000000000000");
    dispatch(
      getYerevanMapData({
        type,
        ...checks,
        housetype: category,
        ...pathParams,
      })
    );
    const queryString = new URLSearchParams(pathParams).toString();
    navigate(
      `/yerevan-house-map/` + new URLSearchParams(queryString).toString()
    );
  };

  return (
    <div className="mapY">
      {isMobile && (
        <div className="closeFiltres" onClick={() => setOpenFiltres(false)}>
          <CloseIcon />
        </div>
      )}
      <div className="filterItem">
        <h4>{t("type")}</h4>
        <select
          name="cars"
          className="select"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Sale">{t("sale")}</option>
          <option value="For Rent">{t("daily")}</option>
        </select>
      </div>
      <div className="filterItem">
        <h4>Category</h4>
        <select
          name="cars"
          className="select"
          onChange={(e) => setCategory(e.target.value)}
        >
          {type === "Sale" ? (
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
      <div className="filterItem">
        <h4>{t("price")}</h4>
        <div className="dubleSelect max-min-box">
          <div>
            <input
              className="input"
              placeholder={t("min")}
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder={t("max")}
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="filterItem">
        <h4>{t("buildingType")}</h4>
        <div>
          <FormGroup>
            {/* <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#4e8cb8",
                    "&.Mui-checked": {
                      color: "#4e8cb8",
                    },
                  }}
                  onChange={(e) => setBuilding("lets_draw")}
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
                  onChange={(e) => setBuilding("monolith")}
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
                  onChange={(e) => setBuilding("panel")}
                />
              }
              label={t("panel")}
            /> */}
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
        <h4>{t("makeres")}</h4>
        <div className="dubleSelect max-min-box">
          <div>
            <input
              className="input"
              placeholder={t("min")}
              type="number"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder={t("max")}
              type="number"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
            />
          </div>
        </div>
      </div>
      {category !== "Land_area" && (
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
      )}
      {category !== "lands" && (
        <div className="filterItem">
          <h4>{t("floor")}</h4>
          <div className="dubleSelect max-min-box">
            <div>
              <input
                className="input"
                placeholder="Սկսած"
                type="number"
                value={minFloor}
                onChange={(e) => setMinFool(e.target.value)}
              />
            </div>
            <div>
              <input
                className="input"
                placeholder="մինչև"
                type="number"
                value={maxFloor}
                onChange={(e) => setMaxFool(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mapUseBox">
        <button className="button" onClick={changeFiltresParams}>
          {t("use")}
        </button>
      </div>
    </div>
  );
};

export default MapFiltres;
