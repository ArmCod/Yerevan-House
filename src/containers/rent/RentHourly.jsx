import React, { useState } from "react";
import RentTabs from "../../components/tabs/RentTabs";
import CardAuto from "../../components/card/CardAuto";
import HourlyCalculator from "../../components/transferCalculator/HourlyCalcolator";
import Divaider from "../../components/divaider/Divaider";
import { carData } from "./RentTransfer";
import { useNavigate } from "react-router-dom";
import { useIsTablet } from "../../helpers/useScreenType";

export default function RentHourly() {
  const navigate = useNavigate();
  const isTablet = useIsTablet();
  const [show, setShow] = useState(false);
  return (
    <div>
      <HourlyCalculator setShow={setShow} />
      <div className="titleBox">
        {!isTablet && <Divaider width="30" />}
        <div className="title">
          <h2 style={{ fontSize: "20px" }}>Մեր տրանսպորտային միջոցները</h2>
        </div>
        {!isTablet && <Divaider width="30" />}
      </div>
      <div
        className="cardBox"
      >
        {!show
          ? carData?.map(({ id, image, category, count, bag, views }) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/rent/hourly/${id}`);
                  }}
                  key={id}
                >
                  <CardAuto
                    image={image}
                    category={category}
                    count={count}
                    bag={bag}
                    views={views}
                  />
                </div>
              );
            })
          : carData?.map(
              ({ id, image, category, count, bag, views, price }) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/rent/hourly/${id}`);
                    }}
                    key={id}
                  >
                    <CardAuto
                      showPrice={show}
                      price={price}
                      image={image}
                      category={category}
                      count={count}
                      bag={bag}
                      views={views}
                    />
                  </div>
                );
              }
            )}
      </div>
    </div>
  );
}
