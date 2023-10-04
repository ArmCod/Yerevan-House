import { useState } from "react";
import FilterHouse from "./houseFiltres/FilterHouse";
import { Button, Drawer } from "@mui/material";
import { useIsTablet } from "../../helpers/useScreenType";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import "./filters.css";

export default function HousesFilter({
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
          <div style={{ marginBottom: 10 }}>
            <Button onClick={toggleDrawer("left", true)}>
              <FilterAltIcon className="primary" fontSize="large" />
            </Button>
          </div>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <FilterHouse
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
        <FilterHouse
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
