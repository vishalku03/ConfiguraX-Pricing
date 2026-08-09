import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

import {
  COMPONENT_CATEGORIES,
} from "../../utils/configuration";

export default function ComponentForm({
  initialValues = null,
  onSubmit,
  loading = false,
  submitLabel = "Save Component",
  title = "Component Details",
}) {
  const navigate =
    useNavigate();

  // Form State


  const [form, setForm] =
    useState({
      name: "",
      category: "",
      price: "",
      description: "",
    });

  const [errors, setErrors] =
    useState({});

  // Load initial values for Edit


  useEffect(() => {
    if (!initialValues) {
      return;
    }

    setForm({
      name:
        initialValues.name ||
        "",

      category:
        initialValues.category ||
        "",

      price:
        initialValues.price ??
        "",

      description:
        initialValues.description ||
        "",
    });
  }, [initialValues]);


  // Input Change
 

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

   
    if (errors[name]) {
      setErrors(
        (previous) => ({
          ...previous,
          [name]: "",
        })
      );
    }
  };

 
  // Validation
  

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Component name is required.";
    }

    if (!form.category) {
      nextErrors.category =
        "Component category is required.";
    }

    if (
      form.price === "" ||
      Number.isNaN(
        Number(form.price)
      ) ||
      Number(form.price) < 0
    ) {
      nextErrors.price =
        "Enter a valid price.";
    }

    if (
      form.description &&
      form.description.length >
        500
    ) {
      nextErrors.description =
        "Description cannot exceed 500 characters.";
    }

    setErrors(
      nextErrors
    );

    return (
      Object.keys(
        nextErrors
      ).length === 0
    );
  };

  
  // Submit
 

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      name:
        form.name.trim(),

      category:
        form.category,

      price:
        Number(form.price),

      description:
        form.description.trim(),
    };

    await onSubmit(
      payload
    );
  };

  
  // UI
  

  return (
    <Box>
      

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
          >
            {title}
          </Typography>

          <Typography
            color="text.secondary"
          >
            Add or update laptop component information.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <ArrowBackIcon />
          }
          onClick={() =>
            navigate(
              "/components"
            )
          }
          disabled={loading}
        >
          Back
        </Button>
      </Box>

      {/* -------------------------------------------- */}
      {/* Form */}
      {/* -------------------------------------------- */}

      <Card>
        <CardContent>
          <Box
            component="form"
            onSubmit={
              handleSubmit
            }
          >
            {/* Name */}
            <TextField
              fullWidth
              label="Component Name"
              name="name"
              value={
                form.name
              }
              onChange={
                handleChange
              }
              error={Boolean(
                errors.name
              )}
              helperText={
                errors.name
              }
              disabled={loading}
              sx={{
                mb: 3,
              }}
              placeholder="e.g. Intel Core i7-14700H"
            />

            {/* Category */}
            <FormControl
              fullWidth
              error={Boolean(
                errors.category
              )}
              disabled={loading}
              sx={{
                mb: 3,
              }}
            >
              <InputLabel>
                Category
              </InputLabel>

              <Select
                label="Category"
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
              >
                {COMPONENT_CATEGORIES.map(
                  (
                    category
                  ) => (
                    <MenuItem
                      key={
                        category
                      }
                      value={
                        category
                      }
                    >
                      {category}
                    </MenuItem>
                  )
                )}
              </Select>

              {errors.category && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    mt: 0.5,
                    ml: 1.5,
                  }}
                >
                  {
                    errors.category
                  }
                </Typography>
              )}
            </FormControl>

            {/* Price */}
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={
                form.price
              }
              onChange={
                handleChange
              }
              error={Boolean(
                errors.price
              )}
              helperText={
                errors.price ||
                "Enter component price in INR."
              }
              disabled={loading}
              inputProps={{
                min: 0,
                step: 1,
              }}
              sx={{
                mb: 3,
              }}
            />

            {/* Description */}
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Description"
              name="description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
              error={Boolean(
                errors.description
              )}
              helperText={
                errors.description ||
                `${form.description.length}/500 characters`
              }
              disabled={loading}
              sx={{
                mb: 3,
              }}
              placeholder="Describe the component..."
            />

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(
                    "/components"
                  )
                }
                disabled={
                  loading
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={
                  <SaveIcon />
                }
                disabled={
                  loading
                }
              >
                {loading
                  ? "Saving..."
                  : submitLabel}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}