"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import Meal from "./Meal";
import Slider from "react-slick";

function MealsList({ limit }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let sliderRef = useRef(null);

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

  function PreviousNextMethods() {
    const next = () => {
      sliderRef.slickNext();
    };
    const previous = () => {
      sliderRef.slickPrev();
    };
    return { next, previous };
  }

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
          slidesToShow: 1,
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
    <Container
      maxWidth="md"
      sx={{ position: "relative", paddingBottom: "40px" }}
    >
      {displayedMeals.length > 0 ? (
        <Box sx={{ position: "relative", overflow: "visible" }}>
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...sliderSettings}
          >
            {displayedMeals.map((meal) => (
              <Box sx={{ padding: 2 }} key={meal.id}>
                <Meal {...meal} />
              </Box>
            ))}
          </Slider>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "-110px",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <Button
              sx={{ minWidth: "100px", padding: "8px 16px" }}
              onClick={PreviousNextMethods().previous}
            >
              Previous
            </Button>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: "-80px",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <Button
              sx={{ minWidth: "100px", padding: "8px 16px" }}
              onClick={PreviousNextMethods().next}
            >
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">No meals available</Typography>
      )}
    </Container>
  );
}

export default MealsList;
