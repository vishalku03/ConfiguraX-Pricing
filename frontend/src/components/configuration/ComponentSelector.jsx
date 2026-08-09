import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

import {
  formatCurrency
} from "../../utils/formatters";

export default function ComponentSelector({
  category,
  value = "",
  components = [],
  onChange,
  disabled = false
}) {
  return (
    <FormControl
      fullWidth
      disabled={disabled}
    >
      <InputLabel>
        {category}
      </InputLabel>

      <Select
        value={value}
        label={category}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        <MenuItem value="">
          Select {category}
        </MenuItem>

        {components.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
          >
            {item.name} —{" "}
            {formatCurrency(item.price)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}