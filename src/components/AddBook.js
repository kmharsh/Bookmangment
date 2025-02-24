import React, { useState } from "react";
import "./styles/from.scss";

function AddBook() {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    price: "",
  });

  const formFields = [
    { name: "title", placeholder: "Title", type: "text" },
    { name: "author", placeholder: "Author", type: "text" },
    { name: "price", placeholder: "Price", type: "number", step: "0.01" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof localStorage === "undefined") {
      console.log("localStorage is not available");
      return;
    }

    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    const newId = existingBooks.length;

    const bookWithId = {
      ...bookDetails,
      id: newId,
      price: parseFloat(bookDetails.price) || 0,
    };

    existingBooks.push(bookWithId);
    localStorage.setItem("books", JSON.stringify(existingBooks));

    console.log("Book added:", bookWithId);
    console.log("Books in localStorage:", existingBooks);

    setBookDetails({
      title: "",
      author: "",
      price: "",
    });
  };

  return (
    <div className="add-book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div className="form-group" key={field.name}>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={bookDetails[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={bookDetails[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                step={field.step}
                required
              />
            )}
    </div>
        ))}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
