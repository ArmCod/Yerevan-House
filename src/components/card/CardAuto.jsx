import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LuggageIcon from "@mui/icons-material/Luggage";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function CardAuto({
  showPrice,
  image,
  category,
  count,
  bag,
  views,
  price,
  duration,
  distance,
  description,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="card">
      <img src={image} alt="cartImg" />

      {showPrice && (
        <div className="shtap">
          <div className="stap-nersi">{price} $</div>
        </div>
      )}
      <div className="card-info">
        <div className="card-categorie">
          <h4>{category}</h4>
          <p>{description}</p>
          {duration && distance && (
            <>
              <h4>{duration} $</h4>
              <h4>{distance} r</h4>
            </>
          )}
        </div>

        <div className="car-info">
          <div className="car-div">
            <PeopleAltIcon sx={{ color: "white" }} fontSize="small" />
            <CloseIcon sx={{ color: "white" }} fontSize="small" />
            <h3>{count}</h3>
          </div>
          <div className="car-div">
            <LuggageIcon sx={{ color: "white" }} fontSize="small" />
            <CloseIcon sx={{ color: "white" }} fontSize="small" />
            <h3>{bag}</h3>
          </div>
          <div>
            <button className="button">{t("showMore")}</button>
          </div>
        </div>
        <div className="card-other-info">
          <div className="card-other-info">
            <div>
              <RemoveRedEyeIcon sx={{ color: "white" }} fontSize="small" />
            </div>
            <div>{views}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
