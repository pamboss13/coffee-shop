import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  [key: string]: unknown;
}

interface CartState {
  items: CartItem[];
}

const cartState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
});

export const {addItem, removeItem} = cartSlice.actions;

export default cartSlice.reducer;