import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'products',
  // initialState: {
  //   test: 'test'
  // },
  initialState: [],
  reducers: {
    updateProducts: (state, action) => action.payload
  },
});

export const { updateProducts } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProducts = state => state.products;

export default slice.reducer;
