import React from 'react';
import { useStoreContext } from '../../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../../utils/actions';
import { idbPromise } from "../../../utils/helpers";
import { useDispatch } from 'react-redux'
import { removeItem, updateItemQuantity } from '../../../utils/slices/CartSlice';

const CartItem = ({ item }) => {
  const [, oldDispatch] = useStoreContext();
  const dispatch = useDispatch();

  const removeFromCart = item => {
    oldDispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  // const onChange = (e) => {
  //   const value = e.target.value;

  //   if (value === '0') {
  //     oldDispatch({
  //       type: REMOVE_FROM_CART,
  //       _id: item._id
  //     });

  //     idbPromise('cart', 'delete', { ...item });
  //   } else {
  //     oldDispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: item._id,
  //       purchaseQuantity: parseInt(value)
  //     });

  //     idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
  //   }
  // };

  const onChange = (e) => {
    const value = e.target.value;

    if (value === '0') {
      dispatch(removeItem(item))
    } else {
      dispatch(updateItemQuantity({
        item,
        purchaseQuantity: parseInt(value)
      }))

      oldDispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });

      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;