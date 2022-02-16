import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";
import { addItem } from '../../utils/slices/CartSlice';
import { useSelector, useDispatch } from 'react-redux'
import { selectCart } from '../../utils/slices/CartSlice';

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

  const cart = useSelector(selectCart);

  const addToCart = () => {
    const itemInCart = cart.items.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch(addItem(itemInCart));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addItem(item));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

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
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
