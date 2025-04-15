// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import BookList from "./BookList";
// import Cart from "./Cart";
// import PurchaseHistory from "./PurchaseHistory";
// import BookDetails from "./BookDetails";
// import WriteStory from "./WriteStory";
// import ViewStory from "./ViewStory";
// import Header from "./Header";
// import AddBook from "./AddBook";
// import Register from "./registion";
// import Login from "./Login";

// function MainComponent() {
//   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     localStorage.setItem("isAuthenticated", "true");
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//   };

//   return (
//     <Router>
//       <div className="App">
//         {isAuthenticated && <Header onLogout={handleLogout} />}
//         <Routes>
//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<BookList />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/purchase-history" element={<PurchaseHistory />} />
//               <Route path="/add-book" element={<AddBook />} />
//               <Route path="/editbook/:id" element={<AddBook />} />
//               <Route path="/bookdetails/:id" element={<BookDetails />} />
//               <Route path="/write-story/:id" element={<WriteStory />} />
//               <Route path="/view-story/:id" element={<ViewStory />} />
//             </>
//           ) : (
//             <>
//               <Route path="/register" element={<Register />} />
//               <Route path="/login" element={<Login onLogin={handleLogin} />} />
//               <Route path="*" element={<Navigate to="/login" />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default MainComponent;
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
import PrivateRoute from "./PrivateRoute"; // <- Import this

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
     <Header onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<BookList />} />
          <Route path="/bookdetails/:id" element={<BookDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase-history"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PurchaseHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AddBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/editbook/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AddBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/write-story/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <WriteStory />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-story/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ViewStory />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainComponent;
