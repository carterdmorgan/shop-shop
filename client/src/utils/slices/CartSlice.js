import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    open: false,
    items: []
  },
  reducers: {
    toggleCart: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.open = !state.open;
    },
    addItem: (state, action) => {
      const itemToAdd = action.payload;
      const itemInCart = state.items.find((item) => item._id === action.payload._id)
      if (itemInCart) {
        state.items = state.items.map(item => {
          if (itemToAdd._id === item._id) {
            item.purchaseQuantity = item.purchaseQuantity + 1;
          }
          return item;
        })
      } else {
        state.items.push({
          ...itemToAdd,
          purchaseQuantity: 1
        });
      }
    }
  },
});

export const { toggleCart, addItem } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const cartOpen = state => state.cart.cartOpen;

export default cartSlice.reducer;
