import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/Book.scss';
import LikeButton from "./LikeButton";
import AddBook from "./AddBook";

function Book({ book }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(null);

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

  const handleSaveEdit = (updatedBook) => {
    setIsEditing(false);
    console.log("Updated Book:", updatedBook);

    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = existingBooks.map(bookItem =>
      bookItem.id === updatedBook.id ? updatedBook : bookItem
    );

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    console.log("Books after update:", updatedBooks);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedBook(book); 
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

      <Link
        to={`/editbook/${book.id}`}
        onClick={startEditing}
        className="edit-icon icon-pencil"
      >
        &#9999;
      </Link>

      {isEditing && editedBook && (
        <AddBook 
          bookDetails={editedBook} 
          onSave={handleSaveEdit} 
        />
      )}
    </div>
  );
}

export default Book;
