"use client";
import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Alert, Stack } from "@mui/material";
import ReserveMeal from "../../components/ReserveMeal";

const SingleMeal = ({ params }) => {
  const { id } = params;

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(0);
  const [submitted,setSubmitted]=useState(false);

  useEffect(() => {
    const fetchedMeal = async () => {
      try {
        setLoading(true);
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

    fetchedMeal();
    fetchAvailableSpots();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
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
    <Box sx={{ my: 4,px:2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" gutterBottom>{meal.title}</Typography>
          <Typography variant="body1" sx={{mb:2}}>{meal.description}</Typography>
          <Typography variant="subtitle1" sx={{fontWeight:"bold"}}>Price: ${meal.price}</Typography>
       
        <Box
          component="img"
          src={`/images/${meal.image_url}`}
          alt=""
          sx={{ width: { xs: "100%", md: "50%" }, height: "auto", borderRadius: 2, boxShadow: 2 }}
        />
      </Box>
      <Box sx={{mt: {xs:4,md:0}, maxWidth:"400px" }}>
        {availableSpots > 0||submitted ? (
          <ReserveMeal mealId={id} availableSpots={availableSpots} setAvailableSpots={setAvailableSpots} setSubmitted={setSubmitted}></ReserveMeal>
        ) : (
          <Alert severity="warning">
            Sorry, this meal is fully booked. No reservations are available.
          </Alert>
        )}
      </Box>
      </Stack>
    </Box>
  );
};
export default SingleMeal;
