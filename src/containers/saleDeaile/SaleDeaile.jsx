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
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
      },
    },
  ],
};

export default function SaleDeaile({ kindtype }) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const data1 = useSelector((state) => state.saleApartmentsReducer.single);
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
    setImages(data1?.images);
    data1?.images && setActiveImage(data1?.images[0]);
    dispatch(setVuie(kindtype, data1?.id));
  }, [data1, dispatch, id, kindtype]);

  useEffect(() => {
    let x = regions?.filter((r) => r?.title_en === data1?.region)[0];
    let y = cities?.filter((c) => c?.localisation_kay === data1?.city)[0];
    setReg(x);
    setCity(y);
  }, [data1, regions, cities]);

  useEffect(() => {
    data1?.images && setActiveImage(data1?.images[active]);
  }, [data1, active]);

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

  const features = [
    {
      id: 1,
      text: kindtype === "land" ? t("area") : t("lead_area"),
      value: `${data1?.area}` + t("qm"),
      show: data1?.area,
    },
    {
      id: 160,
      text: t("ynd_area"),
      value: `${data1?.lead_area}` + t("qm"),
      show: data1?.lead_area,
    },
    {
      id: 2,
      text: t("bathroom"),
      value: data1?.bathroom,
      show: data1?.bathroom,
    },
    {
      id: 3,
      text: t("balcon"),
      value: data1?.balcon,
      show: data1?.balcon,
    },
    {
      id: 4,
      text: t("one_bed"),
      value: data1?.one_bed,
      show: data1?.one_bed,
    },
    {
      id: 5,
      text: t("two_bed"),
      value: data1?.two_bed,
      show: data1?.two_bed,
    },
    {
      id: 6,
      text: t("floor"),
      value: data1?.floor,
      show: data1?.floor && data1?.floor !== "*",
    },
    {
      id: 7,
      text: t("room"),
      value: data1?.rooms,
      show: data1?.rooms,
    },
    {
      id: 9,
      text: t("toilet"),
      value: data1?.tualet,
      show: data1?.tualet,
    },
    {
      id: 10,
      text: t("stabil_wather"),
      show:
        `${data1?.persistent_water}`.toLowerCase() ===
        "Persistent water".toLowerCase(),
    },
    {
      id: 11,
      text: t("garage"),
      show: `${data1?.garage}`.toLowerCase() === "garage".toLowerCase(),
    },
    {
      id: 12,
      text: t("air_conditioner"),
      show:
        `${data1?.air_conditioner}`.toLowerCase() ===
        "Air conditioner".toLowerCase(),
    },
    {
      id: 13,
      text: t("barbeque"),
      show: `${data1?.barbeque}`.toLowerCase() === "barbeque".toLowerCase(),
    },
    {
      id: 14,
      text: t("gas"),
      show:
        `${data1?.natural_gas}`.toLowerCase() === "Natural gas".toLowerCase() ||
        `${data1?.natural_gas}`.toLowerCase() === "Natural_gas".toLowerCase(),
    },
    {
      id: 15,
      text: t("open_air_parking"),
      show:
        `${data1?.open_air_parking}`.toLowerCase() ===
        "Open air parking".toLowerCase(),
    },
    {
      id: 16,
      text: t("gas_boiler"),
      show: `${data1?.gas_boiler}`.toLowerCase() === "Gas boiler".toLowerCase(),
    },
    {
      id: 17,
      text: t("universal_spase"),
      show:
        `${data1?.universal_spase}`.toLowerCase() ===
        "universal spase".toLowerCase(),
    },
    {
      id: 18,
      text: t("three_phase_current"),
      show:
        `${data1?.three_phase_current}`.toLowerCase() ===
        "Three-phase current".toLowerCase(),
    },
    {
      id: 19,
      text: t("underground_parking"),
      show:
        `${data1?.underground_parking}`.toLowerCase() ===
        "Underground parking".toLowerCase(),
    },
    {
      id: 20,
      text: t("utility_room"),
      show:
        `${data1?.utility_room}`.toLowerCase() === "utility room".toLowerCase(),
    },
    {
      id: 21,
      text: t("office_space"),
      show:
        `${data1?.office_space}`.toLowerCase() === "Office space".toLowerCase(),
    },
    {
      id: 22,
      text: t("internet"),
      show: `${data1?.internet}`.toLowerCase() === "internet".toLowerCase(),
    },
    {
      id: 23,
      text: t("cabel"),
      show: `${data1?.cable_tv}`.toLowerCase() === "Cable TV".toLowerCase(),
    },
    {
      id: 24,
      text: t("service_room"),
      show:
        `${data1?.service_room}`.toLowerCase() === "service room".toLowerCase(),
    },
    {
      id: 25,
      text: t("active_business"),
      show:
        `${data1?.active_business}`.toLowerCase() ===
        "active business".toLowerCase(),
    },
    {
      id: 26,
      text: t("new_building"),
      show:
        `${data1?.new_building}`.toLowerCase() === "new_building".toLowerCase(),
    },
    {
      id: 27,
      text: t("sputnik_tv"),
      show:
        `${data1?.satellite_tv}`.toLowerCase() === "Satellite TV".toLowerCase(),
    },
    {
      id: 28,
      text: t("attic"),
      show: `${data1?.attic}`.toLowerCase() === "attic".toLowerCase(),
    },
    {
      id: 29,
      text: t("commercial_space"),
      show:
        `${data1?.commercial_space}`.toLowerCase() ===
        "Commercial space".toLowerCase(),
    },
    {
      id: 30,
      text: t("panel"),
      show: `${data1?.panel}`.toLowerCase() === "panel".toLowerCase(),
    },
    {
      id: 31,
      text: t("security"),
      show: `${data1?.security}`.toLowerCase() === "security".toLowerCase(),
    },
    {
      id: 32,
      text: t("attic_room"),
      show: `${data1?.attic_room}`.toLowerCase() === "attic room".toLowerCase(),
    },

    {
      id: 33,
      text: t("hotel"),
      show: `${data1?.hotel}`.toLowerCase() === "hotel".toLowerCase(),
    },
    {
      id: 34,
      text: t("lets_draw"),
      show:
        `${data1?.lets_draw}`.toLowerCase() === "lets draw".toLowerCase() ||
        `${data1?.lets_draw}`.toLowerCase() === "Lets_draw".toLowerCase(),
    },
    {
      id: 35,
      text: t("intercom"),
      show: `${data1?.intercom}`.toLowerCase() === "intercom".toLowerCase(),
    },
    {
      id: 36,
      text: t("basement"),
      show: `${data1?.basement}`.toLowerCase() === "basement".toLowerCase(),
    },
    {
      id: 37,
      text: t("guesthouse"),
      show: `${data1?.guesthouse}`.toLowerCase() === "guesthouse".toLowerCase(),
    },
    {
      id: 38,
      text: t("monolith"),
      show: `${data1?.monolith}`.toLowerCase() === "monolith".toLowerCase(),
    },
    {
      id: 39,
      text: t("gym"),
      show: `${data1?.gym}`.toLowerCase() === "gym".toLowerCase(),
    },
    {
      id: 40,
      text: t("green_yard"),
      show: `${data1?.green_yard}`.toLowerCase() === "Green Yard".toLowerCase(),
    },
    {
      id: 41,
      text: t("manufacturing_area"),
      show:
        `${data1?.manufacturing_area}`.toLowerCase() ===
        "Manufacturing area".toLowerCase(),
    },
    {
      id: 42,
      text: t("sunny"),
      show: `${data1?.sunny}`.toLowerCase() === "sunny".toLowerCase(),
    },
    {
      id: 43,
      text: t("balconies"),
      show: `${data1?.balconies}`.toLowerCase() === "balconies".toLowerCase(),
    },
    {
      id: 44,
      text: t("yard"),
      show: `${data1?.yard}`.toLowerCase() === "yard".toLowerCase(),
    },
    {
      id: 45,
      text: t("commercial_spaces"),
      show:
        `${data1?.commercial_spaces}`.toLowerCase() ===
        "commercial spaces".toLowerCase(),
    },
    {
      id: 46,
      text: t("generally_renovated"),
      show:
        `${data1?.generally_renovated}`.toLowerCase() ===
        "generally renovated".toLowerCase(),
    },
    {
      id: 47,
      text: t("open_balcony"),
      show:
        `${data1?.open_balcony}`.toLowerCase() === "Open balcony".toLowerCase(),
    },
    {
      id: 48,
      text: t("stained_glass_windows"),
      show:
        `${data1?.stained_glass_windows}`.toLowerCase() ===
        "stained glass windows".toLowerCase(),
    },
    {
      id: 49,
      text: t("partially_renovated"),
      show:
        `${data1?.partially_renovated}`.toLowerCase() ===
        "partially renovated".toLowerCase(),
    },
    {
      id: 50,
      text: t("2_open_balconies"),
      show:
        `${data1?.["2_open_balconies"]}`.toLowerCase() ===
        "2 Open balconies".toLowerCase(),
    },
    {
      id: 51,
      text: t("fireplace"),
      show: `${data1?.fireplace}`.toLowerCase() === "fireplace".toLowerCase(),
    },

    {
      id: 53,
      text: t("first_line"),
      show: `${data1?.first_line}`.toLowerCase() === "First line".toLowerCase(),
    },
    {
      id: 54,
      text: t("0_pointed"),
      show:
        `${data1?.["0_pointed"]}`.toLowerCase() === "0-pointed".toLowerCase(),
    },

    {
      id: 55,
      text: t("3_open_balconies"),
      show:
        `${data1?.["3_open_balconies"]}`.toLowerCase() ===
        "3 Open balconies".toLowerCase(),
    },
    {
      id: 56,
      text: t("billiard"),
      show: `${data1?.billiard}`.toLowerCase() === "billiard".toLowerCase(),
    },
    {
      id: 57,
      text: t("secondary_line"),
      show:
        `${data1?.secondary_line}`.toLowerCase() ===
        "Secondary line".toLowerCase(),
    },
    {
      id: 58,
      text: t("plastered"),
      show: `${data1?.plastered}`.toLowerCase() === "plastered".toLowerCase(),
    },
    {
      id: 59,
      text: t("beautiful_view"),
      show:
        `${data1?.beautiful_view}`.toLowerCase() ===
        "beautiful view".toLowerCase(),
    },
    {
      id: 60,
      text: t("ping_pong"),
      show: `${data1?.ping_pong}`.toLowerCase() === "Ping pong".toLowerCase(),
    },
    {
      id: 61,
      text: t("for_residential_development"),
      show:
        `${data1?.for_residential_development}`.toLowerCase() ===
        "for residential development".toLowerCase(),
    },
    {
      id: 62,
      text: t("old_renovation"),
      show:
        `${data1?.old_renovation}`.toLowerCase() ===
        "old renovation".toLowerCase(),
    },
    {
      id: 63,
      text: t("closed_balcony"),
      show:
        `${data1?.closed_balcony}`.toLowerCase() ===
        "Closed balcony".toLowerCase(),
    },
    {
      id: 64,
      text: t("summer_kitchen"),
      show:
        `${data1?.summer_kitchen}`.toLowerCase() ===
        "Summer kitchen".toLowerCase(),
    },
    {
      id: 65,
      text: t("agricultural"),
      show:
        `${data1?.agricultural}`.toLowerCase() === "agricultural".toLowerCase(),
    },
    {
      id: 66,
      text: t("designer_style_renovated"),
      show:
        `${data1?.designer_style_renovated}`.toLowerCase() ===
        "designer style renovated".toLowerCase(),
    },
    {
      id: 67,
      text: t("2_closed_balconies"),
      show:
        `${data1?.["2_closed_balconies"]}`.toLowerCase() ===
        "2 closed balconies".toLowerCase(),
    },
    {
      id: 68,
      text: t("outdoor_hall"),
      show:
        `${data1?.outdoor_hall}`.toLowerCase() === "outdoor hall".toLowerCase(),
    },
    {
      id: 69,
      text: t("for_industrial_use"),
      show:
        `${data1?.for_industrial_use}`.toLowerCase() ===
        "For Industrial Use".toLowerCase(),
    },
    {
      id: 70,
      text: t("euro_renovated"),
      show:
        `${data1?.euro_renovated}`.toLowerCase() ===
        "euro renovated".toLowerCase(),
    },
    {
      id: 71,
      text: t("smart"),
      show: `${data1?.smart}`.toLowerCase() === "smart".toLowerCase(),
    },
    {
      id: 72,
      text: t("garden"),
      show: `${data1?.garden}`.toLowerCase() === "garden".toLowerCase(),
    },
    {
      id: 73,
      text: t("for_public_buildings"),
      show:
        `${data1?.for_public_buildings}`.toLowerCase() ===
        "For Public Buildings".toLowerCase(),
    },
    {
      id: 74,
      text: t("cosmetic_renovated"),
      show:
        `${data1?.cosmetic_renovated}`.toLowerCase() ===
        "Cosmetic renovated".toLowerCase(),
    },
    {
      id: 75,
      text: t("studio"),
      show: `${data1?.studio}`.toLowerCase() === "studio".toLowerCase(),
    },
    {
      id: 76,
      text: t("arbor"),
      show: `${data1?.arbor}`.toLowerCase() === "arbor".toLowerCase(),
    },
    {
      id: 77,
      text: t("for_general_purpose"),
      show:
        `${data1?.for_general_purpose}`.toLowerCase() ===
        "For General Purpose".toLowerCase(),
    },
    {
      id: 78,
      text: t("not_inhabited"),
      show:
        `${data1?.not_inhabited}`.toLowerCase() ===
        "not_inhabited".toLowerCase(),
    },
    {
      id: 79,
      text: t("duplex"),
      show: `${data1?.duplex}`.toLowerCase() === "duplex".toLowerCase(),
    },
    {
      id: 80,
      text: t("terrace"),
      show: `${data1?.terrace}`.toLowerCase() === "terrace".toLowerCase(),
    },
    {
      id: 81,
      text: t("playground"),
      show: `${data1?.playground}`.toLowerCase() === "playground".toLowerCase(),
    },
    {
      id: 82,
      text: t("fenced"),
      show: `${data1?.fenced}`.toLowerCase() === "fenced".toLowerCase(),
    },
    {
      id: 83,
      text: t("furnished"),
      show: `${data1?.furnished}`.toLowerCase() === "furnished".toLowerCase(),
    },
    {
      id: 84,
      text: t("penthouse"),
      show: `${data1?.penthouse}`.toLowerCase() === "penthouse".toLowerCase(),
    },

    {
      id: 86,
      text: t("near_the_bus_stop"),
      show:
        `${data1?.near_the_bus_stop}`.toLowerCase() ===
        "Near the bus stop".toLowerCase(),
    },
    {
      id: 87,
      text: t("property_with_equipment"),
      show:
        `${data1?.property_with_equipment}`.toLowerCase() ===
        "Property with equipment".toLowerCase(),
    },
    {
      id: 88,
      text: t("iron_door"),
      show: `${data1?.iron_door}`.toLowerCase() === "Iron door".toLowerCase(),
    },
    {
      id: 89,
      text: t("pool"),
      show: `${data1?.pool}`.toLowerCase() === "pool".toLowerCase(),
    },
    {
      id: 90,
      text: t("elevator"),
      show: `${data1?.elevator}`.toLowerCase() === "elevator".toLowerCase(),
    },
    {
      id: 91,
      text: t("children"),
      show: `${data1?.children}`.toLowerCase() === "children".toLowerCase(),
    },
    {
      id: 92,
      text: t("Euro/modern_windows"),
      show:
        `${data1?.["Euro/modern_windows"]}`.toLowerCase() ===
        "Euro/modern windows".toLowerCase(),
    },
    {
      id: 93,
      text: t("indoor_swimming_pool"),
      show:
        `${data1?.indoor_swimming_pool}`.toLowerCase() ===
        "Indoor swimming pool".toLowerCase(),
    },
    {
      id: 94,
      text: t("cooling"),
      show: `${data1?.cooling}`.toLowerCase() === "cooling".toLowerCase(),
    },
    {
      id: 95,
      text: t("fountain"),
      show: `${data1?.fountain}`.toLowerCase() === "fountain".toLowerCase(),
    },
    {
      id: 96,
      text: t("warm"),
      show: `${data1?.warm}`.toLowerCase() === "warm".toLowerCase(),
    },
  ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeActiveImage = (idx) => {
    setActiveImage(images?.filter((_, index) => index === idx));
    setActiveIndex(idx);
  };

  useEffect(() => {
    data1?.images && setActiveImage(data1?.images[0]);

    if (window.location.pathname.slice(1, 5) === "sale") {
      setTypePhone("Sale");
    }
  }, [data1]);

  useEffect(() => {
    data1 && setLoading(false);
  }, [data1]);

  const addToWishAction = (action) => {
    if (action === "add") {
      const elementToAnimate = document.querySelector("#element-to-animate");
      const targetElement = document.querySelector("#target-element");
      elementToAnimate.classList.add("animate-display");
      const elementRect = elementToAnimate.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      const xDistance = targetRect.left - elementRect.left;
      const yDistance = targetRect.top - elementRect.top;
      // const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);

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

  function shareLinkOnViber() {
    const text = "Check out this link!";
    const url = window.location.href;

    const viberUrl = `viber://forward?text=${encodeURIComponent(
      text + " " + url
    )}`;

    window.open(viberUrl, "_blank");
  }

  function shareCurrentPageViaFacebook() {
    const url = window.location.href;

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;

    window.open(facebookShareUrl, "_blank");
  }

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
    <div
      style={{
        minHeight: "600px",
        maxWidth: "1340px",
        margin: "0 auto",
        padding: "0 10px",
      }}
    >
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
      ) : data1.archive === 1 ||
        data1.active === 0 ||
        "Sale" !== data1?.type ? (
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LockIcon sx={{ color: "#4e8cb8" }} fontSize="large" />
        </div>
      ) : (
        <div className="detaile">
          <div className="pricePox">
            <div>
              <div className="category">
                <h4>
                  {language === "en"
                    ? data1?.title_en
                    : language === "ru"
                    ? data1?.title_ru
                    : data1?.title_hy}
                </h4>
              </div>
              <div className="kod">
                <h3>{t("code")} -</h3>
                <div>
                  {data1?.new_code
                    ? data1?.new_code
                    : data1?.inner_code?.split(" ")?.[0]}
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
                    sx={{ color: "#4e8cb8" }}
                    style={{
                      cursor: "pointer",
                    }}
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
              {data1.price !== 0 && data1?.paym !== 1 ? (
                <h1>
                  {data1 && curr === "amd"
                    ? addDots(Math.floor(data1?.price * currency?.AMD))
                    : curr === "rub"
                    ? addDots(Math.floor(data1?.price * currency?.RUB))
                    : curr === "eur"
                    ? addDots(Math.floor(data1?.price * currency?.EUR))
                    : addDots(data1?.price)}

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
              {data1.urgent && <h2>{t("urgent")}</h2>}
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
                    sx={{ color: "#4e8cb8" }}
                  />
                ) : (
                  <StarIcon
                    onClick={() => addToWishAction("remove")}
                    fontSize="large"
                    sx={{ color: "#4e8cb8" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="mainImage">
              <img src={activeImage} alt="mainImage" onClick={handleOpen} />
              <div className="detail-social-icpons-box">
                <div onClick={() => copy(window.location)}>
                  <ContentCopyIcon
                    sx={{ color: "#4e8cb8" }}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </div>
                {/* <div>
              <ReactWhatsapp
                number={
                  phoneType && phoneType
                    ? info?.vatarqi_bazhin
                    : info?.vardzakalutyan_bazhin
                }
                message={`${window?.location}`}
                className={"whatsUpBtn"}
              >
                <WhatsAppIcon
                  sx={{ color: "#25D366" }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </ReactWhatsapp>
            </div> */}
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
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={shareCurrentPageViaFacebook}
                  />
                </div>
                <div>
                  <a href={`tel:${info?.vatarqi_bazhin?.slice(0, 13)}`}>
                    <LocalPhoneIcon
                      sx={{ color: "#7C7B79" }}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </div>
              </div>
              <div className="arrowBack" onClick={() => prevImage()}>
                <ArrowBackIosIcon fontSize="large" sx={{ color: "#4e8cb8" }} />
              </div>
              <div className="arrowNext" onClick={() => nextImage()}>
                <ArrowForwardIosIcon
                  fontSize="large"
                  sx={{ color: "#4e8cb8" }}
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
          {data1?.body_hy?.trim()?.length > 0 && (
            <div className="titleBox">
              {!isTablet && <Divaider width="30" />}
              <div className="title" style={{ width: "60%" }}>
                <h1 style={{ whiteSpace: "nowrap" }}>{t("guyq")}</h1>
              </div>
              {!isTablet && <Divaider width="30" />}
            </div>
          )}
          {data1?.body_hy?.trim()?.length > 0 && (
            <div className="infoBox" style={{ marginBottom: "60px" }}>
              {language === "en"
                ? data1?.body_en
                : language === "ru"
                ? data1?.body_ru
                : data1?.body_hy}
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
            {features?.map((item) =>
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
          {/* <div className="map"> */}
          {data1?.lat && data1?.lng && (
            <YMaps>
              <Map
                defaultState={{ center: [data1?.lat, data1?.lng], zoom: 15 }}
                width={"100%"}
                height={"300px"}
              >
                <Placemark
                  geometry={[data1?.lat, data1?.lng]}
                  options={{
                    preset: "islands#redIcon",
                  }}
                />
              </Map>
            </YMaps>
          )}

          {/* </div> */}
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
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
              sx={{ color: "#4e8cb8" }}
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
