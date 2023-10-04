import React, { useEffect, useMemo, useState } from "react";
import ApartmentFilter from "../../components/saleFiltres/ApartmentFilter";
import SaleTabs from "../../components/tabs/SaleTabs";
import Card from "../../components/card/Card";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSaleApartmentsPagination } from "../../store/actions/saleApartmentAction";
import { useSelector } from "react-redux";
import { Pagination } from "../../components/pagination/Pagination";
import { defaultFields } from "./constants";

export default function SaleApartments() {
  const { both, page_idx } = useParams();
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  const items = useSelector((state) => state.saleApartmentsReducer.apartments);
  const count = useSelector((state) => state.saleApartmentsReducer.count);
  const [checks, setChecks] = useState({});
  const [axko, setAxko] = useState(null);
  const [data, setData] = useState(defaultFields);

  useEffect(() => {
    const params = new URLSearchParams(both);
    let obj = {};
    for (const [key, value] of params.entries()) {
      obj[`${key}`] = value;
    }
    if (both === "none&none") {
      dispatch(getSaleApartmentsPagination({ page: Number(page_idx) }));
    } else {
      dispatch(getSaleApartmentsPagination({ page: Number(page_idx), ...obj }));
    }
  }, [both, dispatch, page_idx]);

  const ApartmentFilterMemo = useMemo(
    () => (
      <ApartmentFilter
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
        {ApartmentFilterMemo}

        <div className="items-box">
          {items?.map(
            ({
              id,
              urgent,
              area,
              address,
              price,
              viewed,
              rooms,
              floor,
              images,
              real_address,
              paym,
            }) => {
              return (
                <Link to={`/sale/apartment/${id}`} key={id}>
                  <Card
                    key={id}
                    stap={urgent}
                    image={images}
                    location={address || real_address}
                    price={price}
                    views={viewed}
                    footage={area}
                    rooms={rooms}
                    floor={floor}
                    path={id}
                    paym={paym}
                    type="apartments"
                  />
                </Link>
              );
            }
          )}
        </div>
      </div>
      <Pagination
        productLength={items?.length}
        count={Math.ceil(count / 16)}
        page={page_idx}
        data={{ ...checks, ...data, bathroom: axko }}
        pages={pages}
        setPages={setPages}
        action={getSaleApartmentsPagination}
        currentPathName={"/sale/apartments"}
      />
    </div>
  );
}
