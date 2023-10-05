import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import { Pagination } from "../../components/pagination/Pagination";
import HousesFilter from "../../components/saleFiltres/HousesFilter";
import SaleTabs from "../../components/tabs/SaleTabs";
import { getSaleHusesPagination } from "../../store/actions/saleApartmentAction";

export default function SaleHouses() {
  const { both, page_idx } = useParams();

  const dispatch = useDispatch();
  const [page, setPage] = useState(page_idx);
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.saleHousesReducer.houses);
  const count = useSelector((state) => state.saleHousesReducer.count);
  const [checks, setChecks] = useState({});
  const [axko, setAxko] = useState(null);
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
    if (both === "none&none") {
      dispatch(getSaleHusesPagination({ page: Number(page_idx) }));
    } else {
      dispatch(getSaleHusesPagination({ page: Number(page_idx), ...obj }));
    }
  }, [both, dispatch, page_idx]);
  const HousesFilterMemo = useMemo(
    () => (
      <HousesFilter
        data={data}
        setPage={setPage}
        setData={setData}
        checks={checks}
        setChecks={setChecks}
        axko={axko}
        setAxko={setAxko}
      />
    ),
    [checks, axko, data]
  );
  return (
    <div style={{ margin: "0 auto", padding: "0 10px", maxWidth: "1340px" }}>
      <SaleTabs />
      <div className="sale-boxs">
        {HousesFilterMemo}
        <div className="items-box">
          {items?.map((item) => {
            return (
              <Link
                // onClick={() => {
                //   dispatch(changeDetaile(true));
                //   navigate(`/sale/house/none&none/${item?.id}`);
                // }}
                to={`/sale/house/${item?.id}`}
                key={item?.id}
              >
                <Card
                  stap={item?.urgent}
                  image={item?.images}
                  location={item?.address || item?.real_address}
                  price={item?.price}
                  views={item?.viewed}
                  footage={item?.area}
                  rooms={item?.rooms}
                  floor={item?.floor}
                  path={item?.id}
                  paym={item?.paym}
                  type="house"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <Pagination
        productLength={items?.length}
        data={{ ...checks, ...data, bathroom: axko }}
        count={Math.ceil(count / 16)}
        page={page_idx}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
        action={getSaleHusesPagination}
        currentPathName={"/sale/houses"}
      />
    </div>
  );
}
