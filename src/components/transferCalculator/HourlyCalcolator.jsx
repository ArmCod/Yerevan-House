import { useState } from "react";
import "./transferCalculator.css";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

export default function HourlyCalculator({ setShow }) {
  const [startValue, setStartValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [endValue, setEndValue] = useState(dayjs("2014-08-18T21:11:54"));
  const handleChangeStart = (newValue) => {
    setStartValue(newValue);
  };
  const handleChangeEnd = (newValue) => {
    setEndValue(newValue);
  };
  return (
    <div className="calculator">
      <div className="calculatorBox">
        <h1>Ժամով վարձույթի հաշվիչ</h1>
        <div className="actionsBox" style={{ width: "95%" }}>
          <div>
            <div className="filterItem">
              <p style={{ marginBottom: "10px" }}>Մեկնարկի օրն ու ժամը</p>
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
          </div>
          <div>
            <div className="filterItem">
              <p style={{ marginBottom: "10px" }}>Մեկնարկի օրն ու ժամը</p>
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
          </div>
          <div>
            <div className="filterItem">
              <p style={{ marginBottom: "10px" }}>Մեկնարկի վայրը</p>
              <div>
                <select
                  name="cars"
                  className="select"
                  style={{ background: "white" }}
                >
                  <option value="volvo">Բոլորը</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <button className="button" onClick={() => setShow(true)}>
              Հաշվել
            </button>
          </div>
        </div>
        <div className="descBox">
          Ընտրեք վայրերը՝ տրանսֆերների տարբերակները տեսնելու համար և կատարեք
          ամրագրում մեկ ակնթարթում:
        </div>
      </div>
    </div>
  );
}
