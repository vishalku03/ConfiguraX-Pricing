import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material";

export default function LoadingSpinner({
  message = "Loading...",
  fullScreen = false,
  size = 40
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        minHeight: fullScreen
          ? "100vh"
          : 240,

        width: "100%",
        gap: 2
      }}
    >
      <CircularProgress
        size={size}
      />

      {message && (
        <Typography
          color="text.secondary"
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}