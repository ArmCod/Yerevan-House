import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuccesses } from "../../store/actions/homePageAction";
import "../aboutUs/aboutUs.css";
import Divaider from "../divaider/Divaider";
import { useTranslation } from "react-i18next";

export default function Successes() {
  const dispatch = useDispatch();
  const successes = useSelector((state) => state.homePageReducer.successes);
  const language = useSelector((state) => state?.languageReducer.lang);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getSuccesses());
  }, [dispatch]);

  return (
    <div className="successes">
      <div className="titleBox">
        <Divaider width="20" />
        <div className="title successesTitleBox">
          <h1>{t("successes")}</h1>
        </div>
        <Divaider width="20" />
      </div>
      <div className="infoBox">
        {successes?.map(({ id, info, text_am, text_ru, text_en }) => {
          return (
            <div key={id} className="infoCard">
              <div className="info">
                <h1>+ {info}</h1>
              </div>
              <div className="text">
                <h3>
                  {language == "en"
                    ? text_en
                    : language == "ru"
                      ? text_ru
                      : text_am}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
