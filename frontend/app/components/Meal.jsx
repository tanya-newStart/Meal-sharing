import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Meal = ({
  id,
  title,
  description,
  price,
  image_url,
  customButton,
  showSavorDetailsLink = true,
}) => {
  const imageUrl = image_url || "default.jpg";
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card
        sx={{
          maxWidth: 450,
          borderRadius: "16px",
          boxShadow: 3,
        }}
      >
        <Box sx={{ position: "relative", height: "340px" }}>
          <Image
            src={`/images/${imageUrl}`}
            alt={title}
            width={400}
            height={300}
            priority
            // fill
            style={{ borderRadius: "16px 16px 0 0", objectFit: "cover" }}
          />
        </Box>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h5" component="div" fontWeight="500">
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: "green",
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "8px",
              }}
            >
              ${price}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="16px"
          >
            {customButton}
            {showSavorDetailsLink && (
              <Link href={`/meals/${id}`} passHref>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "0.9rem",
                    marginTop: "16px",
                    "&:hover": {
                      backgroundColor: "#fafad2",
                      color: "black",
                    },
                  }}
                >
                  Savor the Details!
                </Button>
              </Link>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Meal;
