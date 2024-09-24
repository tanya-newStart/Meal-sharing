import { ListItem, ListItemText, Typography, Box } from "@mui/material";
import Image from "next/image";

const Meal = ({ title, description, price, image_url }) => {
  const imageUrl = image_url || "default.jpg";
  return (
    <ListItem
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        mb: 2,
        p: 1,
        bgcolor: "#f9f9f9",
      }}
    >
      <Box display="flex" alignItems="flex-start" width="100%">
        <Box
          mr={2}
          width={300}
          height={200}
          position="relative"
          overflow="hidden"
          borderRadius="8px"
        >
          <Image
            src={`/images/${imageUrl}`}
            alt={title}
            layout="fill"
            objectFit="cover"
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
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="secondary"
                position="absolute"
                bottom={5}
                right={5}
              >
                Price: ${price}
              </Typography>
            </Box>
          }
        />
      </Box>
    </ListItem>
  );
};

export default Meal;
