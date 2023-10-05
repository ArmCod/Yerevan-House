import React, { useEffect } from "react";
import Slider from "react-slick";
import "./HomeSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { getSliderData } from "../../store/actions/homePageAction";
import { useIsMobile } from '../../helpers/useScreenType';
export default function HomeSlider() {

  const dispatch = useDispatch();
  const isMobile = useIsMobile()
  const sliderData = useSelector((state) => state?.homePageReducer.slider);
  const language = useSelector((state) => state?.languageReducer.lang);

  useEffect(() => {
    dispatch(getSliderData());
  }, []);
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // initialSlide: 2,
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
          dots: false
        }
      },

    ]
  };
  return (
    <>
      {/* {
        isMobile ? <div className="sliderItem" style={{ width: '100%' }}>
          <img src={sliderData[0]?.images} alt="banner" />
          <div className="sliderItemText">
            <h1>
              {language == "en"
                ? sliderData[0]?.title_en
                : language == "ru"
                  ? sliderData[0]?.title_ru
                  : sliderData[0]?.title_am}
            </h1>

            <div className="sliderItemTextDesc">
              <p>
                {language == "en"
                  ? sliderData[0]?.description_en
                  : language == "ru"
                    ? sliderData[0]?.description_ru
                    : sliderData[0]?.description_am}
              </p>
            </div>
          </div>
        </div> : */}

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
