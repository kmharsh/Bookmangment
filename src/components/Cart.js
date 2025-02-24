
import './styles/Cart.scss';
import React, { useState, useEffect } from "react";


function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const handlePurchase = () => {
    localStorage.removeItem("cart");
    setCart([]);
    alert("Purchase successful!");
  };

 

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((book, index) => (
            <li key={index}>
              {book.title} - ${book.price}
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && <button onClick={handlePurchase}>Make Purchase</button>}
    </div>
  );
}

export default Cart;
