import FilterCommercial from "./commercialFiltres/CommercialFiltres";
import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import { useIsTablet } from "../../helpers/useScreenType";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import "./filters.css";

export default function CommercialFilter({
  data,
  setData,
  checks,
  setChecks,
  axko,
  setAxko,
  setPage,
}) {
  const isTablet = useIsTablet();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      {isTablet ? (
        <>
          <Button onClick={toggleDrawer("left", true)}>
            <FilterAltIcon className="primary" fontSize="large" />
          </Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <FilterCommercial
              isTablet={isTablet}
              onClose={toggleDrawer("left", false)}
              setPage={setPage}
              data={data}
              setData={setData}
              checks={checks}
              setChecks={setChecks}
              axko={axko}
              setAxko={setAxko}
            />
          </Drawer>
        </>
      ) : (
        <FilterCommercial
          data={data}
          setPage={setPage}
          setData={setData}
          checks={checks}
          setChecks={setChecks}
          axko={axko}
          setAxko={setAxko}
        />
      )}
    </div>
  );
}
