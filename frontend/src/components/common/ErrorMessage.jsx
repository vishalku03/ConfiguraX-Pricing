import {
  Alert,
  Box,
  Button
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
  severity = "error"
}) {
  return (
    <Box
      sx={{
        width: "100%",
        py: 4
      }}
    >
      <Alert
        severity={severity}
        action={
          onRetry ? (
            <Button
              color="inherit"
              size="small"
              startIcon={
                <RefreshIcon />
              }
              onClick={onRetry}
            >
              Try Again
            </Button>
          ) : undefined
        }
      >
        {message}
      </Alert>
    </Box>
  );
}