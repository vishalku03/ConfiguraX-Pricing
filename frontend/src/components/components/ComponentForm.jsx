import {
  Controller,
  useForm
} from "react-hook-form";

import {
  zodResolver
} from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";

import {
  useNavigate
} from "react-router-dom";

import {
  componentSchema
} from "../../validators/componentSchema";

import {
  COMPONENT_CATEGORIES
} from "../../utils/configuration";

export default function ComponentForm({
  title = "Add Component",
  defaultValues,
  onSubmit,
  loading = false
}) {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver:
      zodResolver(
        componentSchema
      ),

    defaultValues:
      defaultValues || {
        name: "",
        category: "",
        price: "",
        description: ""
      }
  });

  return (
    <div className="page-container">

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        {title}
      </Typography>

      <Card
        sx={{
          maxWidth: 800,
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >

        <Box
          component="form"
          onSubmit={handleSubmit(
            onSubmit
          )}
          noValidate
          sx={{
            display: "grid",
            gap: 2.5
          }}
        >

          

          <TextField
            fullWidth
            label="Component Name"
            placeholder="e.g. Intel Core i7-14700H"
            {...register("name")}
            error={Boolean(
              errors.name
            )}
            helperText={
              errors.name?.message
            }
            disabled={loading}
          />

          

          <Controller
            name="category"
            control={control}
            render={({
              field
            }) => (

              <FormControl
                fullWidth
                error={Boolean(
                  errors.category
                )}
                disabled={loading}
              >

                <InputLabel>
                  Category
                </InputLabel>

                <Select
                  {...field}
                  label="Category"
                >

                  <MenuItem value="">
                    Select Category
                  </MenuItem>

                  {COMPONENT_CATEGORIES.map(
                    (category) => (

                      <MenuItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </MenuItem>

                    )
                  )}

                </Select>

                {errors.category && (
                  <FormHelperText>
                    {
                      errors
                        .category
                        .message
                    }
                  </FormHelperText>
                )}

              </FormControl>
            )}
          />

         

          <TextField
            fullWidth
            label="Price"
            placeholder="Enter component price"
            type="number"
            inputProps={{
              min: 0,
              step: 1
            }}
            {...register("price")}
            error={Boolean(
              errors.price
            )}
            helperText={
              errors.price?.message ||
              "Enter price in INR"
            }
            disabled={loading}
          />

         

          <TextField
            fullWidth
            label="Description"
            placeholder="Describe the component..."
            multiline
            rows={4}
            {...register(
              "description"
            )}
            error={Boolean(
              errors.description
            )}
            helperText={
              errors.description?.message
            }
            disabled={loading}
          />

          {/* Actions */}

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "flex-end",
              gap: 2,
              mt: 1,
              flexWrap: "wrap"
            }}
          >

            <Button
              variant="outlined"
              onClick={() =>
                navigate(
                  "/components"
                )
              }
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Component"}
            </Button>

          </Box>

        </Box>

      </Card>

    </div>
  );
}