import { useState } from "react";
import FilterApartment from "./apartmentFiltres/FiltreApartment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, Drawer } from "@mui/material";
import { useIsTablet } from "../../helpers/useScreenType";

import "./filters.css";

export default function ApartmentFilter({
  data,
  setData,
  checks,
  setChecks,
  axko,
  setAxko,
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
            <FilterApartment
              isTablet={isTablet}
              onClose={toggleDrawer("left", false)}
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
        <FilterApartment
          data={data}
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
