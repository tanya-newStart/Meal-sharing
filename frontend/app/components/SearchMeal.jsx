"use client";
import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchMeal = ({ meals, onFilteredMealsChange }) => {
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(meals);

  useEffect(() => {
    setFilteredData(meals);
  }, [meals]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    filterData(value);
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (!lowercasedValue) {
      setFilteredData(meals);
      return;
    }
    const filteredMeals = meals.filter((meal) =>
      meal.title.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filteredMeals);
  };
  onFilteredMealsChange(filteredData);

  return (
    <Box sx={{ my: 4, display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search meals"
        value={keyword}
        onChange={handleInputChange}
        sx={{ mr: 2 }}
      />

      <SearchIcon />
    </Box>
  );
};

export default SearchMeal;
