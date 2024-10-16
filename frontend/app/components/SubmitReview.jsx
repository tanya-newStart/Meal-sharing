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
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SubmitReview = ({ mealId, onSubmit, isModalOpen, onClose }) => {
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
        onClose();
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
    <>
      <Modal
        open={isModalOpen}
        onClose={onClose}
        aria-labelledby="submit-review-modal"
        aria-describedby="modal-to-submit-meal-review"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "90%",
            maxHeight: "90%",
            overflow: "auto",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
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
      </Modal>
    </>
  );
};

export default SubmitReview;
