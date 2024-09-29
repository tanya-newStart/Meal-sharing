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
import Slider from "react-slick";

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      {displayedMeals.length > 0 ? (
        <Slider {...sliderSettings}>
          {displayedMeals.map((meal) => (
            <Box sx={{ padding: 2 }} key={meal.id}>
              <Meal {...meal} />
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1">No meals available</Typography>
      )}
    </Container>
  );
}

export default MealsList;
