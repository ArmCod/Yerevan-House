import LockIcon from "@mui/icons-material/Lock";
import { Button, CircularProgress } from "@mui/material";
import Menu from "@mui/material/Menu";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useIsMobile, useIsTablet } from "../../helpers/useScreenType";
import { addWish, removeWish } from "../../helpers/wish";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Modal } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import Swal from "sweetalert2";
import viberIcon from "../../assets/images/viber.svg";
import Divaider from "../../components/divaider/Divaider";
import { addDots } from "../../helpers/addDots";
import useCopyToClipboard from "../../helpers/useCopyToClipboard";
import { setVuie } from "../../store/actions/dailyAction";
import { getFooter } from "../../store/actions/homePageAction";
import { getCities, getRegions } from "../../store/actions/locationActions";
import {
  getCurrentCalendar,
  getSaleSingle,
  saleSingleCleanup,
} from "../../store/actions/saleApartmentAction";

import "./saleDetaile.css";
import { endHourse, hourse, settings } from "./constants";
import { getFeatures } from "../../helpers/features";
import {
  handleOpen,
  shareCurrentPageViaFacebook,
  shareLinkOnViber,
} from "./helpers";

export default function SaleDailyDeaile({ kindtype }) {
  let { id } = useParams();
  const { t } = useTranslation();
  const isTablet = useIsTablet();
  const dispatch = useDispatch();
  let showDays = JSON.parse(localStorage.getItem("showDays"));
  const data = useSelector((state) => state.saleApartmentsReducer.single);
  const language = useSelector((state) => state?.languageReducer.lang);
  const info = useSelector((state) => state?.homePageReducer.footer);
  const phoneType = useSelector((state) => state.botReducer.sale);
  const currency = useSelector((state) => state.botReducer.currencys);
  const curr = useSelector((state) => state.languageReducer.currency);
  const regions = useSelector((state) => state?.locationReducer.regions);
  const cities = useSelector((state) => state?.locationReducer.cities);
  const calendatData = useSelector(
    (state) => state.DailtReducer.currentCalendar
  );

  const [activeImage, setActiveImage] = useState();
  const [active, setActiveIndex] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEnd, setOpenClose] = useState(null);
  const isMobile = useIsMobile();
  const [startHoure, setStartHoure] = useState("");
  const [endHoure, setEndHoure] = useState("");
  const open = Boolean(anchorEl);
  const [sameDisaleDays, setSameDisaledDays] = useState([]);
  const [openModal, setOpen] = useState(false);
  const [showArrow] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClickEnd = (event) => {
    setOpenClose(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseEnd = () => {
    setOpenClose(null);
  };
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());
  const [count, setCount] = useState(1);
  const [reg, setReg] = useState(null);
  const [city, setCity] = useState(null);

  const [person, setPerson] = useState(0);
  const [addToWish, setAddToWish] = useState();
  const [copy] = useCopyToClipboard();
  const [loading, setLoading] = useState(true);

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
    dispatch(getCurrentCalendar({ id: data?.id, type: kindtype }));
    dispatch(setVuie(kindtype, data?.id));
  }, [data, dispatch, kindtype]);

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

  const handleChangeStart = (newValue) => {
    setStartValue(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setEndValue(newValue);
  };

  const changeActiveImage = (idx) => {
    setActiveImage(images?.filter((_, index) => index === idx));
    setActiveIndex(idx);
  };
  useEffect(() => {
    data && setLoading(false);
  }, [data]);
  useEffect(() => {
    data?.images && setActiveImage(data?.images[0]);
  }, [data]);
  useEffect(() => {
    data?.images && setActiveImage(data?.images[0]);
  }, [data]);
  const changeCount = (number) => {
    if (number > 0) {
      setCount(number);
    }
  };

  const changePerson = (number) => {
    if (number > 0) {
      setPerson(number);
    }
  };

  const idDisableDateStart = useCallback(
    (date) => {
      return calendatData?.some((disabledDate) =>
        date.isSame(disabledDate?.start.slice(0, 10), "day")
      );
    },
    [calendatData]
  );

  const idDisableDateEnd = useCallback(
    (date) => {
      return calendatData?.some((disabledDate) =>
        date.isSame(disabledDate?.end.slice(0, 10), "day")
      );
    },
    [calendatData]
  );

  useEffect(() => {
    let houreIdx;
    if (Array.isArray(calendatData)) {
      calendatData?.map((item) => {
        let endH = item.end.slice(11, 16);
        return endHourse.map((h, idx) => {
          if (h === endH) {
            return (houreIdx = idx);
          }
        });
      });
    }
    setSameDisaledDays(endHourse.slice(houreIdx + 2, endHourse.length));
  }, [calendatData, endHourse]);

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
      dispatch(
        addWish("daily", id, kindtype, {
          start: dayjs(startValue).format()?.slice(0, 10) + "T" + startHoure,
          end: dayjs(endValue).format()?.slice(0, 10) + "T" + endHoure,
          count,
          bad: person,
        })
      );

      if (isMobile) {
        Swal.fire(t("toWish"));
      }
    } else if (action === "remove") {
      setAddToWish(false);
      dispatch(removeWish("daily", id));
      Swal.fire(t("delWish"));
      window.location.reload(false);
    }
  };
  const wishDataSecond = JSON.parse(localStorage.getItem("wish"));
  useEffect(() => {
    let kastil = wishDataSecond?.daily?.filter(
      (item) => item.id === id && item.kindtype === kindtype
    );
    if (kastil?.length > 0) {
      setAddToWish(true);
    } else setAddToWish(false);
  }, [id, kindtype, wishDataSecond]);

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
      ) : data.archive === 1 || data.active === 0 || data?.type === "Sale" ? (
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
                  {phoneType && phoneType
                    ? info?.vatarqi_bazhin
                    : info?.vardzakalutyan_bazhin}
                </div>
              </div>
            </div>
            <div style={{ width: 102 }}>
              {data.price !== 0 && data?.paym !== 1 ? (
                <h1 style={{ whiteSpace: "nowrap" }}>
                  {data && curr === "amd"
                    ? addDots(Math.floor(data?.price * currency?.AMD))
                    : curr === "rub"
                    ? addDots(Math.floor(data?.price * currency?.RUB))
                    : curr === "eur"
                    ? addDots(Math.floor(data?.price * currency?.EUR))
                    : addDots(data?.price)}

                  <span className="dram">
                    {" "}
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
            </div>
          </div>
          <div className="dailyImages-flex">
            <div
              className={
                showDays
                  ? "dailyImages-flex-main"
                  : "dailyImages-flex-main-without-days"
              }
            >
              <div className="mainImage">
                <img
                  src={activeImage}
                  alt="mainImage"
                  onClick={() => handleOpen(setOpen)}
                />
                <div className="detail-social-icpons-box">
                  <div onClick={() => copy(window.location)}>
                    <ContentCopyIcon className="pointer primary" />
                  </div>
                  <div>
                    <img
                      src={viberIcon}
                      alt="viber"
                      className="pointer"
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
                    <a
                      href={`tel:${info?.vardzakalutyan_bazhin?.slice(0, 13)}`}
                    >
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
                    {images?.map((item, index) => {
                      if (index !== active) {
                        return (
                          <div
                            key={item}
                            className="otherImage"
                            onClick={() => changeActiveImage(index)}
                          >
                            <img src={item} alt="img" />
                          </div>
                        );
                      }
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            {!!showDays && (
              <div className="timesBox">
                <div className="times">
                  <div>
                    <div>
                      <h3>{t("daily-time")}</h3>
                    </div>
                    <div className="times-actions">
                      <div className="filterItem detailHoureBox">
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#4e8cb8",
                          }}
                          className="primary"
                          onClick={handleClick}
                        >
                          {t("start")}
                          <CalendarMonthIcon
                            sx={{
                              marginLeft: "27px",
                            }}
                          />
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={() => handleClose(setOpen)}
                        >
                          <MenuItem>
                            <div
                              style={{
                                display: "flex",
                                overflow: "auto",
                              }}
                            >
                              <Calendar
                                value={startValue}
                                minDate={minDate}
                                maxDate={maxDate}
                                tileDisabled={idDisableDateStart}
                                onChange={(e) => handleChangeStart(e)}
                              />
                              <div className="verticalHours">
                                {hourse.map((i) => {
                                  return (
                                    <div
                                      onClick={() => setStartHoure(i)}
                                      className={
                                        startHoure === i && "activeHoure"
                                      }
                                    >
                                      {i}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </MenuItem>
                        </Menu>
                        <div className="detailHoure">
                          <div>
                            {startValue.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}
                          </div>
                          <div>{startHoure}</div>
                        </div>
                      </div>
                      <div className="filterItem detailHoureBox">
                        <Button
                          variant="outlined"
                          className="primary"
                          onClick={handleClickEnd}
                        >
                          {t("end")}
                          <CalendarMonthIcon
                            sx={{
                              marginLeft: "50px",
                            }}
                          />
                        </Button>
                        <Menu
                          anchorEl={openEnd}
                          open={openEnd}
                          onClose={handleCloseEnd}
                        >
                          <MenuItem>
                            <div
                              style={{
                                display: "flex",
                                overflow: "auto",
                              }}
                            >
                              <Calendar
                                value={endValue}
                                minDate={minDate}
                                maxDate={maxDate}
                                tileDisabled={idDisableDateEnd}
                                onChange={(e) => handleChangeEnd(e)}
                              />
                              <div className="verticalHours">
                                {sameDisaleDays.map((i) => {
                                  return (
                                    <div
                                      className={
                                        endHoure === i && "activeHoure"
                                      }
                                      onClick={() => setEndHoure(i)}
                                    >
                                      {i}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </MenuItem>
                        </Menu>
                        <div className="detailHoure">
                          <div>
                            {endValue.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}
                          </div>
                          <div> {endHoure}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3>{t("preorder")}</h3>
                    <div className="times-actions">
                      <div>
                        <div>
                          <p>{t("peopls-count")}</p>
                        </div>
                        <div className="counter">
                          <div
                            onClick={() => changeCount(count - 1)}
                            style={{ width: "unset" }}
                          >
                            <RemoveIcon />
                          </div>
                          <div style={{ textAlign: "center" }}>{count}</div>
                          <div
                            onClick={() => changeCount(count + 1)}
                            style={{ width: "unset" }}
                          >
                            <AddIcon />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <p>{t("plus-leg")}</p>
                        </div>
                        <div className="counter">
                          <div
                            onClick={() => changePerson(person - 1)}
                            style={{ width: "unset" }}
                          >
                            <RemoveIcon />
                          </div>
                          <div style={{ textAlign: "center" }}>{person}</div>
                          <div
                            onClick={() => changePerson(person + 1)}
                            style={{ width: "unset" }}
                          >
                            <AddIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amragrvace" style={{ position: "relative" }}>
                    <img
                      id="element"
                      alt="to-animate"
                      src={activeImage}
                      className="animate-image"
                    />

                    {!addToWish && (
                      <button
                        className="button"
                        onClick={() => addToWishAction("add")}
                        disabled={startHoure === "" || endHoure === ""}
                      >
                        {startHoure === "" || endHoure === ""
                          ? t("chose-date-time")
                          : t("amragrel")}
                      </button>
                    )}
                    {addToWish && (
                      <p style={{ marginTop: 5 }}>{t("addeToWish")}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {data?.body_hy?.trim()?.length > 0 && (
            <div className="titleBox">
              {!isTablet && <Divaider width="30" />}
              <div className="title" style={{ width: "60%", marginTop: 15 }}>
                <h1>{t("guyq")}</h1>
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
          <div
            className="titleBox"
            style={{ marginBottom: "60px", marginTop: "20px" }}
          >
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
                    {item.show && item.text} {item.show && item?.value}
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

      <Modal open={openModal} onClose={handleCloseModal}>
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
              sx={{ color: "black" }}
              fontSize="large"
              onClick={handleCloseModal}
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
