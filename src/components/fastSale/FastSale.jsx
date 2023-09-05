import React, { useState, useEffect } from "react";
import "./fastSale.css";
import cardImg from "../../assets/images/cardImg.png";
import Card from "../card/Card";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getFastSale } from "../../store/actions/transferAction";
import { Pagination } from "../pagination/Pagination";
import Divaider from "../divaider/Divaider";
import { changeDetaile } from "../../store/actions/botAction";
import { useNavigate } from "react-router-dom";

export default function FastSale() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const fastSale = useSelector((state) => state?.transfersReducer.fastSale);
  const count = useSelector((state) => state?.transfersReducer.fastCount);

  useEffect(() => {
    dispatch(getFastSale({ page: page, urgent: 1 }));
  }, []);

  return (
    <div className="fastSale">
      <div className="titleBox">
        <Divaider width="30" />
        <div className="title">
          <h1>{t("urgent")}</h1>
        </div>
        <Divaider width="30" />
      </div>
      <div className="items-box">
        {fastSale?.map(
          ({
            id,
            stap,
            area,
            address,
            location,
            price,
            views,
            viewed,
            rooms,
            floor,
            images,
            real_address,
            type,
            paym,
            item_type,
          }) => {
            return (
              <div
                onClick={() => {
                  dispatch(changeDetaile(false));
                  if (type == "Sale") {
                    navigate(`/sale/${item_type === 'apartments' ? 'apartment' : item_type}/${id}`);
                  } else {
                    navigate(`/daily/${item_type}/${id}`);
                  }
                }}
                key={id}
              >
                <Card
                  key={id}
                  stap={true}
                  image={images}
                  // category={real_address}
                  location={address || real_address}
                  price={price}
                  views={viewed}
                  footage={area}
                  rooms={rooms}
                  floor={floor}
                  path={id}
                  paym={paym}
                  type={item_type}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
