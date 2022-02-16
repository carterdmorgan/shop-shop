import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux'
import { selectProducts, updateProducts } from '../../utils/slices/ProductsSlice';
import { selectCurrentCategory } from '../../utils/slices/CategorySlice';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts)

  const [oldState, oldDispatch] = useStoreContext();

  // const { currentCategory } = oldState;
  const currentCategory = useSelector(selectCurrentCategory);

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      // oldDispatch({
      //   type: UPDATE_PRODUCTS,
      //   products: data.products
      // });
      dispatch(updateProducts(data.products));

      // but let's also take each product and save it to IndexedDB using the helper function 
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        // oldDispatch({
        //   type: UPDATE_PRODUCTS,
        //   products: products
        // });
        dispatch(updateProducts(products));
      });
    }
  }, [data]);


  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2" onClick={() => dispatch(updateProducts({products: ['mario', 'geno']}))}>
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
