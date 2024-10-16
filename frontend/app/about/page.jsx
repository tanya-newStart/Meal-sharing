"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RecyclingIcon from "@mui/icons-material/Recycling";

const AboutUs = () => {
  return (
    <Box sx={{ py: 6, px: 2, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                letterSpacing: 1.2,
                mb: 1,
              }}
            >
              Welcome to MealHub
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "text.secondary", maxWidth: "800px", mx: "auto" }}
            >
              Discover the joy of shared meals, quality ingredients, and a
              sustainable community—all in one place.
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
              To foster a community where food lovers come together to share
              their passion, promote sustainability, and enjoy the art of
              cooking.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
                mb: 3,
              }}
            >
              Our Core Values
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ flexWrap: "wrap" }}
            >
              {[
                {
                  icon: <RestaurantIcon fontSize="large" />,
                  title: "Quality",
                  description:
                    "We prioritize fresh ingredients and top-notch meals for every dining experience.",
                },
                {
                  icon: <PeopleIcon fontSize="large" />,
                  title: "Community",
                  description:
                    "Bringing people together through shared meals and connections.",
                },
                {
                  icon: <LightbulbIcon fontSize="large" />,
                  title: "Innovation",
                  description:
                    "Encouraging creativity and innovation in the kitchen.",
                },
                {
                  icon: <RecyclingIcon fontSize="large" />,
                  title: "Sustainability",
                  description:
                    "Committed to reducing food waste and promoting eco-friendly practices.",
                },
              ].map((value, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    p: 4,
                    width: "280px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {value.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {value.description}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Why Choose MealHub?
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
              At MealHub, food isn’t just about eating—it’s about creating
              unforgettable experiences and fostering connections through shared
              meals. Join us to explore a world of diverse flavors while
              contributing to sustainability efforts.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Explore Our Meals
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutUs;
