import { useState, useEffect } from "react";
import { Button, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupIcon from "@mui/icons-material/Group";

const CustomMealButton = ({ mealId, availableSpots, onReserve }) => {
  const [wishCount, setWishCount] = useState(0);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const fetchWishListCount = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/meals/${mealId}/wishlist`
        );
        if (response.ok) {
          const data = await response.json();
          setWishCount(data.wish_count);
          setIsWished(data.wish_count > 0);
        } else {
          throw new Error("Failed to fetch wish list count");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishListCount();
  }, [mealId]);

  const handleWishClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/meals/${mealId}/wishlist`,
        {
          method: isWished ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setIsWished(!isWished);
        setWishCount(isWished ? wishCount - 1 : wishCount + 1);
      } else {
        throw new Error("Failed to update wish list");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (availableSpots > 0) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={onReserve}
        sx={{ mt: 2, position: "relative" }}
      >
        {" "}
        <Badge
          badgeContent={availableSpots}
          color="secondary"
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <GroupIcon sx={{ mr: 1 }} />
        </Badge>
        Reserve
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={handleWishClick}
        startIcon={
          <Badge badgeContent={wishCount} color="primary">
            {isWished ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </Badge>
        }
        sx={{ mt: 2 }}
      >
        {isWished ? "Remove from My Favorites" : "Express My Interest"}
      </Button>
    );
  }
};

export default CustomMealButton;
