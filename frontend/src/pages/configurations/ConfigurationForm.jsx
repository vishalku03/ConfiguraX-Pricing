import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

import { useSnackbar } from "notistack";

import {
  getComponents,
} from "../../services/componentService";

import {
  createConfiguration,
} from "../../services/configurationService";

import {
  formatCurrency,
} from "../../utils/formatters";

export default function CreateConfigurationPage() {
  const navigate = useNavigate();

  const {
    enqueueSnackbar,
  } = useSnackbar();

  // ==================================================
  // State
  // ==================================================

  const [components, setComponents] =
    useState([]);

  const [selected, setSelected] =
    useState({});

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==================================================
  // Load components from backend
  // ==================================================

  useEffect(() => {
    let mounted = true;

    const loadComponents =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await getComponents({
              page: 1,
              limit: 100,
            });

          console.log(
            "COMPONENT API RESPONSE:",
            response
          );

          const items =
            Array.isArray(
              response?.items
            )
              ? response.items
              : [];

          const active =
            items.filter(
              (item) =>
                item &&
                item.isActive === true
            );

          console.log(
            "ACTIVE COMPONENTS:",
            active
          );

          if (mounted) {
            setComponents(active);
          }
        } catch (err) {
          console.error(
            "COMPONENT LOAD ERROR:",
            err
          );

          if (!mounted) {
            return;
          }

          const message =
            err?.response?.data
              ?.message ||
            "Unable to load components.";

          setError(message);

          enqueueSnackbar(
            message,
            {
              variant: "error",
            }
          );
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    loadComponents();

    return () => {
      mounted = false;
    };
  }, [enqueueSnackbar]);

  // ==================================================
  // Categories
  // ==================================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        components.map(
          (item) =>
            item.category
        )
      ),
    ];
  }, [components]);

  // ==================================================
  // Components grouped by category
  // ==================================================

  const getComponentsForCategory =
    (category) => {
      return components.filter(
        (item) =>
          item.category ===
          category
      );
    };

  // ==================================================
  // Component selection
  // ==================================================

  const handleSelection = (
    category,
    componentId
  ) => {
    if (!componentId) {
      setSelected(
        (previous) => {
          const next = {
            ...previous,
          };

          delete next[category];

          return next;
        }
      );

      return;
    }

    const categoryComponents =
      getComponentsForCategory(
        category
      );

    const component =
      categoryComponents.find(
        (item) =>
          String(
            item._id
          ) ===
          String(componentId)
      );

    if (!component) {
      return;
    }

    console.log(
      "SELECTED:",
      category,
      component
    );

    setSelected(
      (previous) => ({
        ...previous,
        [category]:
          component,
      })
    );

    setError("");
  };

  // ==================================================
  // Selected components
  // ==================================================

  const selectedComponents =
    useMemo(() => {
      return categories
        .map(
          (category) =>
            selected[category]
        )
        .filter(Boolean)
        .map(
          (component) => ({
            componentId:
              component._id,

            category:
              component.category,

            name:
              component.name,

            priceAtQuotation:
              Number(
                component.price
              ),
          })
        );
    }, [
      categories,
      selected,
    ]);

  // ==================================================
  // Total
  // ==================================================

  const totalPrice =
    selectedComponents.reduce(
      (sum, item) =>
        sum +
        Number(
          item.priceAtQuotation
        ),
      0
    );

  // ==================================================
  // Save
  // ==================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "Configuration name is required."
      );

      return;
    }

    if (
      selectedComponents.length ===
      0
    ) {
      setError(
        "Please select at least one component."
      );

      return;
    }

    try {
      setSaving(true);

      const payload = {
        name:
          name.trim(),

        components:
          selectedComponents,
      };

      console.log(
        "CREATE CONFIGURATION PAYLOAD:",
        payload
      );

      const response =
        await createConfiguration(
          payload
        );

      console.log(
        "CREATE CONFIGURATION RESPONSE:",
        response
      );

      const configuration =
        response?.configuration;

      const configurationId =
        configuration?._id ||
        configuration?.id;

      enqueueSnackbar(
        "Configuration saved successfully.",
        {
          variant: "success",
        }
      );

      if (configurationId) {
        navigate(
          `/configurations/${configurationId}`
        );
      } else {
        navigate(
          "/configurations"
        );
      }
    } catch (err) {
      console.error(
        "CREATE CONFIGURATION ERROR:",
        err
      );

      const message =
        err?.response?.data
          ?.message ||
        err?.message ||
        "Unable to save configuration.";

      setError(message);

      enqueueSnackbar(
        message,
        {
          variant: "error",
        }
      );
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // Loading
  // ==================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ==================================================
  // Page
  // ==================================================

  return (
    <Box>

      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
          >
            Create Laptop Configuration
          </Typography>

          <Typography
            color="text.secondary"
          >
            Select components and create a laptop quotation.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <ArrowBackIcon />
          }
          onClick={() =>
            navigate(
              "/configurations"
            )
          }
        >
          Back
        </Button>
      </Box>

      {/* Error */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={
          handleSubmit
        }
      >

        {/* Name */}

        <Card sx={{ mb: 2 }}>
          <CardContent>

            <TextField
              fullWidth
              label="Configuration Name"
              placeholder="e.g. Rahul Laptop"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              disabled={saving}
            />

          </CardContent>
        </Card>

        {/* Components */}

        <Card sx={{ mb: 2 }}>
          <CardContent>

            <Typography
              variant="h6"
              gutterBottom
            >
              Select Components
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Select one component from each category.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },
                gap: 2,
              }}
            >

              {categories.map(
                (category) => {

                  const categoryComponents =
                    getComponentsForCategory(
                      category
                    );

                  const selectedComponent =
                    selected[
                      category
                    ];

                  return (
                    <FormControl
                      fullWidth
                      key={category}
                      disabled={saving}
                    >

                      <InputLabel>
                        {category}
                      </InputLabel>

                      <Select
                        label={
                          category
                        }
                        value={
                          selectedComponent
                            ? String(
                                selectedComponent._id
                              )
                            : ""
                        }
                        onChange={(
                          event
                        ) =>
                          handleSelection(
                            category,
                            event.target.value
                          )
                        }
                      >

                        <MenuItem value="">
                          Select{" "}
                          {category}
                        </MenuItem>

                        {categoryComponents.map(
                          (component) => (
                            <MenuItem
                              key={
                                component._id
                              }
                              value={
                                String(
                                  component._id
                                )
                              }
                            >
                              {
                                component.name
                              }{" "}
                              —{" "}
                              {formatCurrency(
                                Number(
                                  component.price
                                )
                              )}
                            </MenuItem>
                          )
                        )}

                      </Select>

                    </FormControl>
                  );
                }
              )}

            </Box>

          </CardContent>
        </Card>

        {/* Price Breakdown */}

        <Card sx={{ mb: 2 }}>
          <CardContent>

            <Typography
              variant="h6"
              gutterBottom
            >
              Price Breakdown
            </Typography>

            {selectedComponents.length ===
            0 ? (

              <Typography
                color="text.secondary"
              >
                No components selected yet.
              </Typography>

            ) : (

              selectedComponents.map(
                (component) => (

                  <Box
                    key={
                      component.componentId
                    }
                    sx={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      py: 1.5,
                      borderBottom:
                        "1px solid",
                      borderColor:
                        "divider",
                    }}
                  >

                    <Box>

                      <Typography
                        fontWeight={600}
                      >
                        {
                          component.name
                        }
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {
                          component.category
                        }
                      </Typography>

                    </Box>

                    <Typography
                      fontWeight={700}
                    >
                      {formatCurrency(
                        component.priceAtQuotation
                      )}
                    </Typography>

                  </Box>

                )
              )

            )}

            {/* Total */}

            <Box
              sx={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                mt: 2,
                pt: 2,
                borderTop:
                  "2px solid",
                borderColor:
                  "divider",
              }}
            >

              <Typography
                variant="h6"
              >
                Total
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
              >
                {formatCurrency(
                  totalPrice
                )}
              </Typography>

            </Box>

          </CardContent>
        </Card>

        {/* Buttons */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: 2,
            mb: 4,
          }}
        >

          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                "/configurations"
              )
            }
            disabled={saving}
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
              saving ||
              selectedComponents.length ===
                0
            }
          >
            {saving
              ? "Saving..."
              : "Save Configuration"}
          </Button>

        </Box>

      </Box>
    </Box>
  );
}