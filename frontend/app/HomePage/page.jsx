import { Box, Typography } from "@mui/material";
import Footer from "../components/Footer";
import MealsList from "../components/MealsList";
import Navbar from "../components/NavBar";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <MealsList limit={3}></MealsList>
      <Box display="flex" justifyContent="center" mt={2}>
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

      <Footer></Footer>
    </>
  );
};

export default HomePage;
