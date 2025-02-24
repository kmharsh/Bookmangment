import React, { useState, useEffect } from "react";
import './styles/LikeButton.scss';

function LikeButton({ bookId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedBooks = JSON.parse(localStorage.getItem("likedBooks")) || [];
    setLiked(likedBooks.includes(bookId));
  }, [bookId]);

  const handleLike = () => {
    const likedBooks = JSON.parse(localStorage.getItem("likedBooks")) || [];
    if (liked) {
      const updatedLikedBooks = likedBooks.filter((id) => id !== bookId);
      localStorage.setItem("likedBooks", JSON.stringify(updatedLikedBooks));
    } else {
      likedBooks.push(bookId);
      localStorage.setItem("likedBooks", JSON.stringify(likedBooks));
    }
    setLiked(!liked);
  };

  return (
    <span onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
      <span className="heart-icon">{liked ? '❤️' : '🤍'}</span>
    </span>
  );
}

export default LikeButton;
