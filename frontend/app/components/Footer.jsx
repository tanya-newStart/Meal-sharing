import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      bgcolor="primary.main"
      py={3}
      sx={{
        background: "#7bbf6a",
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
          fontWeight="bold"
          sx={{ letterSpacing: 1, lineHeight: 1.5 }}
        >
          <Typography
            variant="body2"
            sx={{ letterSpacing: 1, lineHeight: 1.5 }}
          >
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
