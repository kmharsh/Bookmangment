import React from "react";
import './styles/cartModal.scss';

function CartModal({ cart, closeCart }) {
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);
  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <button className="close-btn" onClick={closeCart}>Close</button>
        <h3>Your Cart</h3>
        <ul>
          {cart.length === 0 ? (
            <li>Your cart is empty.</li>
          ) : (
            cart.map((item, index) => (
              <li key={index}>
                {item.title} - ${item.price}
              </li>
            ))
          )}
        </ul>
        {cart.length > 0 && (
          <div className="cart-total">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
