"use client";
import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Alert } from "@mui/material";
import Form from "../../components/Form";

const SingleMeal = ({ params }) => {
  const { id } = params;

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } finally {
        setLoading(false);
      }
    };
    fetchedMeal();
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

  return (
    <>
      <Box>
        <Typography variant="h4">{meal.title}</Typography>
        <Typography variant="body1">{meal.description}</Typography>
        <Typography variant="subtitle1">Price: ${meal.price}</Typography>
        <Box
          component="img"
          src={`/images/${meal.image_url}`}
          alt=""
          sx={{ width: "50%", height: "auto", mt: 2 }}
        />
      </Box>
      <Form></Form>
    </>
  );
};
export default SingleMeal;
