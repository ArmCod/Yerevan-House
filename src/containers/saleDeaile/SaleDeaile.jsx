import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, CircularProgress, Modal } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import Swal from "sweetalert2";
import viberIcon from "../../assets/images/viber.svg";
import Divaider from "../../components/divaider/Divaider";
import { addDots } from "../../helpers/addDots";
import useCopyToClipboard from "../../helpers/useCopyToClipboard";
import { useIsMobile, useIsTablet } from "../../helpers/useScreenType";
import { addWish, removeWish } from "../../helpers/wish";
import { setVuie } from "../../store/actions/dailyAction";
import { getFooter } from "../../store/actions/homePageAction";
import { getCities, getRegions } from "../../store/actions/locationActions";
import {
  getSaleSingle,
  saleSingleCleanup,
} from "../../store/actions/saleApartmentAction";

import "./saleDetaile.css";
import { settings } from "./constants";
import { getFeatures } from "../../helpers/features";
import {
  handleClose,
  handleOpen,
  shareCurrentPageViaFacebook,
  shareLinkOnViber,
} from "./helpers";

export default function SaleDeaile({ kindtype }) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const data = useSelector((state) => state.saleApartmentsReducer.single);
  const language = useSelector((state) => state?.languageReducer.lang);
  const info = useSelector((state) => state?.homePageReducer.footer);
  const regions = useSelector((state) => state?.locationReducer.regions);
  const cities = useSelector((state) => state?.locationReducer.cities);
  const currency = useSelector((state) => state.botReducer.currencys);
  const curr = useSelector((state) => state.languageReducer.currency);
  const [showArrow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [reg, setReg] = useState(null);
  const [city, setCity] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState();
  const [active, setActiveIndex] = useState(0);
  const [addToWish, setAddToWish] = useState();
  const [copy] = useCopyToClipboard();
  const [TypePhone, setTypePhone] = useState("");

  const [images, setImages] = useState();
  useLayoutEffect(() => {
    dispatch(getSaleSingle(id, kindtype));
    dispatch(getFooter());
    dispatch(getRegions());
    dispatch(getCities());
    return () => {
      dispatch(saleSingleCleanup());
    };
  }, [dispatch, id, kindtype]);

  useEffect(() => {
    setImages(data?.images);
    data?.images && setActiveImage(data?.images[0]);
    dispatch(setVuie(kindtype, data?.id));
  }, [data, dispatch, id, kindtype]);

  useEffect(() => {
    let x = regions?.filter((r) => r?.title_en === data?.region)[0];
    let y = cities?.filter((c) => c?.localisation_kay === data?.city)[0];
    setReg(x);
    setCity(y);
  }, [data, regions, cities]);

  useEffect(() => {
    data?.images && setActiveImage(data?.images[active]);
  }, [data, active]);

  const nextImage = useCallback(() => {
    setActiveIndex(
      active === images?.length - 1 ? images?.length - 1 : active + 1
    );
  }, [active, images]);

  const prevImage = useCallback(() => {
    setActiveIndex(active === 0 ? 0 : active - 1);
  }, [active]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, nextImage, prevImage]);

  const changeActiveImage = (idx) => {
    setActiveImage(images?.filter((_, index) => index === idx));
    setActiveIndex(idx);
  };

  useEffect(() => {
    data?.images && setActiveImage(data?.images[0]);

    if (window.location.pathname.slice(1, 5) === "sale") {
      setTypePhone("Sale");
    }
  }, [data]);

  useEffect(() => {
    data && setLoading(false);
  }, [data]);

  const addToWishAction = (action) => {
    if (action === "add") {
      const elementToAnimate = document.querySelector("#element-to-animate");
      const targetElement = document.querySelector("#target-element");
      elementToAnimate.classList.add("animate-display");
      const elementRect = elementToAnimate.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const xDistance = targetRect.left - elementRect.left;
      const yDistance = targetRect.top - elementRect.top;
      const style = document.createElement("style");
      style.innerHTML = `
    @keyframes move {
      0% { transform: translate(0, 0); }
      100% { transform: translate(${xDistance}px, ${yDistance}px); width: 20px; height: 20px }
    }
  `;
      document.head.appendChild(style);
      elementToAnimate.style.animationDuration = 1.5 + "s";
      elementToAnimate.classList.add("move-animation");
      setTimeout(() => {
        elementToAnimate.classList.remove("animate-display");
      }, 1500);
      setAddToWish(true);
      dispatch(addWish("buy", id, kindtype));
      if (isMobile) {
        Swal.fire(t("toWish"));
      }
    } else if (action === "remove") {
      setAddToWish(false);
      dispatch(removeWish("buy", id, kindtype));
      Swal.fire(t("delWish"));
    }
  };

  const wishDataSecond = JSON.parse(localStorage.getItem("wish"));
  useEffect(() => {
    let kastil = wishDataSecond?.buy?.filter(
      (item) => item.id === id && item.kindtype === kindtype
    );
    if (kastil?.length > 0) {
      setAddToWish(true);
    } else setAddToWish(false);
  }, [wishDataSecond, id, kindtype]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: isMobile ? window.width : undefined,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  return (
    <div className="main-box">
      {loading ? (
        <div className="to-center">
          <CircularProgress color="inherit" />
        </div>
      ) : data.archive === 1 || data.active === 0 || "Sale" !== data?.type ? (
        <div className="to-center">
          <LockIcon
            className="primary"
            fontSize="large"
          />
        </div>
      ) : (
        <div className="detaile">
          <div className="pricePox">
            <div>
              <div className="category">
                <h4>
                  {language === "en"
                    ? data?.title_en
                    : language === "ru"
                    ? data?.title_ru
                    : data?.title_hy}
                </h4>
              </div>
              <div className="kod">
                <h3>{t("code")} -</h3>
                <div>
                  {data?.new_code
                    ? data?.new_code
                    : data?.inner_code?.split(" ")?.[0]}
                </div>
                ,
                <div>
                  <h3>
                    {language === "en"
                      ? reg?.title_en
                      : language === "ru"
                      ? reg?.title_ru
                      : reg?.title_am}
                    , {"  "}
                    {language === "en"
                      ? city?.localisation_kay
                      : language === "ru"
                      ? city?.localization_kay_ru
                      : city?.localization_kay_am}
                  </h3>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <div>
                  <LocalPhoneIcon
                    className="pointer primary"
                  />
                </div>
                <div>
                  {TypePhone === "Sale"
                    ? info?.vatarqi_bazhin
                    : info?.vardzakalutyan_bazhin}
                </div>
              </div>
            </div>
            <div>
              {data.price !== 0 && data?.paym !== 1 ? (
                <h1>
                  {data && curr === "amd"
                    ? addDots(Math.floor(data?.price * currency?.AMD))
                    : curr === "rub"
                    ? addDots(Math.floor(data?.price * currency?.RUB))
                    : curr === "eur"
                    ? addDots(Math.floor(data?.price * currency?.EUR))
                    : addDots(data?.price)}

                  <span className="dram">
                    {curr === "amd"
                      ? "Դ"
                      : curr === "rub"
                      ? "₽"
                      : curr === "eur"
                      ? "€"
                      : "$"}
                  </span>
                </h1>
              ) : (
                <h2 style={{ margin: "5px 0" }}>{t("condition")}</h2>
              )}
              {data.urgent && <h2>{t("urgent")}</h2>}
              <div style={{ position: "relative" }}>
                <img
                  id="element-to-animate"
                  src={activeImage}
                  className="animate-image"
                  alt="img"
                />
                {!addToWish ? (
                  <StarBorderIcon
                    onClick={() => addToWishAction("add")}
                    fontSize="large"
                    className="primary"
                  />
                ) : (
                  <StarIcon
                    onClick={() => addToWishAction("remove")}
                    fontSize="large"
                    className="primary"
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="mainImage">
              <img
                src={activeImage}
                alt="mainImage"
                onClick={() => handleOpen(setOpen)}
              />
              <div className="detail-social-icpons-box">
                <div onClick={() => copy(window.location)}>
                  <ContentCopyIcon
                    className="pointer primary"
                  />
                </div>
                <div>
                  <img
                    src={viberIcon}
                    alt="viber"
                    style={{
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => shareLinkOnViber()}
                  />
                </div>
                <div>
                  <FacebookIcon
                    sx={{ color: "#4267B2" }}
                    className="pointer"
                    onClick={shareCurrentPageViaFacebook}
                  />
                </div>
                <div>
                  <a href={`tel:${info?.vatarqi_bazhin?.slice(0, 13)}`}>
                    <LocalPhoneIcon
                      sx={{ color: "#7C7B79" }}
                      className="pointer"
                    />
                  </a>
                </div>
              </div>
              <div className="arrowBack" onClick={() => prevImage()}>
                <ArrowBackIosIcon
                  fontSize="large"
                  className="primary"
                />
              </div>
              <div className="arrowNext" onClick={() => nextImage()}>
                <ArrowForwardIosIcon
                  fontSize="large"
                  className="primary"
                />
              </div>
            </div>
            <div className="slider-zrtik">
              <div className="otherImagesBox">
                <Slider {...settings}>
                  {images?.map((item, index) =>
                    index !== active ? (
                      <div
                        key={index}
                        className="otherImage"
                        onClick={() => changeActiveImage(index)}
                      >
                        <img src={item} alt="img" />
                      </div>
                    ) : null
                  )}
                </Slider>
              </div>
            </div>
          </div>
          {data?.body_hy?.trim()?.length > 0 && (
            <div className="titleBox">
              {!isTablet && <Divaider width="30" />}
              <div className="title" style={{ width: "60%" }}>
                <h1 style={{ whiteSpace: "nowrap" }}>{t("guyq")}</h1>
              </div>
              {!isTablet && <Divaider width="30" />}
            </div>
          )}
          {data?.body_hy?.trim()?.length > 0 && (
            <div className="infoBox" style={{ marginBottom: "60px" }}>
              {language === "en"
                ? data?.body_en
                : language === "ru"
                ? data?.body_ru
                : data?.body_hy}
            </div>
          )}
          <div className="titleBox" style={{ marginBottom: "60px" }}>
            {!isTablet && <Divaider width="30" />}
            <div className="title">
              <h1>{t("nkar")}</h1>
            </div>
            {!isTablet && <Divaider width="30" />}
          </div>
          <div className="features">
            {getFeatures(data, kindtype, t)?.map((item) =>
              item?.show ? (
                <div className="feature" key={item.id}>
                  <div className="featuresDot"></div>
                  <div>
                    {item.text} {item?.value}
                  </div>
                </div>
              ) : null
            )}
          </div>
          {data?.lat && data?.lng && (
            <YMaps>
              <Map
                defaultState={{ center: [data?.lat, data?.lng], zoom: 15 }}
                width={"100%"}
                height={"300px"}
              >
                <Placemark
                  geometry={[data?.lat, data?.lng]}
                  options={{
                    preset: "islands#redIcon",
                  }}
                />
              </Map>
            </YMaps>
          )}
        </div>
      )}

      <Modal open={open} onClose={() => handleClose(setOpen)}>
        <Box sx={{ ...style }}>
          <img src={activeImage} className="activeImageAll" alt="activeImage" />
          <span
            style={{
              position: "absolute",
              right: isMobile ? "10px" : "5px",
              cursor: "pointer",
            }}
          >
            <CloseIcon
              className="primary"
              fontSize="large"
              onClick={handleClose}
            />
          </span>
          <div className="arrowBackModal" onClick={() => prevImage()}>
            <ArrowBackIosIcon
              fontSize="large"
              sx={{ color: "black", fontSize: 60 }}
            />
          </div>
          <div className="arrowNextModal" onClick={() => nextImage()}>
            <ArrowForwardIosIcon
              fontSize="large"
              sx={{ color: "black", fontSize: 60 }}
            />
          </div>
        </Box>
      </Modal>
      {showArrow && <div className="arrow"></div>}
    </div>
  );
}
