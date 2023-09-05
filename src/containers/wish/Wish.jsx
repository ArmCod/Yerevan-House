import { CircularProgress } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import cartIcon from "../../assets/images/cart.svg";
import Divaider from "../../components/divaider/Divaider";
import { useIsTablet } from "../../helpers/useScreenType";
import { getWishData } from "../../helpers/wish";
import { getWishText } from "../../store/actions/mapAction";
import {
  getWishAction,
  getWishActionDaily,
  wishCleanUp,
} from "../../store/actions/saleApartmentAction";
import { WishBuy } from "./WishBuy";
import { WishDaily } from "./WishDaily";
import "./wish.css";
export default function Wish() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isTablet = useIsTablet();
  const data = getWishData();
  const [loading, setLoading] = useState(true);
  const saleWish = useSelector((state) => state.saleLandsReducer.saleWish);
  const dailyWish = useSelector((state) => state.saleLandsReducer.dailyWish);
  const wishText = useSelector((state) => state.mapReducer.wishText?.[0]); //dispatch ara actiony chem are vortem api chka
  const [daily, setDaily] = useState([]);
  const [sale, setSale] = useState([]);

  useLayoutEffect(() => {
    dispatch(getWishAction(data.buy));
    dispatch(getWishActionDaily(data.daily));
    dispatch(getWishText());
    setLoading(false);
    return () => {
      dispatch(wishCleanUp());
    };
  }, [dispatch, data]);

  useEffect(() => {
    setDaily(dailyWish);
  }, [dailyWish]);

  useEffect(() => {
    setSale(saleWish);
  }, [saleWish]);

  return (
    <div style={{ maxWidth: "1340px", padding: "0 20px", margin: "0 auto" }}>
      <div
        className="titleBox"
        style={{
          pading: "50px 0",
          margin: "50px 0",
        }}
      >
        <Divaider width="30" />
        <div className="title">
          <h1>{t("wish")}</h1>
        </div>
        <Divaider width="30" />
      </div>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div
            className="titleBox"
            style={{
              pading: "50px 0",
              margin: "50px 0",
            }}
          >
            {!isTablet && <Divaider width="30" />}

            <div className="title">
              <h2>{t("daily")}</h2>
            </div>
            {!isTablet && <Divaider width="30" />}
          </div>
          <div className="wish-dif">
            {daily?.length === 0 ? (
              <div className="datark-box">
                <h1>{t("empty")}</h1>
                <img src={cartIcon} alt="cartIcon" />
              </div>
            ) : (
              daily?.map((item, k) => {
                return (
                  <WishDaily
                    key={k}
                    item={item?.[0]}
                    data={daily}
                    setData={setDaily}
                    ind={k}
                    kindtype={item?.[1]?.kindtype}
                    count={item?.[1]?.count}
                    bad={item?.[1]?.bad}
                    start={item?.[1]?.start}
                    end={item?.[1]?.end}
                    wishText={wishText}
                  />
                );
              })
            )}
          </div>
          <div
            className="titleBox"
            style={{
              pading: "50px 0",
              margin: "50px 0",
            }}
          >
            {!isTablet && <Divaider width="30" />}

            <div className="title">
              <h2>{t("sale")}</h2>
            </div>
            {!isTablet && <Divaider width="30" />}
          </div>
          <div className="wish-dif">
            {sale?.length === 0 ? (
              <div className="datark-box">
                <h1>{t("empty")}</h1>
                <img src={cartIcon} alt="cartIcon" />
              </div>
            ) : (
              sale?.map((item, k) => {
                return (
                  item && (
                    <WishBuy
                      key={k}
                      item={item?.[0]}
                      data={sale}
                      setData={setSale}
                      ind={k}
                      kindtype={item?.[1]}
                    />
                  )
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
