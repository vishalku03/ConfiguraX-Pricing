import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

import RestartAltIcon
  from "@mui/icons-material/RestartAlt";

import SearchBar
  from "../common/SearchBar";

import {
  COMPONENT_CATEGORIES
} from "../../utils/configuration";

export default function ComponentFilters({
  search = "",
  category = "",
  status = "all",
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap"
      }}
    >

    

      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search components..."
        width={320}
      />


      <FormControl
        size="small"
        sx={{
          minWidth: {
            xs: "100%",
            sm: 190
          }
        }}
      >

        <InputLabel>
          Category
        </InputLabel>

        <Select
          value={category}
          label="Category"
          onChange={(event) =>
            onCategoryChange(
              event.target.value
            )
          }
        >

          <MenuItem value="">
            All Categories
          </MenuItem>

          {COMPONENT_CATEGORIES.map(
            (item) => (

              <MenuItem
                key={item}
                value={item}
              >
                {item}
              </MenuItem>

            )
          )}

        </Select>

      </FormControl>

     

      <FormControl
        size="small"
        sx={{
          minWidth: {
            xs: "100%",
            sm: 150
          }
        }}
      >

        <InputLabel>
          Status
        </InputLabel>

        <Select
          value={status}
          label="Status"
          onChange={(event) =>
            onStatusChange(
              event.target.value
            )
          }
        >

          <MenuItem value="all">
            All
          </MenuItem>

          <MenuItem value="active">
            Active
          </MenuItem>

          <MenuItem value="inactive">
            Inactive
          </MenuItem>

        </Select>

      </FormControl>

      

      <Button
        variant="outlined"
        startIcon={
          <RestartAltIcon />
        }
        onClick={onReset}
      >
        Reset
      </Button>

    </Box>
  );
}