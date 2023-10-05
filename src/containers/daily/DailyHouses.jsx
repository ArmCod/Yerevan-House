import React, { useEffect, useMemo, useState } from "react";
import HousesFilter from "../../components/dailyFiltres/HousesFilter";
import DailyTabs from "../../components/tabs/DailyTabs";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getDailyHouses } from "../../store/actions/dailyAction";
import { Pagination } from "../../components/pagination/Pagination";
import NewVardzTab from "../../components/tabs/newVardTab";
import { changeDetaile } from "../../store/actions/botAction";
import { useParams, useNavigate, Link } from "react-router-dom";
import CardDaily from "../../components/card/CardDaily";

export default function DailyHouses() {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(page_idx);
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.DailtReducer.houses);
  const count = useSelector((state) => state.DailtReducer.housesCount);
  const [axko, setAxko] = useState(null);
  const [checks, setChecks] = useState({});
  const [data, setData] = useState({
    min_price: "",
    max_price: "",
    min_area: "",
    max_area: "",
    min_room: "",
    max_room: "",
    min_floor: "",
    max_floor: "",
    min_leadarea: "",
    max_leadarea: "",
  });
  const [type, setType] = useState("For Rent");

   useEffect(() => {
     const params = new URLSearchParams(both);
     let obj = {};
     for (const [key, value] of params.entries()) {
       obj[`${key}`] = value;
     }
     if (both == "none&none") {
       dispatch(getDailyHouses({ page: Number(page_idx), type }));
     } else {
       dispatch(getDailyHouses({ page: Number(page_idx), ...obj, type }));
     }
     localStorage.setItem("showDays",JSON.stringify(type == "For Rent" ? false : true))

   }, [type]);

  const HousesFilterMemo = useMemo(
    () => (
      <HousesFilter
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
    ),
    [checks, axko, data, type]
  );
  return (
    <div style={{ margin: '0 auto', padding: '0 10px', maxWidth: '1340px' }}>
      <DailyTabs />
      <div className="sale-boxs">
        {HousesFilterMemo}
          {
          type == "For Rent" ? <div className="items-box">
             {items?.map((item) => {
            return (
              <Link
              to={`/daily/house/${item?.id}`}

              key={item.id}
            >
              <Card
                stap={item?.stap}
                image={item?.images}
                location={item?.address || item?.real_address}
                price={item?.price}
                views={item?.viewed}
                footage={item?.area}
                rooms={item?.rooms}
                floor={item?.floor}
                path={item?.id}
                variant="daily"
                type="house"
              />
            </Link>
            );
          })}
          </div> :  <div className="items-box-daily">
          {items?.map((item) => {
            return (
              <Link
                to={`/daily/house/${item?.id}`}

                key={item.id}
              >
                <CardDaily
                  stap={item?.stap}
                  image={item?.images}
                  location={item?.address || item?.real_address}
                  price={item?.price}
                  views={item?.viewed}
                  footage={item?.area}
                  rooms={item?.rooms}
                  floor={item?.floor}
                  path={item?.id}
                  variant="daily"
                  type="house"
                />
              </Link>
            );
          })}
        </div>
        }
      </div>
      <Pagination
        productLength={items?.length}
        data={{ type: type, ...checks, ...data, bathroom: axko }}
        count={Math.ceil(count / 16)}
        page={page}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
        action={getDailyHouses}
        currentPathName={"/daily/houses"}
      />
    </div>
  );
}
