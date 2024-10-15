import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      bgcolor="primary.main"
      color="white"
      py={3}
      sx={{
        background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Container>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={2}
          color="#333333"
          fontWeight="bold"
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} MealHub
          </Typography>

          <Link href="#" color="inherit" sx={{ mx: 2, textDecoration: "none" }}>
            Join the Table
          </Link>

          <Link href="#" color="inherit" sx={{ mx: 2, textDecoration: "none" }}>
            House Rules
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 2, textDecoration: "none" }}>
            Utensils & Tools
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
