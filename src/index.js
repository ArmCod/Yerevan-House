import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextHttpBackend from "i18next-http-backend";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Bot from "./containers/bot/Bot";
import { Provider } from "react-redux";
import { store } from "./store";
// dotenv.config();
// import * as dotenv from "dotenv";
i18n
  .use(initReactI18next)
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init({
    supportedLngs: ["en", "am", "ru"],
    fallbackLng: "am",
    detection: {
      order: ["cookie"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop>
        <App />
        <Bot />
      </ScrollToTop>
    </Provider>
  </BrowserRouter>
);

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();
