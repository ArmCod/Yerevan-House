import React, { useState } from "react";
import "./rent.css";
import { useParams, useNavigate, json } from "react-router-dom";
import Divaider from "../../components/divaider/Divaider";
import { carData } from "./RentTransfer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LuggageIcon from "@mui/icons-material/Luggage";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Swal from "sweetalert2";
import { addWish } from "../../helpers/wish";
import { useIsTablet } from "../../helpers/useScreenType";
import { useTranslation } from "react-i18next";

export default function RentDetailTransfer() {
  let { id } = useParams();
  const { t } = useTranslation();
  const isTablet = useIsTablet();
  const [count, setCount] = useState(1);
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [startLocation, setStartLocation] = useState("Երևանի օդակայան");
  const [endLocation, setEndLocation] = useState("Երևան");
  const [flyInfo, setFlyInfo] = useState("");
  const item = carData?.find((item) => item.id == id);
  const changeCount = (number) => {
    if (number <= item?.count && number > 0) {
      setCount(number);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const ordering = () => {
    if (startLocation && endLocation && value && flyInfo !== "") {
      addWish("car-transfer", item?.id);
      localStorage.setItem(
        "car-transfer",
        JSON.stringify({
          id: item?.id,
          startLocation,
          endLocation,
          date: value,
          flyInfo,
          peopleCount: count,
        })
      );
      Swal.fire(t("toWish"));
    } else {
      Swal.fire({
        icon: "error",
        title: "սխալ...",
        text: "lracreq bolor dashtery!",
      });
    }
  };
  return (
    <div>
      <div
        className="titleBox"
        style={{
          pading: "50px 0",
          margin: "50px 0",
        }}
      >
        {!isTablet && <Divaider width="30" />}
        <div className="title">
          <h1>{t("transfers")}</h1>
        </div>
        {!isTablet && <Divaider width="30" />}
      </div>
      <div className="rent-box">
        <div className="aboutCar">
          <div className="car-info-detail">
            <div className="car-info-img-detail">
              <img src={item?.image} alt="der" />
            </div>
            <div className="car-info-count-detail">
              <div>
                <PeopleAltIcon sx={{ color: "#F2B84D" }} fontSize="large" />
                <CloseIcon sx={{ color: "black" }} fontSize="large" />
                <h1>{item?.count}</h1>
              </div>
              <div>
                <LuggageIcon sx={{ color: "#F2B84D" }} fontSize="large" />
                <CloseIcon sx={{ color: "black" }} fontSize="large" />
                <h1>{item?.bag}</h1>
              </div>
            </div>
            <div className="car-time-info-detail">
              <div>
                <AddRoadIcon sx={{ color: "#F2B84D" }} fontSize="large" />
                <h3>Ճանապարհը՝ {item?.distance}</h3>
              </div>
              <div>
                <AccessTimeIcon sx={{ color: "#F2B84D" }} fontSize="large" />
                <h3>Տևողությունը՝ {item?.duration}</h3>
              </div>
            </div>
          </div>
          <div className="car-sterter-box">
            <div>
              <h2>Մեկնարկի վայր</h2>
              <div>
                <select
                  name="cars"
                  className="select"
                  onChange={(e) => {
                    setStartLocation(e.target.value);
                  }}
                >
                  <option value="volvo">Երևանի օդակայան</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <h2>Ժամանման վայր</h2>
              </div>
              <div>
                <select
                  name="cars"
                  className="select"
                  onChange={(e) => {
                    setEndLocation(e.target.value);
                  }}
                >
                  <option value="volvo">Երևան</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
          </div>
          <div className="car-sterter-box">
            <div>
              <h2>Թռիչքի տվյալները</h2>
              <div>
                <input
                  className="input"
                  type="text"
                  value={flyInfo}
                  onChange={(e) => setFlyInfo(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <h2>Նպատակակետի հասցեն</h2>
              </div>
              <div>
                <select name="cars" className="select">
                  <option value="volvo">Բոլորը</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
            <div>
              <h2>Տրանսֆերի օրն ու ժամը</h2>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: "200px" }}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div>
              <div>
                <h2>{t("peopls-count")}</h2>
              </div>
              <div>
                <div className="counter">
                  <div onClick={() => changeCount(count - 1)}>
                    <RemoveIcon />
                  </div>
                  <div>{count}</div>
                  <div onClick={() => changeCount(count + 1)}>
                    <AddIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="check">
          <div
            className="titleBox"
            style={{
              pading: "50px 0",
              margin: "50px 0",
            }}
          >
            {!isTablet && <Divaider width="30" />}
            <div className="title">
              <h3>{t("preorder")}</h3>
            </div>
            {!isTablet && <Divaider width="30" />}
          </div>
          <div className="order-car-detail">
            <div>
              <h3>Տրանսպորտ՝</h3>
              <p>{item?.category}</p>
            </div>
            <div>
              <h3>Մեկնարկի վայր՝ </h3>
              <p>{startLocation}</p>
            </div>
            <div>
              <h3>Տրանսպորտ՝</h3>
              <p>{endLocation}</p>
            </div>
            <div>Ընդհանուր գինը</div>
            <div>
              <h1 style={{ color: "red" }}> {item?.price} AMD</h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className="button" onClick={() => ordering()}>
              {t("order")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
