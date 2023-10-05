import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaleTabs from "../../components/tabs/SaleTabs";
import Card from "../../components/card/Card";
import HousesFilter from "../../components/saleFiltres/HousesFilter";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "../../components/pagination/Pagination";
import { getSaleHusesPagination } from "../../store/actions/saleApartmentAction";
import { defaultFieldsLends } from "./constants";

export default function SaleHouses() {
  const { both, page_idx } = useParams();

  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.saleHousesReducer.houses);
  const count = useSelector((state) => state.saleHousesReducer.count);
  const [checks, setChecks] = useState({});
  const [axko, setAxko] = useState(null);
  const [data, setData] = useState(defaultFieldsLends);
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
              <Link to={`/sale/house/${item?.id}`} key={item?.id}>
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
      {/* <Pagination
        productLength={items?.length}
        data={{ ...checks, ...data, bathroom: axko }}
        count={Math.ceil(count / 16)}
        page={page_idx}
        pages={pages}
        setPages={setPages}
        action={getSaleHusesPagination}
        currentPathName={"/sale/houses"}
      /> */}
      <Pagination
        productLength={items?.length}
        count={Math.ceil(count / 16)}
        page={page_idx}
        data={{ ...checks, ...data, bathroom: axko }}
        pages={pages}
        setPages={setPages}
        action={getSaleHusesPagination}
        currentPathName={"/sale/houses"}
      />
    </div>
  );
}
