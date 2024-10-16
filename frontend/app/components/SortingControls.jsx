import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortingControls = ({
  sortKey,
  sortDir,
  onSortKeyChange,
  onSortDirChange,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl sx={{ mr: 1, minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortKey} onChange={onSortKeyChange}>
          <MenuItem value="meal_when">Date</MenuItem>
          <MenuItem value="max_reservations">Max Reservations</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Sort Direction</InputLabel>
        <Select value={sortDir} onChange={onSortDirChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortingControls;
