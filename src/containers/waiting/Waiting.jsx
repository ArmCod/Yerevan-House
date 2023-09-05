import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FAIL_PAGE, SUCCES_PAGE } from "../../routing/urls";
import CircularProgress from "@mui/material/CircularProgress";

const Waiting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let orderId = window.location.search.slice(
      9,
      window.location.search.length
    );
    orderId === 0 ? navigate(SUCCES_PAGE) : navigate(FAIL_PAGE);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Waiting;
