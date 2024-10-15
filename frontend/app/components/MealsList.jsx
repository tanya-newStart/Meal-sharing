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
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Meal from "./Meal";
import SearchMeal from "./SearchMeal";
import Slider from "react-slick";

function MealsList({ limit, layout, sortKey, sortDir }) {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let sliderRef = useRef(null);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/meals?sortKey=${sortKey}&sortDir=${sortDir}`
      );
      setMeals(response.data.data);
      setFilteredMeals(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [sortKey, sortDir]);

  const handleFilteredMealsChange = (newFilteredMeals) => {
    setFilteredMeals(newFilteredMeals);
  };
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  const displayedMeals = limit ? filteredMeals.slice(0, limit) : filteredMeals;

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

  return layout === "slider" ? (
    <Container
      maxWidth="md"
      sx={{ position: "relative", paddingBottom: "60px" }}
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
              <Box key={meal.id}>
                <Meal {...meal} />
              </Box>
            ))}
          </Slider>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "-10px",
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
              right: "-10px",
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
  ) : (
    <Container maxWidth="lg">
      <SearchMeal
        onFilteredMealsChange={handleFilteredMealsChange}
        meals={meals}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 3,
          padding: 4,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {displayedMeals.map((meal) => (
          <Box key={meal.id} sx={{ display: "flex", justifyContent: "center" }}>
            <Meal {...meal} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default MealsList;
