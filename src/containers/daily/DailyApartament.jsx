import React, { useState, useEffect, useMemo } from "react";
import ApartmentFilter from "../../components/dailyFiltres/ApartmentFilter";
import DailyTabs from "../../components/tabs/DailyTabs";
import { getDailyApartments } from "../../store/actions/dailyAction";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../components/pagination/Pagination";
import { Link, useParams } from "react-router-dom";
import CardDaily from "../../components/card/CardDaily";

export default function DailyApartment() {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_idx);
  const [pages, setPages] = useState([]);
  const [type, setType] = useState("For Rent");
  const items = useSelector((state) => state.DailtReducer.apartments);
  const count = useSelector((state) => state.DailtReducer.apartmentsCount);
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
  useEffect(() => {
    const params = new URLSearchParams(both);
    let obj = {};
    for (const [key, value] of params.entries()) {
      obj[`${key}`] = value;
    }
    if (both == "none&none") {
      dispatch(getDailyApartments({ page: Number(page_idx), type }));
    } else {
      dispatch(getDailyApartments({ page: Number(page_idx), ...obj, type }));
    }
    localStorage.setItem(
      "showDays",
      JSON.stringify(type == "For Rent" ? false : true)
    );
  }, [type, page_idx, both, dispatch]);

  const ApartmentFilterMemo = useMemo(
    () => (
      <ApartmentFilter
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
    <div style={{ margin: "0 auto", padding: "0 10px", maxWidth: "1340px" }}>
      <DailyTabs />
      <div className="sale-boxs">
        {ApartmentFilterMemo}
        {type == "For Rent" ? (
          <div className="items-box">
            {items?.map((item) => {
              return (
                <Link to={`/daily/apartment/${item?.id}`} key={item?.id}>
                  <CardDaily
                    key={item.id}
                    stap={item?.stap}
                    image={item?.images}
                    location={item?.address || item?.real_address}
                    price={item?.price}
                    views={item?.viewed}
                    footage={item?.area}
                    rooms={item?.rooms}
                    floor={item?.floor}
                    path={item?.id}
                    item={item}
                    variant="daily"
                    type="apartments"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="items-box-daily">
            {items?.map((item) => {
              return (
                <Link to={`/daily/apartment/${item?.id}`} key={item?.id}>
                  <CardDaily
                    key={item.id}
                    stap={item?.stap}
                    image={item?.images}
                    location={item?.address || item?.real_address}
                    price={item?.price}
                    views={item?.viewed}
                    footage={item?.area}
                    rooms={item?.rooms}
                    floor={item?.floor}
                    path={item?.id}
                    item={item}
                    variant="daily"
                    type="apartments"
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Pagination
        productLength={items?.length}
        count={Math.ceil(count / 16)}
        action={getDailyApartments}
        data={{ type: type, ...checks, ...data, bathroom: axko }}
        page={page}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
        currentPathName={"/daily/apartments"}
      />
    </div>
  );
}
