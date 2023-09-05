import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import { Pagination } from "../../components/pagination/Pagination";
import LandsFilter from "../../components/saleFiltres/LandsFilter";
import SaleTabs from "../../components/tabs/SaleTabs";
import { getSaleLandsPaginatio } from "../../store/actions/saleApartmentAction";

export default function SaleLands() {
  const dispatch = useDispatch();
  const { both, page_idx } = useParams();

  const [page, setPage] = useState(page_idx);
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.saleLandsReducer.lands);
  const count = useSelector((state) => state.saleLandsReducer.count);
  const [checks, setChecks] = useState({});
  const [axko, setAxko] = useState(null);
  const [data, setData] = useState({
    min_price: "",
    max_price: "",
    min_area: "",
    max_area: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(both);
    let obj = {};
    for (const [key, value] of params.entries()) {
      obj[`${key}`] = value;
    }
    if (both === "none&none") {
      dispatch(getSaleLandsPaginatio({ page: Number(page_idx) }));
    } else {
      dispatch(getSaleLandsPaginatio({ page: Number(page_idx), ...obj }));
    }
  }, [both, dispatch, page_idx]);

  const LandsFilterMemo = useMemo(
    () => (
      <LandsFilter
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
        {LandsFilterMemo}
        <div className="items-box">
          {items?.map((item) => {
            return (
              <Link to={`/sale/land/${item?.id}`} key={item?.id}>
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
                  type="lands"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <Pagination
        productLength={items?.length}
        count={Math.ceil(count / 16)}
        page={page_idx}
        data={{ ...checks, ...data }}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
        action={getSaleLandsPaginatio}
        currentPathName={"/sale/lands"}
      />
    </div>
  );
}
