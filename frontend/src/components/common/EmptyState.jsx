import {
  Box,
  Button,
  Typography
} from "@mui/material";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

export default function EmptyState({
  title = "No records found",
  description = "There is nothing to display here.",
  actionLabel,
  onAction,
  icon
}) {
  return (
    <Box
      sx={{
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        py: 6
      }}
    >
      {icon || (
        <InboxOutlinedIcon
          sx={{
            fontSize: 64,
            color: "text.disabled",
            mb: 2
          }}
        />
      )}

      <Typography
        variant="h6"
        fontWeight={700}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
          maxWidth: 500
        }}
      >
        {description}
      </Typography>

      {actionLabel && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{ mt: 3 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}