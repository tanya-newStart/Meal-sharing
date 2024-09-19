"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

function MealsList() {
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

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "10px 0", padding: "10px" }}>
        Meals{" "}
      </Typography>
      {meals.length > 0 ? (
        <List>
          {meals.map((meal) => (
            <Paper key={meal.id}>
              <ListItem>
                <ListItemText
                  primary={meal.title}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {meal.description}
                      </Typography>
                      <Typography variant="body2">
                        Price: ${meal.price}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <p>No meals available</p>
      )}
    </Container>
  );
}

export default MealsList;
