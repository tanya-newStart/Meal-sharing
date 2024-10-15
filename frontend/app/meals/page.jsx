"use client";
import { useState } from "react";
import MealsList from "../components/MealsList";
import SortingControls from "../components/SortingControls";
import { Box } from "@mui/material";

const AllMeals = () => {
  const [sortKey, setSortKey] = useState("meal_when");
  const [sortDir, setSortDir] = useState("asc");

  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
  };

  const handleSortDirChange = (e) => {
    setSortDir(e.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 2,
      }}
    >
      <SortingControls
        sortKey={sortKey}
        sortDir={sortDir}
        onSortKeyChange={handleSortKeyChange}
        onSortDirChange={handleSortDirChange}
      />
      <MealsList layout="grid" sortKey={sortKey} sortDir={sortDir} />
    </Box>
  );
};
export default AllMeals;
