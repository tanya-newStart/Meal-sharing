"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Meal from "./Meal";

function MealsList({ limit }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/all-meals`
        );
        setMeals(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  const displayedMeals = limit ? meals.slice(0, limit) : meals;

  return (
    <Container>
      {displayedMeals.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-around",
          }}
        >
          {displayedMeals.map((meal) => (
            <Box sx={{ width: "400px" }} key={meal.id}>
              <Meal {...meal} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No meals available</Typography>
      )}
    </Container>
  );
}

export default MealsList;
