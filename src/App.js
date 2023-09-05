import "./App.css";
import Pages from "./layout";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import { wishData } from "./helpers/wish";
import { useIsMobile, useIsTablet } from "./helpers/useScreenType";
import { useDispatch } from "react-redux";
import { getCurrencys } from "./store/actions/botAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(wishData?.daily?.length > 0 || wishData?.buy?.length > 0)) {
      localStorage.setItem(
        "wish",
        JSON.stringify({
          daily: [],
          buy: [],
        })
      );
    }
    if (!localStorage.getItem("currency")) {
      localStorage.setItem("currency", "usd");
    }
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "am");
    }
    console.clear();
  }, []);

  useEffect(() => {
    dispatch(getCurrencys());
    if (window.console || window.console.firebug) {
      console.clear();
    }
  }, []);

  // useEffect(() => {
  //   const handleInspectElement = () => {
  //     document.addEventListener("keydown", (e) => {
  //       if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
  //         e.preventDefault();
  //       }
  //     });
  //     document.addEventListener("contextmenu", (e) => {
  //       e.preventDefault();
  //     });
  //   };

  //   handleInspectElement();
  // }, []);

  // document.addEventListener("contextmenu", (e) => e.preventDefault());

  // function ctrlShiftKey(e, keyCode) {
  //   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  // }

  // document.onkeydown = (e) => {
  //   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  //   if (
  //     e.keyCode === 123 ||
  //     ctrlShiftKey(e, "I") ||
  //     ctrlShiftKey(e, "J") ||
  //     ctrlShiftKey(e, "C")(e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  //   )
  //     return false;
  // };
  return (
    <>
      <Navbar />
      <div className="all-main">
        <Pages />
      </div>
      <Footer />
    </>
  );
}

export default App;
