import React, { useEffect, useState, useRef } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import useGeolocation from "react-hook-geolocation";
import MapFiltres from "./MapFilters";
import { useDispatch, useSelector } from "react-redux";
import { getYerevanMapData, showMapItem } from "../../store/actions/mapAction";
import MapSingle from "./SingleIMapItem";
import { useIsMobile } from "../../helpers/useScreenType";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const YerevanMap = () => {
  const dispach = useDispatch();
  const isMobile = useIsMobile();
  const data = useSelector((state) => state.mapReducer.list);
  const single = useSelector((state) => state.mapReducer.single);
  const [open, setOpen] = useState(false);
  const [openFiltres, setOpenFiltres] = useState(!isMobile);
  const [category, setCategory] = useState("Flat");
  const [type, setType] = useState("Sale");
  const handleClose = () => setOpen(false);
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000,
  });
  const mapRef = useRef();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    dispach(
      getYerevanMapData({
        type: "Sale",
        housetype: "Flat",
      })
    );
  }, [dispach]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box height="var(--app-height)" display="flex" flexDirection="column">
        <YMaps query={{ mode: "debug" }}>
          <Map
            width="100vw"
            height="100%"
            defaultState={{ center: [40.18111, 44.51361], zoom: 13 }}
            instanceRef={mapRef}
          >
            {data?.map(({ id, lat, lng, title_hy }) => {
              return (
                <Placemark
                  key={id}
                  geometry={[lat, lng]}
                  options={{
                    preset: "islands#redIcon",
                    hideIconOnBalloonOpen: true,
                    balloonOffset: [3, -40],
                  }}
                  properties={{
                    iconContent: "YH",
                    balloonContent: title_hy,
                    hintContent: title_hy,
                  }}
                  onClick={() => {
                    dispach(showMapItem(id, type, category));
                    setOpen(true);
                  }}
                />
              );
            })}

            {!geolocation.error && geolocation.latitude && (
              <Placemark
                geometry={[geolocation.latitude, geolocation.longitude]}
                options={{
                  preset: "islands#geolocationIcon",
                  iconColor: "green",
                }}
              />
            )}
            <ZoomControl />
            {openFiltres ? (
              <MapFiltres
                category={category}
                setCategory={setCategory}
                setOpenFiltres={setOpenFiltres}
                type={type}
                setType={setType}
              />
            ) : (
              <div
                onClick={() => {
                  setOpenFiltres(true);
                  handleClose();
                }}
                className="openFiltres"
              >
                <FilterAltIcon fontSize="large" />
              </div>
            )}
            {open && (
              <MapSingle
                handleClose={handleClose}
                data={single}
                category={category}
                type={type}
              />
            )}
          </Map>
        </YMaps>
      </Box>
    </ThemeProvider>
  );
};

export default YerevanMap;
