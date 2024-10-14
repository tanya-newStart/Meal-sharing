import { Box, Typography } from "@mui/material";
import MealsList from "../components/MealsList";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ padding: 2 }}
      >
        <MealsList limit={5} layout="slider"></MealsList>
        <Link href="/meals" passHref>
          <Typography
            variant="h6"
            sx={{
              marginTop: 2,
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            See all meals
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default HomePage;
