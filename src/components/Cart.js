import './styles/Cart.scss';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
  });

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const navigate = useNavigate();
  const handlePurchase = () => {
    // Calculate total amount
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Store purchase history in localStorage
    localStorage.setItem("purchaseHistory", JSON.stringify({ cart, totalAmount }));

    // Clear the cart
    localStorage.removeItem("cart");
    setCart([]);

    // Navigate to the purchase history page
    navigate('/purchase-history');
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>${book.price}</td>
                <td>{book.quantity}</td>
                <td>
                  <div className="quantity-wrp">
                    <span onClick={() => incrementQuantity(index)}>+</span>
                    <span onClick={() => decrementQuantity(index)}>-</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && <button onClick={handlePurchase}>Make Purchase</button>}
    </div>
  );
}

export default Cart;
