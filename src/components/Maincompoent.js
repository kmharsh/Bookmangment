import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BookList from "./BookList";
import Cart from "./Cart";
import PurchaseHistory from "./PurchaseHistory";
import BookDetails from "./BookDetails";
import WriteStory from "./WriteStory";
import ViewStory from "./ViewStory";
import Header from "./Header";
import AddBook from "./AddBook";
import Register from "./registion";
import Login from "./Login";

function MainComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<BookList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/editbook/:id" element={<AddBook />} />
              <Route path="/bookdetails/:id" element={<BookDetails />} />
              <Route path="/write-story/:id" element={<WriteStory />} />
              <Route path="/view-story/:id" element={<ViewStory />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default MainComponent;
