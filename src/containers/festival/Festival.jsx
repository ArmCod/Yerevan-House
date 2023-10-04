import React, { useEffect } from "react";
import Divaider from "../../components/divaider/Divaider";
import { AdvantagesItem } from "../../components/advantages/Advantages";
import { useDispatch, useSelector } from "react-redux";
import { getFestivals } from "../../store/actions/homePageAction";
export default function Festival() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.languageReducer.lang);
  const festivals = useSelector((state) => state?.homePageReducer.festivals);
  useEffect(() => {
    dispatch(getFestivals());
  }, [dispatch]);
  return (
    <div
      style={{
        pading: "50px 0",
        margin: "50px 0",
      }}
    >
      <div
        className="titleBox"
        style={{
          pading: "50px 0",
          margin: "50px 0",
        }}
      >
        <Divaider width="20" />
        <div className="title successesTitleBox">
          <h1>Փառատոններ</h1>
        </div>
        <Divaider width="20" />
      </div>
      {festivals?.map(
        ({
          id,
          images,
          title_am,
          title_ru,
          title_en,
          description_am,
          description_ru,
          description_en,
        }) => {
          return (
            <div key={id} style={{ margin: "30px 0" }}>
              <AdvantagesItem
                image={images}
                text={
                  language === "en"
                    ? description_en
                    : language === "ru"
                    ? description_ru
                    : description_am
                }
                title={
                  language === "en"
                    ? title_en
                    : language === "ru"
                    ? title_ru
                    : title_am
                }
                revert={id % 2 === 0 ? true : false}
                show={false}
              />
              <div style={{ marginTop: 10 }}>
                {festivals?.length !== id && <Divaider width="100" />}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
