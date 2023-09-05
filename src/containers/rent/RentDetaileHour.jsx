import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import CloseIcon from "@mui/icons-material/Close";
import LuggageIcon from "@mui/icons-material/Luggage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Divaider from "../../components/divaider/Divaider";
import { addWish } from "../../helpers/wish";
import { carData } from "./RentTransfer";
import "./rent.css";

export default function RentDetailHourly() {
  let { id } = useParams();
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [startValue, setStartValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [endValue, setEndValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [flyInfo, setFlyInfo] = useState("");
  const item = carData?.find((item) => item.id == id);
  const changeCount = (number) => {
    if (number <= item?.count && number > 0) {
      setCount(number);
    }
  };

  const handleChangeStart = (newValue) => {
    setStartValue(newValue);
  };
  const handleChangeEnd = (newValue) => {
    setEndValue(newValue);
  };

  const ordering = () => {
    if (startValue && endValue && flyInfo !== "") {
      addWish("car-hourly", item?.id);
      localStorage.setItem(
        "car-hourly",
        JSON.stringify({
          id: item?.id,
          startValue,
          endValue,
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
        <Divaider width="30" />
        <div className="title">
          <h1>{t("transfers")}</h1>
        </div>
        <Divaider width="30" />
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
              <h2>Մեկնարկի օրն ու ժամը</h2>
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
            <div>
              <div>
                <h2>Ավարտի օրն ու ժամը</h2>
              </div>
              <div style={{ flexDirection: "row" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={endValue}
                    onChange={handleChangeEnd}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="car-sterter-box">
            <div>
              <h2>Մեկնարկի վայր</h2>
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
              <h2>Ավարտի վայրը</h2>
              <div style={{ width: "150%" }}>
                <select name="cars" className="select">
                  <option value="volvo">Բոլորը</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
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
            <Divaider width="30" />
            <div className="title">
              <h3>{t("preorder")}</h3>
            </div>
            <Divaider width="30" />
          </div>
          <div className="order-car-detail">
            <div>
              <h3>Տրանսպորտ՝</h3>
              <p>{item?.category}</p>
            </div>
            <div>
              <h3>Մեկնարկի օրն ու ժամը՝ </h3>
              <p>
                {startValue?.$D}.{startValue?.$M}.{startValue?.$y} -
                {startValue?.$H}:{startValue?.$m}
              </p>
            </div>
            <div>
              <h3>Մեկնարկի վայրը՝</h3>
              {endValue?.$D}.{endValue?.$M}.{endValue?.$y} -{endValue?.$H}:
              {endValue?.$m}
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
              Ամրագրել
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
