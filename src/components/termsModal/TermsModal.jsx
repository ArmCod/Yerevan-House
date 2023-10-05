import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divaider from "../divaider/Divaider";
import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getConditions } from "../../store/actions/locationActions";
import { useIsMobile, useIsTablet } from "../../helpers/useScreenType";
import { useTranslation } from "react-i18next";

export default function TermsModal({ open, setOpen, setShow }) {
  const isTablet = useIsTablet();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const style = {
    position: "absolute",
    width: "90vw",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : isTablet ? 600 : 1000,
    height: 500,
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "3px solid #f2b84d",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const conditions = useSelector((state) => state?.locationReducer.conditions);
  const language = useSelector((state) => state?.languageReducer.lang);

  const [accept, setAccept] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getConditions());
  }, []);

  return (
    <Modal
      disableEscapeKeyDown
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          className="titleBox"
          style={{
            margin: "50px 0",
          }}
        >
          <Divaider width="20" />
          <div className="title successesTitleBox">
            <h1>
              {language == "en"
                ? conditions?.title_en
                : language == "ru"
                  ? conditions?.title_ru
                  : conditions?.title_am}
            </h1>
          </div>
          <Divaider width="20" />
        </div>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {language == "en"
            ? conditions?.description_en
            : language == "ru"
              ? conditions?.description_ru
              : conditions?.description_am}
        </Typography>
        <Box
          style={{
            margin: "30px 0",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#F2B84D",
                  "&.Mui-checked": {
                    color: "#F2B84D",
                  },
                }}
                onChange={(e) => {
                  setAccept(e.target.checked);
                  setShow(true);
                }}
              />
            }
            label={t("payman")}
          />
          <button className="button" onClick={handleClose} disabled={!accept}>
            {t("close")}
          </button>
        </Box>
      </Box>
    </Modal>
  );
}
