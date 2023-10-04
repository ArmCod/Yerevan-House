import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getSliderData } from "../../store/actions/homePageAction";

import "./HomeSlider.css";

export default function HomeSlider() {
  const dispatch = useDispatch();
  const sliderData = useSelector((state) => state?.homePageReducer.slider);
  const language = useSelector((state) => state?.languageReducer.lang);

  useEffect(() => {
    dispatch(getSliderData());
  }, [dispatch]);
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {sliderData?.map((data) => {
          return (
            <div key={data.id} className="sliderItem">
              <img src={data?.images} alt="banner" />
              <div className="sliderItemText">
                <h1>
                  {language == "en"
                    ? data?.title_en
                    : language == "ru"
                    ? data?.title_ru
                    : data?.title_am}
                </h1>

                <div className="sliderItemTextDesc">
                  <p>
                    {language == "en"
                      ? data?.description_en
                      : language == "ru"
                      ? data?.description_ru
                      : data?.description_am}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
