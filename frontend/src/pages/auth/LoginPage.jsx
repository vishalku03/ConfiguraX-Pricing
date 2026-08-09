import {
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 2
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 430
        }}
      >
        <CardContent sx={{ p: 4 }}>

          <Typography
            variant="h4"
            gutterBottom
          >
            Welcome back
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Sign in to manage laptop
            pricing.
          </Typography>

          <LoginForm />

        </CardContent>
      </Card>
    </Box>
  );
}