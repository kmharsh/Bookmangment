
import './styles/Cart.scss';
import React, { useState, useEffect } from "react";

function BellIcon({ count }) {
  return (
    <div className="bell-icon">
      <span>🔔</span>
      {count > 0 && <span className="cart-count">{count}</span>}
    </div>
  );
}

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [cartCount, setCartCount] = useState(cart.length);  

  useEffect(() => {
  
    setCartCount(cart.length);
  }, [cart]);  

  const handlePurchase = () => {
    localStorage.removeItem("cart");
    setCart([]);
    alert("Purchase successful!");
  };

  const handleAddToCart = (book) => {
    const newCart = [...cart, book];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));  
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <BellIcon count={cartCount} />  

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

   
      <button onClick={() => handleAddToCart({ title: "Sample Book", price: 20 })}>
        Add Sample Book to Cart
      </button>
    </div>
  );
}

export default Cart;
