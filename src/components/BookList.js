import React, { useState, useEffect } from "react";
import Book from "./Book";

function BookList() {
   const initialBooks = [
   { id: 1, title: "Book One", author: "Author One", price: 15.99 },
    { id: 2, title: "Book Two", author: "Author Two", price: 20.99 },
    { id: 3, title: "Book Three", author: "Author Three", price: 10.99 }
  ];

 const [books, setBooks] = useState(initialBooks);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [localdata, setLocaldata] = useState(JSON.parse(localStorage.getItem("books")) || []);


  const addToCart = (book) => {
    alert("book",book)
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    if (!localStorage.getItem("books")) {
      localStorage.setItem("books", JSON.stringify(initialBooks));
    }
    setLocaldata(JSON.parse(localStorage.getItem("books")));
  }, []);


  const data = localdata.length > 0 ? localdata : books;

  return (
    <div>
      <div className="d-flex">
        {data.map((book, index) => (
          <Book key={index} book={book} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default BookList;
