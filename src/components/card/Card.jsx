import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addDots } from "../../helpers/addDots";

export default function Card({
  stap,
  image,
  price,
  views,
  footage,
  rooms,
  floor,
  paym,
}) {
  const currency = useSelector((state) => state.botReducer.currencys);
  const curr = useSelector((state) => state.languageReducer.currency);
  const language = useSelector((state) => state?.languageReducer.lang);
  const { t } = useTranslation();

  return (
    <div className="card">
      <img src={image} alt="cartImg" />
      {stap && (
        <div className="shtap">
          <span className="stap-nersi">{t("urgent")}</span>
        </div>
      )}
      <div className="card-info-info">
        <div className="card-selary">
          <div>
            {price !== 0 && paym !== 1 ? (
              <h3>
                {curr && curr === "amd"
                  ? addDots(Math.floor(price * currency?.AMD))
                  : curr === "rub"
                  ? addDots(Math.floor(price * currency?.RUB))
                  : curr === "eur"
                  ? addDots(Math.floor(price * currency?.EUR))
                  : addDots(price)}

                <span className="dram">
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
        </div>
        <div className="card-other-info">
          <div>
            {footage} {language === "en" ? "m" : language === "ru" ? "м" : "մ"}
            <sup>2</sup>
          </div>
          <div>
            {rooms}
            {rooms !== "" && rooms !== null && rooms !== undefined && t("room")}
          </div>
          <div>
            {floor}
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
      </div>
    </div>
  );
}
