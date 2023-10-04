import React from "react";
import { useTranslation } from "react-i18next";

export default function DailyFilterTabs({ dayly, setDayly }) {
  const { t } = useTranslation();
  return (
    <div className="daylyTabsBox">
      <div
        className="daylyTab"
        onClick={() => {
          setDayly("Short Term");
        }}
      >
        <div
          onClick={() => {
            setDayly("Short Term");
          }}
          className={
            dayly === "Short Term" ? "activeDaylyTab" : "pasiveDaylyTab"
          }
        />
        <div
          onClick={() => {
            setDayly("Short Term");
          }}
        >
          {t("oravardz")}
        </div>
      </div>
      <div
        className="daylyTab"
        onClick={() => {
          setDayly("For Rent");
        }}
      >
        <div
          className={dayly === "For Rent" ? "activeDaylyTab" : "pasiveDaylyTab"}
          onClick={() => {
            setDayly("For Rent");
          }}
        />
        <div
          onClick={() => {
            setDayly("For Rent");
          }}
        >
          {t("erkar")}
        </div>
      </div>
    </div>
  );
}
