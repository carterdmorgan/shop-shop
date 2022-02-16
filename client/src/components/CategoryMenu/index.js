import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux'
import { updateCategories, updateCurrentCategory, selectCategories } from '../../utils/slices/CategorySlice';

function CategoryMenu() {
  const dispatch = useDispatch();
  const [oldState, oldDispatch] = useStoreContext();

  // const { categories } = oldState;
  const categories = useSelector(selectCategories);


  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      // oldDispatch({
      //   type: UPDATE_CATEGORIES,
      //   categories: categoryData.categories
      // });
      dispatch(updateCategories(categoryData.categories));
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(updateCategories(categories));
        // oldDispatch({
        //   type: UPDATE_CATEGORIES,
        //   categories: categories
        // });
      });
    }
  }, [categoryData, loading, oldDispatch]);

  const handleClick = id => {
    // oldDispatch({
    //   type: UPDATE_CURRENT_CATEGORY,
    //   currentCategory: id
    // });
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
