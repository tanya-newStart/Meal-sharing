import { ListItem, ListItemText, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Meal = ({ id, title, description, price, image_url }) => {
  const imageUrl = image_url || "default.jpg";
  return (
    <ListItem
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        mb: 2,
        p: 2,
        bgcolor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        justifyItems: "space-between",
        height: "100%",
      }}
    >
      <Box display="flex" alignItems="flex-start" width="100%">
        <Box
          mr={2}
          width={200}
          height={150}
          position="relative"
          overflow="hidden"
          borderRadius="8px"
        >
          <Image
            src={`/images/${imageUrl}`}
            alt={title}
            layout="fill"
            objectFit="contain"
            style={{ objectPosition: "center" }}
          />
        </Box>
        <ListItemText
          primary={
            <Typography variant="h6" color="primary" noWrap>
              {title}
            </Typography>
          }
          secondary={
            <Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {description}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="secondary"
                position="relative"
              >
                Price: ${price}
              </Typography>
            </Box>
          }
        />
        <Box
          ml={2}
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link href={`/meals/${id}`} passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "8px",
                padding: "4px 8px",
                fontSize: "0.8rem",
                width: "90px",
                height: "60px",
                "&:hover": {
                  backgroundColor: "#fafad2",
                  color: "black",
                },
              }}
            >
              Savor the Details!
            </Button>
          </Link>
        </Box>
      </Box>
    </ListItem>
  );
};

export default Meal;
