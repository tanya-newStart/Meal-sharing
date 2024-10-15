"use client";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Alert,
  Stack,
  Button,
  Collapse,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Meal from "@/app/components/Meal";
import ReserveMeal from "../../components/ReserveMeal";
import SubmitReview from "../../components/SubmitReview";
import CustomMealButton from "@/app/components/CustomMealButton";

const SingleMeal = ({ params }) => {
  const { id } = params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  useEffect(() => {
    const fetchedMeal = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          setMeal(data);
        } else {
          throw new Error("Failed to fetch meal");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailableSpots = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/meal/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAvailableSpots(data.available_spots);
        } else {
          throw new Error("Failed to fetch available spots");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/meal/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          throw new Error("Failed to fetch reviews");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchedMeal();
    fetchAvailableSpots();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = (newReview) => {
    console.log("New review:", newReview);
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const handleReserve = () => {
    setIsReserveModalOpen(true);
  };

  const handleCloseReserveModal = () => {
    setIsReserveModalOpen(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box mt={2} display="flex" justifyContent="center">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  if (!meal) {
    return (
      <Box mt={2} display="flex" justifyContent="center">
        <Alert severity="warning">Meal not found</Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ my: 4, px: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Box sx={{ flex: 2 }}>
          <Meal
            {...meal}
            customButton={
              <CustomMealButton
                mealId={id}
                availableSpots={availableSpots}
                onReserve={handleReserve}
              />
            }
            showSavorDetailsLink={false}
          />
          <Box sx={{ mt: 2 }}>
            {reviews.length > 0 ? (
              <Box sx={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}>
                <Typography variant="subtitle1">{reviews[0].title}</Typography>
                <Typography variant="body2">
                  {reviews[0].description}
                </Typography>
                <Rating
                  name="read-only"
                  value={reviews[0].stars}
                  readOnly
                ></Rating>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No reviews yet.
              </Typography>
            )}
          </Box>
          {reviews.length > 1 && (
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setShowReviews(!showReviews)}
                sx={{ mt: 1 }}
              >
                {showReviews ? "Hide" : "Show"} {reviews.length - 1} more
                reviews
              </Button>
              <Collapse in={showReviews}>
                <Box sx={{ mt: 2 }}>
                  {reviews.slice(1).map((review) => (
                    <Box
                      key={review.id}
                      sx={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}
                    >
                      <Typography variant="subtitle1">
                        {review.title}
                      </Typography>
                      <Typography variant="body2">
                        {review.description}
                      </Typography>
                      <Rating
                        name="read-only"
                        value={review.stars}
                        readOnly
                      ></Rating>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </>
          )}
        </Box>
        <Box sx={{ mt: { xs: 4, md: 0 }, maxWidth: "400px" }}>
          {availableSpots > 0 || submitted ? (
            <ReserveMeal
              mealId={id}
              availableSpots={availableSpots}
              setAvailableSpots={setAvailableSpots}
              setSubmitted={setSubmitted}
              open={isReserveModalOpen}
              onClose={handleCloseReserveModal}
            ></ReserveMeal>
          ) : (
            <Alert severity="warning">Sorry, this meal is fully booked.</Alert>
          )}
        </Box>
        <Box sx={{ mt: { xs: 4, md: 0 }, maxWidth: "400px" }}>
          <SubmitReview
            mealId={id}
            onSubmit={handleReviewSubmit}
          ></SubmitReview>
        </Box>
      </Stack>
    </Box>
  );
};
export default SingleMeal;
