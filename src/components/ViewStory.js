import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './styles/ViewStory.scss';

function ViewStory() {
    const { id } = useParams(); 
    const [book, setBook] = useState(null);  
    const [story, setStory] = useState(null); 
    const navigate = useNavigate(); 
    useEffect(() => {
        const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
        const foundBook = existingBooks.find(bookItem => bookItem.id === Number(id)); 
        setBook(foundBook); 

        const bookStories = JSON.parse(localStorage.getItem("bookStories")) || [];
        const foundStory = bookStories.find(story => story.bookId === Number(id));
        setStory(foundStory); 
    }, [id]);

    if (!book || !story) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="view-story-page">
            <button onClick={() => navigate(-1)} className="back-button">
                &#8592;Back
            </button>
            <h1>{book.title} - Story</h1>
            <img src={book.bookimg} alt="Book Cover" />
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <div className="story-content">
                <p>{story.story}</p> 
            </div>
        </div>
    );
}

export default ViewStory;
