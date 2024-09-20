import { ListItem, ListItemText, Typography, Box } from "@mui/material";
import Image from "next/image";

const Meal = ({ title, description, price, image_url }) => {
  const imageUrl = image_url ? `/images/${image_url}` : "/images/default.jpg";
  return (
    <ListItem>
      <Box display="flex" alignItems="center" width="100%">
        <Box mr={2} width={100} height={100} position="relative">
          <Image
            src={`/images/${imageUrl}`}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <ListItemText
          primary={title}
          secondary={
            <>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
              <Typography variant="body2">Price: ${price}</Typography>
            </>
          }
        />
      </Box>
    </ListItem>
  );
};

export default Meal;
