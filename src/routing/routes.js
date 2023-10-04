import DailyApartment from "../containers/daily/DailyApartament";
import DailyCommercial from "../containers/daily/DailyCommercial";
import DailyHouses from "../containers/daily/DailyHouses";
import {
  ABOUT_COUNTRY_PAGE,
  DAILY_APARTMENT_PAGE,
  DAILY_APARTMENT_PAGE_PLUS,
  DAILY_COMMERCIAL_PAGE,
  DAILY_COMMERCIAL_PAGE_PLUS,
  DAILY_HOUSES_PAGE,
  DAILY_HOUSES_PAGE_PLUS,
  FAIL_PAGE,
  FAST_SALE,
  FESTIVALS_PAGE,
  FORMING_PAGE,
  GET_PARTNER_PAGE,
  HOME_PAGE,
  MAP_PAGE,
  RENT_DETAILE_HOURLY_PAGE,
  RENT_DETAILE_TRANSFER_PAGE,
  RENT_HOURLY_PAGE,
  RENT_TRANSFER_PAGE,
  SALE_COMERCIAL_PAGE,
  SALE_COMERCIAL_PAGE_PLUS,
  SALE_DAILY_DETAILE_APARTMENT,
  SALE_DAILY_DETAILE_COMMERCIAL,
  SALE_DAILY_DETAILE_HOUSE,
  SALE_DETAILE_APARTMENT,
  SALE_DETAILE_COMMERCIAL,
  SALE_DETAILE_HOUSE,
  SALE_DETAILE_LAND,
  SALE_HOUSES_PAGE,
  SALE_HOUSES_PAGE_PLUS,
  SALE_LANDS_PAGE,
  SALE_LANDS_PAGE_PLUS,
  SALE_PAGE,
  SALE_PAGE_PLUS,
  SIGHTSEEING_PAGE,
  SUCCES_PAGE,
  WAITING_PAGE,
  WISH_PAGE,
} from "./urls";

import Forming from "../containers/forming/Forming";
import Home from "../containers/home/Home";
import Sale from "../containers/sale/SaleApartments";
import Wish from "../containers/wish/Wish";
import About from "../containers/about/About";
import FastSaleBox from "../containers/fast/Fast";
import Festival from "../containers/festival/Festival";
import YerevanMap from "../containers/map/Map";
import Partner from "../containers/partner/Partner";
import Fail from "../containers/payments/Fail";
import Success from "../containers/payments/Succes";
import RentDetailHourly from "../containers/rent/RentDetaileHour";
import RentDetailTransfer from "../containers/rent/RentDetaileTransfer";
import RentHourly from "../containers/rent/RentHourly";
import RentTransfer from "../containers/rent/RentTransfer";
import SaleCommercial from "../containers/sale/SaleCommercial";
import SaleHouses from "../containers/sale/SaleHouses";
import SaleLands from "../containers/sale/SaleLands";
import SaleDailyDeaile from "../containers/saleDeaile/SaleDailyDetail";
import SaleDeaile from "../containers/saleDeaile/SaleDeaile";
import Sightseeing from "../containers/sightseeing/Sightseeing";
import Waiting from "../containers/waiting/Waiting";

export const pages = [
  { id: 1, path: HOME_PAGE, name: "HOME", Component: Home },

  {
    id: 2,
    path: DAILY_APARTMENT_PAGE,
    name: "Daily",
    Component: DailyApartment,
  },
  { id: 3, path: DAILY_HOUSES_PAGE, name: "Daily", Component: DailyHouses },
  {
    id: 5,
    path: DAILY_COMMERCIAL_PAGE,
    name: "Daily",
    Component: DailyCommercial,
  },

  {
    id: 6,
    path: RENT_TRANSFER_PAGE,
    name: "Transfer",
    Component: RentTransfer,
  },
  {
    id: 7,
    path: RENT_DETAILE_TRANSFER_PAGE,
    name: "Transfer",
    Component: RentDetailTransfer,
  },
  {
    id: 8,
    path: RENT_DETAILE_HOURLY_PAGE,
    name: "Transfer",
    Component: RentDetailHourly,
  },
  { id: 9, path: RENT_HOURLY_PAGE, name: "Hourly", Component: RentHourly },
  { id: 10, path: WISH_PAGE, name: "Wish", Component: Wish },
  { id: 11, path: FORMING_PAGE, name: "Forming", Component: Forming },
  { id: 13, path: ABOUT_COUNTRY_PAGE, name: "Country", Component: About },
  {
    id: 14,
    path: SIGHTSEEING_PAGE,
    name: "Sightseeing",
    Component: Sightseeing,
  },
  { id: 15, path: FESTIVALS_PAGE, name: "Festivale", Component: Festival },

  { id: 16, path: SALE_PAGE, name: "Sale", Component: Sale },
  { id: 17, path: SALE_HOUSES_PAGE, name: "Houses", Component: SaleHouses },
  { id: 18, path: SALE_LANDS_PAGE, name: "Lands", Component: SaleLands },
  {
    id: 19,
    path: SALE_COMERCIAL_PAGE,
    name: "Comercial",
    Component: SaleCommercial,
  },
  {
    id: 100,
    path: SALE_DETAILE_APARTMENT,
    name: "Sale Detaile",
    kindtype: "apartment",
    Component: SaleDeaile,
  },
  {
    id: 101,
    path: SALE_DETAILE_HOUSE,
    name: "Sale Detaile",
    kindtype: "house",
    Component: SaleDeaile,
  },
  {
    id: 102,
    path: SALE_DETAILE_LAND,
    name: "Sale Detaile",
    kindtype: "land",
    Component: SaleDeaile,
  },
  {
    id: 103,
    path: SALE_DETAILE_COMMERCIAL,
    name: "Sale Detaile",
    kindtype: "commercial",
    Component: SaleDeaile,
  },
  {
    id: 111,
    path: SALE_DAILY_DETAILE_APARTMENT,
    name: "Sale Daily",
    kindtype: "apartment",
    Component: SaleDailyDeaile,
  },
  {
    id: 112,
    path: SALE_DAILY_DETAILE_HOUSE,
    name: "Sale Daily",
    kindtype: "house",
    Component: SaleDailyDeaile,
  },
  {
    id: 113,
    path: SALE_DAILY_DETAILE_COMMERCIAL,
    name: "Sale Daily",
    kindtype: "commercial",
    Component: SaleDailyDeaile,
  },
  {
    id: 22,
    path: SUCCES_PAGE,
    Component: Success,
  },
  {
    id: 23,
    path: FAIL_PAGE,
    Component: Fail,
  },
  {
    id: 88,
    path: GET_PARTNER_PAGE,
    Component: Partner,
  },
  { id: 24, path: SALE_PAGE_PLUS, name: "Sale", Component: Sale },
  {
    id: 25,
    path: SALE_HOUSES_PAGE_PLUS,
    name: "Houses",
    Component: SaleHouses,
  },
  { id: 26, path: SALE_LANDS_PAGE_PLUS, name: "Lands", Component: SaleLands },

  {
    id: 27,
    path: SALE_COMERCIAL_PAGE_PLUS,
    name: "Comercial",
    Component: SaleCommercial,
  },
  {
    id: 28,
    path: DAILY_APARTMENT_PAGE_PLUS,
    name: "Daily",
    Component: DailyApartment,
  },
  {
    id: 29,
    path: DAILY_HOUSES_PAGE_PLUS,
    name: "Daily",
    Component: DailyHouses,
  },
  {
    id: 30,
    path: DAILY_COMMERCIAL_PAGE_PLUS,
    name: "Daily",
    Component: DailyCommercial,
  },
  {
    id: 56,
    path: FAST_SALE,
    Component: FastSaleBox,
  },
  {
    id: 34567890,
    path: MAP_PAGE,
    name: "map",
    Component: YerevanMap,
  },
  { id: 26, path: WAITING_PAGE, Component: Waiting },
];

export const menuPages = [
  { id: 1, path: HOME_PAGE, name: "Գլխավոր", Component: Home },
  { id: 2, path: SALE_PAGE, name: "Վաճառք", Component: Sale },
  {
    id: 3,
    path: DAILY_APARTMENT_PAGE,
    name: "Օրավարձ",
    Component: DailyApartment,
  },
  {
    id: 4,
    path: RENT_TRANSFER_PAGE,
    name: "Վարձույթ",
    Component: RentTransfer,
  },
  {
    id: 5,
    path: GET_PARTNER_PAGE,
    Comment: Partner,
    name: "Համագործակցել",
  },
];

export const rentTabs = [
  {
    id: 1,
    path: RENT_TRANSFER_PAGE,
    name: "Transfer",
    Component: RentTransfer,
  },
  { id: 2, path: RENT_HOURLY_PAGE, name: "Hourly", Component: RentHourly },
];
