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
      state.open = true;
      
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
    },
    addMultipleItems: (state, action) => {
      console.log(action.payload);
      state.items = [
        ...state.items,
        ...action.payload
      ]
    },
    removeItem: (state, action) => {
      const itemToRemove = action.payload;
      state.items = state.items.filter(item => {
        return item._id !== itemToRemove._id;
      });
    },
    updateItemQuantity: (state, action) => {
      const { item: updatedItem, purchaseQuantity } = action.payload;
      state.items = state.items.map(item => {
        if (updatedItem._id === item._id) {
          item.purchaseQuantity = purchaseQuantity;
        }
        return item;
      })
    },
    clearItems: state => {
      state.items = [];
    }
  },
});

export const { toggleCart, addItem, removeItem, updateItemQuantity, clearItems, addMultipleItems } = cartSlice.actions;

export const selectCart = state => state.cart;

export default cartSlice.reducer;
