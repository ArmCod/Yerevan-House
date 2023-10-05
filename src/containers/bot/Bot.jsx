import { useState, useEffect } from "react";
import "./bot.css";
import * as Yup from "yup";
import { Formik } from "formik";
import consversation from "../../assets/images/conversations.svg";
import { phoneRegExp } from "../../helpers/validations";
import Input from "../../components/input/Input";
import chatImg from "../../assets/images/chat-img.png";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { botQuestion } from "../../store/actions/botAction";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../../helpers/useScreenType";
import { useLocation } from "react-router-dom";
export default function Bot() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    question: "",
  });

  useEffect(() => {
    if (location.pathname.slice(0, 5) === "/sale") {
      setPath("Sale");
    } else if (location.pathname.slice(0, 6) === "/daily") {
      setPath("For rent");
    } else {
      setPath("Home");
    }
  }, [location.pathname]);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, message: t("botFirstQuestion"), bot: true },
    { id: 2, message: t("botSecondQuestion"), bot: true },
  ]);
  const sendMessage = () => {
    setMessages([
      ...messages,
      { id: 3, message: newMessage, bot: false },
      {
        id: 4,
        message: `${t("botAnswer")} ${userData.email}`,
        bot: true,
      },
    ]);
    newMessage.length > 0 &&
      dispatch(
        botQuestion({
          name: userData.firstName,
          email: userData.email,
          phone: userData.phoneNumber,
          message: newMessage,
          path,
        })
      );
    setNewMessage("");
  };

  const botValidation = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Must be 5-15 characters or less")
      .max(15, "Must be 5-15 characters or less")
      .required(t("requred")),
    email: Yup.string().email("Email is invalid").required(t("requred")),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, t("requred"))
      .min(5, "Must be 5-20 characters or less")
      .max(20, "Must be 20 characters or less"),
  });

  return (
    <div>
      {
        <>
          {open == "first" ? (
            <div className="first-box">
              <Formik
                initialValues={{
                  firstName: "",
                  email: "",
                  phoneNumber: "",
                }}
                validationSchema={botValidation}
                onSubmit={(values) => {
                  setUserData({ ...userData, ...values });
                  setOpen("second");
                }}
              >
                {({ errors, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="first-box-title">
                      {t("botContact")}
                      <span className="close-second">
                        <CloseIcon
                          sx={{ color: "#F2B84D" }}
                          fontSize="small"
                          onClick={() => setOpen(false)}
                        />
                      </span>
                    </div>
                    <div className="first-box-input-box">
                      <p>{t("name")}</p>
                      <Input name={"firstName"} type={"text"} />
                    </div>
                    <div className="first-box-input-box">
                      <p>{t("email")}</p>
                      <Input name={"email"} type={"email"} />
                    </div>
                    <div className="first-box-input-box">
                      <p>{t("phone")}</p>
                      <Input name={"phoneNumber"} type={"text"} />
                    </div>
                    <div
                      className="first-box-input-box"
                      style={{ borderRadius: "20px" }}
                    >
                      <button className="button" type="submit">
                        {t("send")}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          ) : open == "second" ? (
            <div className="second">
              <div className="first-box-title">
                Yerevan House
                <span className="close-second">
                  <CloseIcon
                    sx={{ color: "#F2B84D" }}
                    fontSize="small"
                    onClick={() => setOpen(false)}
                  />
                </span>
              </div>

              <div className="second-box" style={{ borderRadius: "20px" }}>
                <div className="m-box">
                  {messages.map(({ id, message, bot }) => {
                    return (
                      <div
                        key={id}
                        className={bot ? "our-message" : "user-message"}
                      >
                        <div>
                          {bot && (
                            <div className="yerevan-nkar">
                              <img src={chatImg} alt="chatImg" />
                            </div>
                          )}
                          <div className="o-m">{message} </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="sendInputs">
                  <input
                    type="text"
                    className="input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="button"
                    onClick={() => sendMessage()}
                    style={{ marginTop: 20 }}
                  >
                    {t("send")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bot start-icon" onClick={() => setOpen("first")}>
              <img src={consversation} alt="consversation" />
            </div>
          )}
        </>
      }
    </div>
  );
}
