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
        height="100vh"
      >
        <MealsList limit={3}></MealsList>
        <Link href="/meals" passHref>
          <Typography
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            See all
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default HomePage;
