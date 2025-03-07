import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/from.scss";

function AddBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    price: "",
    bookimg: "", 
  });

  useEffect(() => {
    if (id) {
      const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
      const bookToEdit = existingBooks.find(book => book.id === parseInt(id));
      if (bookToEdit) {
        setBookForm({
          title: bookToEdit.title,
          author: bookToEdit.author,
          price: bookToEdit.price,
          bookimg: bookToEdit.bookimg || "", 
        });
      }
    }
  }, [id]);

  const formFields = [
    { name: "title", placeholder: "Title", type: "text" },
    { name: "author", placeholder: "Author", type: "text" },
    { name: "price", placeholder: "Price", type: "number", step: "0.01" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookForm({
      ...bookForm,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookForm({
          ...bookForm,
          bookimg: reader.result, 
        });
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      ...bookForm,
      price: parseFloat(bookForm.price) || 0,
    };

    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];

    if (id) {
      const updatedBooks = existingBooks.map((book) =>
        book.id === parseInt(id) ? { ...book, ...updatedBook } : book
      );
      localStorage.setItem("books", JSON.stringify(updatedBooks));
    } else {
      const newId = existingBooks.length > 0 
        ? Math.max(...existingBooks.map(book => book.id)) + 1
        : 0;

      const newBook = {
        ...updatedBook,
        id: newId,
      };

      existingBooks.push(newBook);
      localStorage.setItem("books", JSON.stringify(existingBooks));
    }

    navigate("/");
  };

  return (
    <div className="add-book-form">
      <h2>{id ? "Edit Book" : "Add a New Book"}</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div className="form-group" key={field.name}>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={bookForm[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              step={field.step}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <input
            type="file"
            id="image"
            name="bookimg"
            onChange={handleImageChange}
          />
          {bookForm.bookimg && (
            <div className="image-preview">
              <img
                src={bookForm.bookimg} 
                alt="Uploaded preview"
               
              />
            </div>
          )}
        </div>
        <button type="submit">{id ? "Save Changes" : "Add Book"}</button>
      </form>
    </div>
  );
}

export default AddBook;
