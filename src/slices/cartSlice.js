import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.products.push({ quantity: 1, ...action.payload });
      }
    },

    increaseQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload
      );
      existingProduct.quantity++;
    },

    decreaseQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload
      );

      if (existingProduct.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct.quantity--;
      }
    },

    removeFromCart: (state, action) => {
      const existingProduct = state.products.filter(
        (product) => product.id !== action.payload
      );

      state.products = existingProduct;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export const selectProducts = (state) => state.cart.products;

export default cartSlice.reducer;
