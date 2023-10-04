import React, { useState, useEffect } from "react";
import RentTabs from "../../components/tabs/RentTabs";
import CardAuto from "../../components/card/CardAuto";
import TransferCalculator from "../../components/transferCalculator/TransferCalcolator";
import Divaider from "../../components/divaider/Divaider";
import shkoda from "../../assets/images/shkoda.jpg";
import { useNavigate } from "react-router-dom";
import { useIsTablet } from "../../helpers/useScreenType";
import { useDispatch, useSelector } from "react-redux";
import { getTransfers } from "../../store/actions/transferAction";

export const carData = [
  {
    id: 1,
    image: shkoda,
    category: "Կոմֆորտ սեդան",
    count: 3,
    bag: 3,
    views: 35,
    price: 7500,
    duration: 16,
    distance: 13,
  },
  {
    id: 2,
    image: shkoda,
    category: "Ամենագնաց",
    count: 3,
    bag: 3,
    views: 35,
    price: 7500,
    duration: 16,
    distance: 13,
  },
  {
    id: 3,
    image: shkoda,
    category: "մինիվեն",
    count: 3,
    bag: 3,
    views: 35,
    price: 7500,
    distance: 13,
    duration: 16,
  },
  {
    id: 4,
    image: shkoda,
    category: "պրեմիում սեդան",
    count: 2,
    bag: 2,
    views: 35,
    price: 7500,
    distance: 13,
    duration: 16,
  },
  {
    id: 5,
    image: shkoda,
    category: "միկրոավտոբուս",
    count: 9,
    bag: 7,
    views: 35,
    price: 7500,
    distance: 13,
    duration: 16,
  },
  {
    id: 6,
    image: shkoda,
    category: "Կոմֆորտ սեդան",
    count: 3,
    bag: 3,
    views: 35,
    price: 7500,
    distance: 13,
    duration: 16,
  },
  {
    id: 7,
    image: shkoda,
    category: "միկրոավտոբուս",
    count: 3,
    bag: 3,
    views: 35,
    price: 7500,
    distance: 13,
    duration: 16,
  },
  {
    id: 8,
    image: shkoda,
    category: "պրեմիում սեդան",
    count: 3,
    bag: 3,
    views: 35,
    price: 7500,
    distance: 13,
    duration: 16,
  },
];

export default function RentTransfer() {
  const navigate = useNavigate();
  const isTablet = useIsTablet();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const data = useSelector((state) => state?.transfersReducer.transfers);
  const count = useSelector((state) => state?.transfersReducer.count);
  const language = useSelector((state) => state?.languageReducer.lang);

  useEffect(() => {
    dispatch(getTransfers());
  }, [dispatch]);

  return (
    <div className="detail-mobile">
      <TransferCalculator setShow={setShow} />
      <div className="titleBox">
        {!isTablet && <Divaider width="30" />}
        <div className="title transfer-title">
          <h1>Մեր տրանսպորտային միջոցները</h1>
        </div>
        {!isTablet && <Divaider width="30" />}
      </div>
      <div
        className="cardBox"
        style={{
          padding: "0 100px",
          margin: "50px 0",
        }}
      >
        {!show
          ? data?.map(
            ({
              id,
              image,
              title_am,
              title_ru,
              title_en,
              description_am,
              description_ru,
              description_en,
              people,
              baggage,
              views,
            }) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/rent/transfer/${id}`);
                  }}
                  key={id}
                >
                  <CardAuto
                    image={image ? image : shkoda}
                    category={
                      language == "en"
                        ? title_en
                        : language == "ru"
                          ? title_ru
                          : title_am
                    }
                    description={
                      language == "en"
                        ? description_en
                        : language == "ru"
                          ? description_ru
                          : description_am
                    }
                    count={people}
                    bag={baggage}
                    views={views}
                  />
                </div>
              );
            }
          )
          : data?.map(
            ({
              id,
              image,
              title_am,
              title_ru,
              title_en,
              description_am,
              description_ru,
              description_en,
              people,
              baggage,
              price,
              duration,
              distance,
            }) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/rent/transfer/${id}`);
                  }}
                  key={id}
                >
                  <CardAuto
                    showPrice={true}
                    image={image ? image : shkoda}
                    category={
                      language == "en"
                        ? title_en
                        : language == "ru"
                          ? title_ru
                          : title_am
                    }
                    description={
                      language == "en"
                        ? description_en
                        : language == "ru"
                          ? description_ru
                          : description_am
                    }
                    count={people}
                    bag={baggage}
                    price={price}
                    duration={duration}
                    distance={distance}
                  />
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}
