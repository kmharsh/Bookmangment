import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartModal from './CartModal';
import './styles/Header.scss';

function Header() {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleCartModal = () => {
    setCartVisible(!cartVisible);
  };

  const toggleProfilePopup = () => {
    setProfileVisible(!profileVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
        
        
        <div className="profile-icon" onClick={toggleProfilePopup}>
          <span className="profile-photo">&#x1F466;</span>
        </div>
      </div>

      {profileVisible && user && (
        <div className="profile-popup">
          <p>{user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {cartVisible && <CartModal cart={cart} closeCart={toggleCartModal} />}
    </header>
  );
}

export default Header;
