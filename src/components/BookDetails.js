import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './styles/BookDetails.scss';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
        const foundBook = existingBooks.find(bookItem => bookItem.id === Number(id));
        if (foundBook) setBook(foundBook);
    }, [id]);

    const writeStory = () => {
        navigate(`/write-story/${id}`);
    };

    const viewStory = () => {
        navigate(`/view-story/${id}`);
    };

    if (!book) return <p>Loading...</p>;

    return (
        <div className="book-details-page">
            <button onClick={() => navigate(-1)} className="back-button">
                &#8592;Back
            </button>
            <h1>{book.title}</h1>
            <img src={book.bookimg} alt="Book Cover" />
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <div className="btn-wrp">
                <button onClick={writeStory} className="btn write-storybtn">
                    Write Story
                </button>
                <button onClick={viewStory} className="btn view-story">
                    View Story
                </button>
            </div>

        </div>
    );
}

export default BookDetails;
