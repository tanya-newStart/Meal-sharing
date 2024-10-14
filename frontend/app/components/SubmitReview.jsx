"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Rating,
  Stack,
} from "@mui/material";

const SubmitReview = ({ mealId, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || stars === 0) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, stars, meal_id: mealId }),
        }
      );
      if (response.ok) {
        const newReview = await response.json();
        onSubmit({
          title,
          description,
          stars,
        });

        setSuccess(true);
        setTitle("");
        setDescription("");
        setStars(0);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Submit a Review
      </Typography>
      {success && (
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Review submitted successfully
        </Alert>
      )}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
          />
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={stars}
            onChange={(event, newValue) => setStars(newValue)}
          />
          <Button type="submit" variant="contained">
            Submit Review
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitReview;
