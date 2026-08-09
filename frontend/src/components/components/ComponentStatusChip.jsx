import {
  Chip
} from "@mui/material";

import CheckCircleIcon
  from "@mui/icons-material/CheckCircle";

import CancelIcon
  from "@mui/icons-material/Cancel";

export default function ComponentStatusChip({
  isActive
}) {
  return (
    <Chip
      size="small"
      icon={
        isActive ? (
          <CheckCircleIcon />
        ) : (
          <CancelIcon />
        )
      }
      label={
        isActive
          ? "Active"
          : "Inactive"
      }
      color={
        isActive
          ? "success"
          : "default"
      }
      variant={
        isActive
          ? "filled"
          : "outlined"
      }
    />
  );
}