import { useState } from "react";
import "./saleTabs.css";
import { rentTabs } from "../../routing/routes";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useIsTablet } from "../../helpers/useScreenType";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function RentTabs() {
  const location = useLocation();
  const isTablet = useIsTablet();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={isTablet ? "sale-tabs-mobile" : "sale-tabs"}
      style={{ justifyContent: "center" }}
    >
      {isTablet ? (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "#4e8cb8" }}
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
            {rentTabs?.map(({ id, path, name }) => {
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
        rentTabs?.map(({ id, path, name }) => {
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
  );
}
