import "./App.css";
import Pages from "./layout";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { wishData } from "./helpers/wish";
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrencys());
    if (window.console || window.console.firebug) {
      console.clear();
    }
  }, [dispatch]);

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
