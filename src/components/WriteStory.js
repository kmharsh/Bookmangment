import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './styles/Writestory.scss';
function WriteStory() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [story, setStory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
        const foundBook = existingBooks.find(bookItem => bookItem.id === Number(id));
        if (foundBook) setBook(foundBook);

        const existingStories = JSON.parse(localStorage.getItem("bookStories")) || [];
        const foundStory = existingStories.find(storyItem => storyItem.bookId === Number(id));
        if (foundStory) setStory(foundStory.story);
    }, [id]);

    const handleStoryChange = (e) => setStory(e.target.value);

    const saveStory = () => {
        const existingStories = JSON.parse(localStorage.getItem("bookStories")) || [];
        const updatedStories = existingStories.filter(storyItem => storyItem.bookId !== Number(id));
        updatedStories.push({ bookId: Number(id), story });

        localStorage.setItem("bookStories", JSON.stringify(updatedStories));
        navigate(`/bookdetails/${id}`);
    };

    if (!book) return <p>Loading...</p>;

    return (
        <div className="write-story">
            <button onClick={() => navigate(-1)} className="back-button">
                &#8592;Back
            </button>
            <h1>Write a Story for "{book.title}"</h1>
            <textarea
                value={story}
                onChange={handleStoryChange}
                placeholder="Write your story here..."
                rows="10"
                cols="50"
            />
            <button onClick={saveStory} className="btn save-story">
                Save Story
            </button>
        </div>
    );
}

export default WriteStory;
