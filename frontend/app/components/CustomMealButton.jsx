import { Button } from "@mui/material";

const CustomMealButton = ({ availableSpots, onReserve, onAddToWishList }) => {
  if (availableSpots > 0) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={onReserve}
        sx={{ mt: 2 }}
      >
        Reserve
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={onAddToWishList}
        sx={{ mt: 2 }}
      >
        Add to Wish List
      </Button>
    );
  }
};

export default CustomMealButton;
