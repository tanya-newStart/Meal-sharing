"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Paper,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RecyclingIcon from "@mui/icons-material/Recycling";
import Link from "next/link";

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
                fontStyle: "italic",
                color: "primary.main",
                letterSpacing: 1.2,
                mb: 1,
              }}
            >
              Eat well, connect, and care for our world.
            </Typography>
          </Box>

          <Stack
            spacing={4}
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
          >
            {[
              {
                icon: <RestaurantIcon fontSize="large" />,
                title: "Quality",
                description: "Fresh ingredients for top-notch meals.",
              },
              {
                icon: <PeopleIcon fontSize="large" />,
                title: "Community",
                description: "Connecting people through shared meals.",
              },
              {
                icon: <LightbulbIcon fontSize="large" />,
                title: "Innovation",
                description: "Encouraging creativity in the kitchen.",
              },
              {
                icon: <RecyclingIcon fontSize="large" />,
                title: "Sustainability",
                description: "Reducing food waste and eco-friendly practices.",
              },
            ].map((value, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 4,
                  width: { xs: "90%", sm: "250px" },
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {value.icon}
                <Typography
                  variant="h6"
                  sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                >
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {value.description}
                </Typography>
              </Paper>
            ))}
          </Stack>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Link href="/meals" passHref rel="noopener noreferrer">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Explore Our Meals
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutUs;
