import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./BookList";
import Cart from "./Cart";
import PurchaseHistory from "./PurchaseHistory";
import BookDetails from "./BookDetails";
import WriteStory from "./WriteStory";
import ViewStory from "./ViewStory";
import Header from "./Header";
import AddBook from "./AddBook";

function ManinComponent() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BookList/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/purchase-history" element={<PurchaseHistory/>} />
          <Route path="/add-book" element={<AddBook/>}/>
          <Route path="/editbook/:id" element={<AddBook/>} />
          <Route path="/bookdetails/:id" element={<BookDetails />} />
          <Route path="/write-story/:id" element={<WriteStory />} />
          <Route path="/view-story/:id" element={<ViewStory />} />
          <Route path="/purchase-history" component={<PurchaseHistory/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default ManinComponent;
