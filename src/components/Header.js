import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CartModal from './CartModal';
import './styles/Header.scss';

function Header() {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const toggleCartModal = () => {
    setCartVisible(!cartVisible);
  };
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <h1>Book Management System</h1>
      <nav>
        <ul className="navbar">
          <li className={isActive("/")}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActive("/cart")}>
            <Link to="/cart">Cart</Link>
          </li>
          <li className={isActive("/add-book")}>
            <Link to="/add-book">Add Book</Link>
          </li>
        </ul>
      </nav>
      <div className="header-icons">
        <div className="cart-icon" onClick={toggleCartModal}>
          <span className="cart-bell">&#x1F514;</span>
          <span className="cart-count">{cart.length}</span>
        </div>
        <Link to="/purchase-history" className="history-icon">
          <span className="history-bell">&#x1F4C6;</span>
        </Link>
      </div>
      {cartVisible && <CartModal cart={cart} closeCart={toggleCartModal} />}
    </header>
  );
}

export default Header;
