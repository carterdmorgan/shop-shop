import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'category',
  initialState: {
    currentCategory: '',
    categories: []
  },
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    }
  },
});

export const { updateCategories, updateCurrentCategory } = slice.actions;

export const selectCurrentCategory = state => state.category.currentCategory;
export const selectCategories = state => state.category.categories;

export default slice.reducer;
