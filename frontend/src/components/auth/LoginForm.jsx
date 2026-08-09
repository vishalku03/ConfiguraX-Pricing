import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  EmailOutlined,
} from "@mui/icons-material";

import { loginUser } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // UI State
  
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const handleEmailChange = (
    event
  ) => {
    setEmail(event.target.value);

    if (emailError) {
      setEmailError("");
    }

    if (error) {
      setError("");
    }
  };


  const handlePasswordChange = (
    event
  ) => {
    setPassword(event.target.value);

    if (passwordError) {
      setPasswordError("");
    }

    if (error) {
      setError("");
    }
  };


  const validateForm = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError(
        "Email is required."
      );

      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      setEmailError(
        "Enter a valid email address."
      );

      valid = false;
    }

    if (!password) {
      setPasswordError(
        "Password is required."
      );

      valid = false;
    }

    return valid;
  };

  
  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response =
        await loginUser(
          email.trim(),
          password
        );

      console.log(
        "Login response:",
        response
      );

      
      if (!response?.token) {
        throw new Error(
          "Login successful but authentication token was not received."
        );
      }

      
      localStorage.setItem(
        "token",
        response.token
      );

    
      if (response.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );
      }

    
      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      
      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Login failed:",
        err
      );

      const message =
        err?.response?.data?.message;

      if (message) {
        setError(message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(
          "Unable to login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

 
  const handleTogglePassword =
    () => {
      setShowPassword(
        (previous) => !previous
      );
    };

  return (
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        maxWidth: 450,
        mx: "auto",
        p: {
          xs: 3,
          sm: 4,
        },
        borderRadius: 3,
      }}
    >
      
      <Stack
        spacing={1}
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor:
              "primary.main",
            color: "white",
          }}
        >
          <LockOutlined />
        </Box>

        <Typography
          variant="h5"
          component="h1"
          fontWeight={700}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          Sign in to Laptop Pricing
          System
        </Typography>
      </Stack>

      {/* Backend Error */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() =>
            setError("")
          }
        >
          {error}
        </Alert>
      )}

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Stack spacing={2.5}>
          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={
              handleEmailChange
            }
            error={Boolean(
              emailError
            )}
            helperText={emailError}
            disabled={loading}
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={
              handlePasswordChange
            }
            error={Boolean(
              passwordError
            )}
            helperText={
              passwordError
            }
            disabled={loading}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={
                      handleTogglePassword
                    }
                    edge="end"
                    disabled={loading}
                    type="button"
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              minHeight: 48,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {loading ? (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <CircularProgress
                  size={22}
                  color="inherit"
                />

                <Typography
                  component="span"
                  color="inherit"
                >
                  Signing in...
                </Typography>
              </Stack>
            ) : (
              "Sign In"
            )}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default LoginForm;