import React, { useEffect } from "react";
import "./aboutUs.css";
import Divaider from "../divaider/Divaider";
import banner from "../../assets/images/aboutUsBanner.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAboutUs } from "../../store/actions/homePageAction";
import { keys } from "../../assets/keys/index";
export default function AboutUs() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.homePageReducer.aboutUs);
  const language = useSelector((state) => state?.languageReducer.lang);
  useEffect(() => {
    dispatch(getAboutUs());
  }, []);
  return (
    <div className="about">
      <div className="titleBox">
        <Divaider width="30" />
        <div className="title">
          <h1>
            {language == "en"
              ? data?.title_en
              : language == "ru"
                ? data?.title_ru
                : data?.title_am}
          </h1>
        </div>
        <Divaider width="30" />
      </div>
      <div className="infoBox">

        {language == "en"
          ? data?.description_en
          : language == "ru"
            ? data?.description_ru
            : data?.description_am}
      </div>
      <div className="bannerBox">
        <img src={data?.images} alt="banner" />
        {/* <img src={item?.image} alt="banner" /> */}
      </div>
    </div>
  );
}
