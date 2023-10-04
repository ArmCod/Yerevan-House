import { useState } from "react";
import "./saleTabs.css";
import { rentTabs } from "../../routing/routes";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useIsTablet } from "../../helpers/useScreenType";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { DAILY_APARTMENT_PAGE, RENT_TRANSFER_PAGE } from "../../routing/urls";
import { useTranslation } from "react-i18next";

const NewVardzTab = () => {
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

  const nreVardzTabs = [{ id: 1, path: DAILY_APARTMENT_PAGE, name: t("rent") }];

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
            {nreVardzTabs?.map(({ id, path, name }) => {
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
        nreVardzTabs?.map(({ id, path, name }) => {
          return (
            <div key={id} className="tabItem">
              <h3>
                <Link to={path}>{name}</Link>
              </h3>
              {location.pathname.slice(0, 4) === path.slice(0, 4) && (
                <div className="dot"></div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default NewVardzTab;
