import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/CartSlice';
import productsReducer from './slices/ProductsSlice';
import categoryReducer from './slices/CategorySlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    category: categoryReducer
  },
})