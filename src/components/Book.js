import React, { useState, useEffect } from "react";
import './styles/Book.scss';
import LikeButton from "./LikeButton";

function Book({ book }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const bookAlreadyInCart = savedCart.some(item => item.id === book.id);

    if (!bookAlreadyInCart) {
      const updatedCart = [...savedCart, book];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log(updatedCart, "updatedCart");
    } else {
      alert("This book is already in your cart!");
    }
  };

  return (
    <div className="bookcart">
      <LikeButton bookId={book.id} />
      <div className="book">
        <table>
          <tbody>
            <tr>
              <td><h3>Book Name:</h3></td>
              <td><span>{book.title}</span></td>
            </tr>
            <tr>
              <td><h3>Author:</h3></td>
              <td><span>{book.author}</span></td>
            </tr>
            <tr>
              <td><h3>Price:</h3></td>
              <td><span>${book.price}</span></td>
            </tr>
          </tbody>
        </table>
        <span 
          onClick={() => addToCart(book)} 
          className="btn btn-2 btn-sep icon-cart"
        >
          Add to Cart
        </span>
      </div>
    </div>
  );
}

export default Book;
