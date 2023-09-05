import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { homePageReducer } from "./reducers/homePageReducer";
import { languageReducer } from "./reducers/languageReducer";
import { locationReducer } from "./reducers/locationReducer";
import { saleApartmentsReducer } from "./reducers/saleApartments";
import { saleHousesReducer } from "./reducers/saleHousesReducer";
import { saleLandsReducer } from "./reducers/saleLandsReducer";
import { saleComercialReducer } from "./reducers/saleComercialReducer";
import { botReducer } from "./reducers/botReducer";
import { DailtReducer } from "./reducers/dailyReducer";
import { mapReducer } from "./reducers/mapRducer";
import { transfersReducer } from "./reducers/transferReducer";

const rootReducer = combineReducers({
  homePageReducer,
  languageReducer,
  locationReducer,
  saleApartmentsReducer,
  saleHousesReducer,
  saleLandsReducer,
  saleComercialReducer,
  botReducer,
  DailtReducer,
  mapReducer,
  transfersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
