import React from "react";
import AboutUs from "../../components/aboutUs/AboutUs";
import Advantages from "../../components/advantages/Advantages";
import Armenia from "../../components/armenia/Armenia";
import FastSale from "../../components/fastSale/FastSale";
import HomeSlider from "../../components/home-slider/HomeSlider";
import HomeSearch from "../../components/homeSearch/HomeSearch";
import Successes from "../../components/successes/Successes";

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <HomeSearch />
      <FastSale />
      <AboutUs />
      <Successes />
      <Advantages />
      <Armenia />
    </div>
  );
}
