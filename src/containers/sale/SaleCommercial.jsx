import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import CommercialFilter from "../../components/saleFiltres/CommercialFilter";
import SaleTabs from "../../components/tabs/SaleTabs";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "../../components/pagination/Pagination";
import { getSaleComercialPaginatio } from "../../store/actions/saleApartmentAction";
import { useTranslation } from "react-i18next";
import { defaultFields } from "./constants";

import cartIcon from "../../assets/images/cart.svg";

export default function SaleCommercial() {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.saleComercialReducer.comercial);
  const count = useSelector((state) => state.saleComercialReducer.count);
  const [checks, setChecks] = useState({});
  const [axko, setAxko] = useState(null);
  const [data, setData] = useState(defaultFields);

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
              <Link to={`/sale/commercial/${item?.id}`} key={item?.id}>
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
        pages={pages}
        setPages={setPages}
        action={getSaleComercialPaginatio}
        currentPathName={"/sale/commercial"}
      />
    </div>
  );
}
