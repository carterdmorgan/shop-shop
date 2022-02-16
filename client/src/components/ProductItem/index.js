import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useDispatch } from 'react-redux'
import { addItem } from '../../utils/slices/CartSlice';

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const dispatch = useDispatch();

  // const [oldState, oldDispatch] = useStoreContext();

  // const { cart } = oldState;

  // const addToCart = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === _id)
  //   if (itemInCart) {
  //     oldDispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //     idbPromise('cart', 'put', {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //   } else {
  //     oldDispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 }
  //     });
  //     idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  //   }
  // }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={() => dispatch(addItem(item))}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
