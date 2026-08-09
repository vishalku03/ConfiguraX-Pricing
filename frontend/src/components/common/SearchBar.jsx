import {
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search...",
  fullWidth = false,
  width = 320,
  disabled = false
}) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <TextField
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      placeholder={placeholder}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{
        width: fullWidth
          ? "100%"
          : {
              xs: "100%",
              sm: width
            }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              color="action"
            />
          </InputAdornment>
        ),

        endAdornment:
          value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                disabled={disabled}
                aria-label="Clear search"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null
      }}
    />
  );
}