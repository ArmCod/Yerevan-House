import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addDots } from "../../helpers/addDots";
import { getFeatures } from "../../helpers/features";

export default function CardDaily({
  image,
  price,
  views,
  footage,
  rooms,
  floor,
  item,
}) {
  const { t } = useTranslation();
  const currency = useSelector((state) => state.botReducer.currencys);
  const curr = useSelector((state) => state.languageReducer.currency);
  const language = useSelector((state) => state?.languageReducer.lang);

  return (
    <div className="card-daily" style={{ cursor: "pointer" }}>
      <img src={image} alt="cartImg" />
      <div
        className="cardDaily-info-box"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3>
          {language == "en"
            ? item?.title_en
            : language == "ru"
            ? item?.title_ru
            : item?.title_hy}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {getFeatures(item, "", t)?.[0]?.show == false && (
            <div>
              <div className="feature" style={{ width: 230 }}>
                <div style={{ color: "red", userSelect: "none" }}>X</div>
                <div>{getFeatures(item, t)?.[0]?.text}</div>
              </div>
            </div>
          )}
          {getFeatures(item, "", t)?.map((itema) => {
            if (itema?.show) {
              return (
                <div key={itema.id}>
                  <div className="feature" style={{ width: 230 }}>
                    <div className="featuresDot"></div>
                    <div>
                      {itema.show && itema.text} {itema.show && itema?.value}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div
          style={{ display: "flex", alignItems: "center", gap: 20 }}
          className="card-daily-bottom"
        >
          <div>
            {footage} {language === "en" ? "m" : language === "ru" ? "м" : "մ"}{" "}
            <sup>2</sup>
          </div>
          <div>
            {rooms}{" "}
            {rooms !== "" && rooms !== null && rooms !== undefined && t("room")}
          </div>
          <div>
            {floor}{" "}
            {floor !== "" &&
              floor !== null &&
              rooms !== undefined &&
              t("floor")}
          </div>
          <div className="card-other-info">
            <div>
              <RemoveRedEyeIcon className="primary" fontSize="small" />
            </div>
            <div>{views}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0 10px 0",
          }}
          className="card-daily-bottom-price"
        >
          <div>
            {price !== 0 && item?.paym !== 1 ? (
              <h3>
                {curr && curr == "amd"
                  ? addDots(Math.floor(price * currency?.AMD))
                  : curr === "rub"
                  ? addDots(Math.floor(price * currency?.RUB))
                  : curr === "eur"
                  ? addDots(Math.floor(price * currency?.EUR))
                  : addDots(price)}

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
              </h3>
            ) : (
              <h2 style={{ margin: "5px 0" }}>{t("condition")}</h2>
            )}
          </div>
          <button className="button">{t("amragrel")}</button>
        </div>
      </div>
    </div>
  );
}
