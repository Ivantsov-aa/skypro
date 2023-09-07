import { configureStore } from "@reduxjs/toolkit";
import shoppingBasketReducer from "./slices/shoppingBasketSlice";

const store = configureStore({
  reducer: {
    shoppingBasket: shoppingBasketReducer,
  },
});

export default store;
