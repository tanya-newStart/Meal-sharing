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
          maxWidth: 320,
          borderRadius: "12px",
          boxShadow: 2,
          position: "relative",
          margin: "0 auto",
        }}
      >
        <Box sx={{ position: "relative", height: "200px" }}>
          <Image
            src={`/images/${imageUrl}`}
            alt={title}
            width={320}
            height={200}
            priority
            style={{ borderRadius: "12px 12px 0 0", objectFit: "cover" }}
          />
        </Box>
        <CardContent sx={{ padding: "16px 16px 8px" }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6" component="div" fontWeight="500">
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                backgroundColor: "green",
                color: "white",
                padding: "0.2rem 0.4rem",
                borderRadius: "6px",
              }}
            >
              ${price}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 40, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {description}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
          >
            {customButton}
            {showSavorDetailsLink && (
              <Link href={`/meals/${id}`} passHref>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "0.85rem",
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
