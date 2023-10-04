import React, { useEffect, useMemo, useState } from "react";
import CommercialFilter from "../../components/dailyFiltres/CommercialFilter";
import DailyTabs from "../../components/tabs/DailyTabs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDailyComercial } from "../../store/actions/dailyAction";
import { Pagination } from "../../components/pagination/Pagination";
import { useTranslation } from "react-i18next";
import cartIcon from "../../assets/images/cart.svg";
import CardDaily from "../../components/card/CardDaily";

export default function DailyCommercial() {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [type, setType] = useState("For Rent");
  const [page, setPage] = useState(page_idx);
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.DailtReducer.comercial);
  const count = useSelector((state) => state.DailtReducer.comercialCount);
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
  const [axko, setAxko] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(both);
    let obj = {};
    for (const [key, value] of params.entries()) {
      obj[`${key}`] = value;
    }
    if (both == "none&none") {
      dispatch(getDailyComercial({ page: Number(page_idx) }));
    } else {
      dispatch(getDailyComercial({ page: Number(page_idx), ...obj }));
    }
  }, [dispatch]);

  const CommercialFilterMemo = useMemo(
    () => (
      <CommercialFilter
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
        {CommercialFilterMemo}
        <div className="items-box-daily">
          {items?.map((item) => {
            return (
              <Link to={`/daily/commercial/${item?.id}`} key={item?.id}>
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
                  variant="daily"
                  type="apartments"
                />
              </Link>
            );
          })}
        </div>
        {items?.length == 0 && (
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1>{t("empty")}</h1>
            <img src={cartIcon} alt="cartIcon" />
          </div>
        )}
      </div>
      <Pagination
        productLength={items?.length}
        count={Math.ceil(count / 16)}
        data={{ type: type, ...checks, ...data, bathroom: axko }}
        page={page}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
        action={getDailyComercial}
        currentPathName={"/daily/commercial"}
      />
    </div>
  );
}
