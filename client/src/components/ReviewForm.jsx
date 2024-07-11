import React, { useState } from 'react';
import { TextField, Button, Typography, Rating } from '@material-ui/core';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';

function ReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_ENDPOINTS.ADD_REVIEW}/${productId}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onReviewAdded();
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to add review:', error);
      setError('Failed to add review. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <TextField
        label="Review"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </form>
  );
}

export default ReviewForm;