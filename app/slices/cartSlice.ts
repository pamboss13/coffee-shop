import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const cartState: CartState = {
  items: [],
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemExists = state.items.find(item => item.id === action.payload.id)
      itemExists ? itemExists.quantity++ : state.items.push({ ...action.payload, quantity: 1 })
      console.log("item added")
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, updateQuantity, toggleCart, closeCart, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
