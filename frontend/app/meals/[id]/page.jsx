"use client";
import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Alert } from "@mui/material";
import Form from "../../components/Form";

const SingleMeal = ({ params }) => {
  const { id } = params;

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(0);

  useEffect(() => {
    const fetchedMeal = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`
        );
        console.log(response.status);

        if (response.ok) {
          const data = await response.json();
          setMeal(data);
        } else {
          throw new Error("Failed to fetch meal");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchAvailableSpots = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations/availability/${id}`
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
    fetchedMeal();
    fetchAvailableSpots();
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
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
    <Box>
      <Box display="flex" alignItems="flex-start" sx={{ mt: 2 }}>
        <Box sx={{ width: { xs: "100%", sm: "50%" }, mr: { sm: 2 } }}>
          <Typography variant="h4">{meal.title}</Typography>
          <Typography variant="body1">{meal.description}</Typography>
          <Typography variant="subtitle1">Price: ${meal.price}</Typography>
        </Box>
        <Box
          component="img"
          src={`/images/${meal.image_url}`}
          alt=""
          sx={{ width: "30%", height: "auto", mt: 2 }}
        />
      </Box>
      <Box sx={{ width: { xs: "100%", sm: "35%" } }}>
        {availableSpots > 0 ? (
          <Form mealId={id}></Form>
        ) : (
          <Alert severity="warning">
            Sorry, this meal is fully booked. No reservations are available.
          </Alert>
        )}
      </Box>
    </Box>
  );
};
export default SingleMeal;
