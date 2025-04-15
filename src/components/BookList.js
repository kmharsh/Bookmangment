import React, { useState, useEffect } from "react";
import './styles/Booklist.scss';
import Book from "./Book";

function BookList() {
  const initialBooks = [
    { id: 1, title: "Book One", author: "Author One", price: 15.99, bookimg: "https://picsum.photos/200/300" },
    { id: 2, title: "Book Two", author: "Author Two", price: 20.99, bookimg: "https://picsum.photos/200/300" },
    { id: 3, title: "Book Three", author: "Author Three", price: 10.99, bookimg: "https://picsum.photos/200/300" }
  ];

  const [books, setBooks] = useState(initialBooks);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [localdata, setLocaldata] = useState(JSON.parse(localStorage.getItem("books")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("books")) {
      localStorage.setItem("books", JSON.stringify(initialBooks));
    }
    setLocaldata(JSON.parse(localStorage.getItem("books")));
  }, []);

  useEffect(() => {
    if (localdata.length > 0) {
      localdata.forEach(book => {
        console.log(book.bookimg, "imgbook");
      });
    }
  }, [localdata]);

  const addToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = localdata.filter(book =>
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const dataToDisplay = filteredBooks.length > 0 ? filteredBooks : localdata;

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* 📚 Book List */}
      <div className="d-flex">
        {dataToDisplay.map((book, index) => (
          <Book key={index} book={book} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default BookList;
