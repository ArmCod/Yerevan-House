import React from "react";
import DailyTabs from "../../components/tabs/DailyTabs";
import HotelsFilter from "../../components/dailyFiltres/HottelsFilter";
import { useNavigate } from "react-router-dom";
import { data } from "../sale/SaleApartments";
import Card from "../../components/card/Card";
import NewVardzTab from "../../components/tabs/newVardTab";
import { changeDetaile } from "../../store/actions/botAction";
import { useDispatch } from 'react-redux';

export default function DailyHotels() {
  const navigate = useNavigate();
   const dispatch = useDispatch();

  return (
    <div>
      {/* <NewVardzTab /> */}
      <DailyTabs />
      <div className="sale-boxs">
        <HotelsFilter />
        <div className="items-box">
          {data?.map(
            ({
              id,
              stap,
              img,
              category,
              location,
              price,
              views,
              footage,
              rooms,
              floor,
              images,
            }) => {
              return (
                <div
                  onClick={() => {
                    dispatch(changeDetaile(false));
                    navigate(`/sale/daily/${id}`);
                  }}
                  key={id}
                >
                  <Card
                    stap={stap}
                    image={img}
                    category={category}
                    location={location}
                    price={price}
                    views={views}
                    footage={footage}
                    rooms={rooms}
                    floor={floor}
                    path={id}
                    variant="daily"
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
