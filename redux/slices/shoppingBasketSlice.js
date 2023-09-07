import { createSlice } from "@reduxjs/toolkit";

const minCount = 1;
const maxCount = 10;

const shoppingBasketSlice = createSlice({
  name: "shoppingBasket",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart(state, action) {
      let products = [];
      if (state.products.find((product) => product.id === action.payload.id)) {
        products = state.products.map((product) => {
          return product.id === action.payload.id
            ? {
                ...product,
                count:
                  product.count < maxCount ? product.count + 1 : product.count,
              }
            : product;
        });
      } else {
        products = [...state.products, { ...action.payload, count: 1 }];
      }

      state.products = products;
      localStorage.setItem("products", JSON.stringify(products));
    },
    removeFromCart(state, action) {
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.products = filteredProducts;
      localStorage.setItem("products", JSON.stringify(filteredProducts));
    },
    clearBasket(state) {
      state.products = [];
      localStorage.setItem("products", JSON.stringify([]));
    },
    incrementCount(state, action) {
      let products = state.products.map((product) => {
        return product.id === action.payload.id
          ? {
              ...product,
              count:
                product.count < maxCount ? product.count + 1 : product.count,
            }
          : product;
      });

      state.products = products;
      localStorage.setItem("products", JSON.stringify(products));
    },
    decrementCount(state, action) {
      let products = state.products.map((product) => {
        return product.id === action.payload.id
          ? {
              ...product,
              count:
                product.count > minCount ? product.count - 1 : product.count,
            }
          : product;
      });

      state.products = products;
      localStorage.setItem("products", JSON.stringify(products));
    },
    restoreProducts(state) {
      state.products = JSON.parse(localStorage.getItem("products")) || [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearBasket,
  incrementCount,
  decrementCount,
  restoreProducts
} = shoppingBasketSlice.actions;
export default shoppingBasketSlice.reducer;
