import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/Book.scss';
import LikeButton from "./LikeButton";
import AddBook from "./AddBook";

function Book({ book }) {
  console.log(book.bookimg, "img");

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const navigate = useNavigate();

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

  const startDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(book.id);
    }
  };

  const deleteBook = (id) => {
    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = existingBooks.filter(bookItem => bookItem.id !== id);

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    console.log("Books after deletion:", updatedBooks);
    window.location.reload();
  };

  return (
    <>
      <div className="book-card">
      <div className="action-icons">
          <Link to={`/editbook/${book.id}`} onClick={startEditing} className="edit-icon">
            &#9999;
          </Link>
          <Link onClick={startDelete} className="delete-icon">
            &#x2421;
          </Link>
        </div>

        <div className="book-image">
          <img src={book.bookimg} alt="Book Cover" />
        </div>
        

        <div className="book-details">

          <LikeButton bookId={book.id} />

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

          <button onClick={() => addToCart(book)} className="btn add-to-cart">
            Add to Cart
          </button>



        </div>


        {isEditing && editedBook && (
          <AddBook bookDetails={editedBook} onSave={handleSaveEdit} />
        )}
      </div>
    </>


  );
}

export default Book;
