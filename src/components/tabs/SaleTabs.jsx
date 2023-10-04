import { useState } from "react";
import "./saleTabs.css";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useIsTablet } from "../../helpers/useScreenType";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTranslation } from "react-i18next";

export default function SaleTabs() {
  const location = useLocation();
  const isTablet = useIsTablet();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const saleTabs = [
    { id: 1, path: "/sale/apartments/none&none/1", name: t("apatments") },
    { id: 2, path: "/sale/houses/none&none/1", name: t("houses") },
    { id: 3, path: "/sale/lands/none&none/1", name: t("lands") },
    {
      id: 4,
      path: "/sale/commercial/none&none/1",
      name: t("comercial"),
    },
    {
      id: 5,
      path: "/yerevan-house-map/none",
      name: t("map"),
    },
  ];
  return (
    <>
      <div className={isTablet ? "sale-tabs-mobile" : "sale-tabs"}>
        {isTablet ? (
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="primary"
            >
              <h3>Կատեգորիա</h3>{" "}
              {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {saleTabs?.map(({ id, path, name }) => {
                if (location.pathname !== path) {
                  return (
                    <MenuItem key={id} onClick={handleClose}>
                      <Link to={path}>{name}</Link>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </>
        ) : (
          saleTabs?.map(({ id, path, name }) => {
            return (
              <div key={id} className="tabItem">
                <h3>
                  <Link to={path}>{name}</Link>
                </h3>
                {location.pathname === path && <div className="dot"></div>}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
