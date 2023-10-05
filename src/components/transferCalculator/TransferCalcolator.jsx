import React, { useState, useEffect } from "react";
import "./transferCalculator.css";
import { useDispatch, useSelector } from "react-redux";
import { getPositions } from "../../store/actions/transferAction";

export default function TransferCalculator({ setShow }) {
  const dispatch = useDispatch();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const positions = useSelector((state) => state?.transfersReducer.positions);
  const language = useSelector((state) => state?.languageReducer.lang);

  useEffect(() => {
    dispatch(getPositions());
    setStart(positions[0]?.position_am);
    setEnd(positions[1]?.position_am);
  }, []);

  return (
    <div className="calculator">
      <div className="calculatorBox">
        <h1>Տրանսֆերների հաշվիչ</h1>
        <div className="actionsBox">
          <div>
            <div className="filterItem">
              <p style={{ marginBottom: "10px" }}>Մեկնարկի վայր</p>
              <div>
                <select
                  name="cars"
                  className="select"
                  style={{ background: "white" }}
                  onChange={(e) => setStart(e.target.value)}
                >
                  {positions
                    ?.filter((y) => y.position_am !== end)
                    .map((i) => {
                      return (
                        <option value={i.position_am} key={i.id}>
                          {language == "en"
                            ? i.position_en
                            : language == "ru"
                              ? i.position_ru
                              : i.position_am}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="filterItem">
              <p style={{ marginBottom: "10px" }}>Ժամանման վայր</p>
              <div>
                <select
                  name="cars"
                  className="select"
                  style={{ background: "white" }}
                  onChange={(e) => setEnd(e.target.value)}
                >
                  {positions
                    ?.filter((y) => y.position_am !== start)
                    .map((i) => {
                      return (
                        <option value={i?.position_am} key={i.id}>
                          {language == "en"
                            ? i.position_en
                            : language == "ru"
                              ? i.position_ru
                              : i.position_am}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          <div>
            <button className="button calcBtton" onClick={() => setShow(true)}>
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
