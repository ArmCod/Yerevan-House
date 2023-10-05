import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { Pagination } from "../../components/pagination/Pagination";
import CommercialFilter from "../../components/saleFiltres/CommercialFilter";
import SaleTabs from "../../components/tabs/SaleTabs";
import { changeDetaile } from "../../store/actions/botAction";
import { getSaleComercialPaginatio } from "../../store/actions/saleApartmentAction";
import { data } from "./SaleApartments";
import { useTranslation } from "react-i18next";
import cartIcon from "../../assets/images/cart.svg";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SaleCommercial() {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState(page_idx);
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.saleComercialReducer.comercial);
  const count = useSelector((state) => state.saleComercialReducer.count);
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
  });

  useEffect(() => {
    const params = new URLSearchParams(both);
    let obj = {};
    for (const [key, value] of params.entries()) {
      obj[`${key}`] = value;
    }
    if (both == "none&none") {
      dispatch(getSaleComercialPaginatio({ page: Number(page_idx) }));
    } else {
      dispatch(getSaleComercialPaginatio({ page: Number(page_idx), ...obj }));
    }
  }, [both, dispatch]);

  const CommercialFilterMemo = useMemo(
    () => (
      <CommercialFilter
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
        {CommercialFilterMemo}
        <div className="items-box">
          {items?.map((item) => {
            return (
              <Link
                // onClick={() => {
                //   dispatch(changeDetaile(true));
                //   navigate(`/sale/commercial/none&none/${item?.id}`);
                // }}
                to={`/sale/commercial/${item?.id}`}
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
                  type="com"
                />
              </Link>
            );
          })}
        </div>
        {items.length == 0 && (
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
        page={page_idx}
        data={{ ...checks, ...data, bathroom: axko }}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
        action={getSaleComercialPaginatio}
        currentPathName={"/sale/commercial"}
      />
    </div>
  );
}
