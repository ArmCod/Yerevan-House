import React, { useEffect } from "react";
import Divaider from "../divaider/Divaider";
import "./advantages.css";

import { useDispatch, useSelector } from "react-redux";
import { getAdvantage } from "../../store/actions/homePageAction";
import { useTranslation } from "react-i18next";

export function AdvantagesItem({ image, text, revert, title, show }) {
  return (
    <div className="advantagesItemBox">
      {revert ? (
        <div className="advantageItem">
          <div className="hovo">
            {title && <h2>{title}</h2>}
            <div>{text}</div>
          </div>
          <img src={image} />
        </div>
      ) : (
        <div className="advantageItem">
          <img src={image} />
          <div className="hovo">
            {title && <h2>{title}</h2>}
            <div>{text}</div>
          </div>
        </div>
      )}
      {show && (
        <div className={revert ? "viewMoreBoxRevert" : "viewMoreBox"}>
          <button className="button">ՏԵՍՆԵԼ ԱՎԵԼԻՆ</button>
        </div>
      )}
    </div>
  );
}
export default function Advantages() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector((state) => state?.languageReducer.lang);
  const advantages = useSelector((state) => state?.homePageReducer.advantage);
  useEffect(() => {
    dispatch(getAdvantage());
  }, []);
  return (
    <div className="advantages">
      <div className="titleBox">
        <Divaider width="20" />
        <div className="title successesTitleBox">
          <h1>{t("advantages")}</h1>
        </div>
        <Divaider width="20" />
      </div>
      <div style={{ maxWidth: 1700, margin: '0 auto' }}>
        {advantages?.map(
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
              <AdvantagesItem
                key={id}
                image={images}
                // image={advantages1}
                text={
                  language == "en"
                    ? description_en
                    : language == "ru"
                      ? description_ru
                      : description_am
                }

                revert={id % 2 === 0 ? true : false}
                show={false}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
