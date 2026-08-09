

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

import { getComponents } from "../../services/componentService";

import { createConfiguration } from "../../services/configurationService";

import { formatCurrency } from "../../utils/formatters";

export default function CreateConfigurationPage() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [components, setComponents] = useState([]);

  const [selected, setSelected] = useState({});

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // ==================================================
  // LOAD COMPONENTS
  // ==================================================

  useEffect(() => {
    let mounted = true;

    const loadComponents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getComponents({
          page: 1,
          limit: 100,
        });

        console.log("GET /components:", response);

        const items = Array.isArray(response?.items)
          ? response.items
          : Array.isArray(response?.data?.items)
          ? response.data.items
          : [];

        const activeComponents = items.filter(
          (item) =>
            item &&
            item.isActive === true
        );

        if (mounted) {
          setComponents(activeComponents);
        }
      } catch (err) {
        console.error(
          "Failed to load components:",
          err
        );

        if (!mounted) {
          return;
        }

        const message =
          err?.response?.data?.message ||
          "Unable to load components.";

        setError(message);

        enqueueSnackbar(message, {
          variant: "error",
        });
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

  
  const categories = useMemo(() => {
    const result = [];

    components.forEach((component) => {
      if (
        component.category &&
        !result.includes(component.category)
      ) {
        result.push(component.category);
      }
    });

    return result;
  }, [components]);

  

  const getComponentsForCategory = (category) => {
    return components.filter(
      (component) =>
        component.category === category
    );
  };

 
  const handleComponentChange = (
    category,
    componentId
  ) => {
    if (!componentId) {
      setSelected((previous) => {
        const next = {
          ...previous,
        };

        delete next[category];

        return next;
      });

      return;
    }

    const component =
      getComponentsForCategory(category).find(
        (item) =>
          String(
            item._id || item.id
          ) === String(componentId)
      );

    if (!component) {
      console.error(
        "Component not found:",
        componentId
      );

      return;
    }

    setSelected((previous) => ({
      ...previous,
      [category]: component,
    }));

    setError("");
  };

  

  const selectedComponents = useMemo(() => {
    return categories
      .map(
        (category) =>
          selected[category]
      )
      .filter(Boolean);
  }, [categories, selected]);

  
  const totalPrice =
    selectedComponents.reduce(
      (sum, component) =>
        sum +
        Number(component.price || 0),
      0
    );

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "Configuration name is required."
      );
      return;
    }

   
    if (selectedComponents.length !== 8) {
      setError(
        `Please select exactly 8 components. Currently selected: ${selectedComponents.length}.`
      );
      return;
    }

    const componentIds =
      selectedComponents.map(
        (component) =>
          component._id || component.id
      );

   
    const invalidId =
      componentIds.some(
        (id) => !id
      );

    if (invalidId) {
      setError(
        "One or more selected components have an invalid ID."
      );
      return;
    }

    const configurationPayload = {
      name: name.trim(),
      componentIds,
    };

    console.log(
      "================================"
    );

    console.log(
      "POST /configurations PAYLOAD:"
    );

    console.log(
      JSON.stringify(
        configurationPayload,
        null,
        2
      )
    );

    console.log(
      "Component IDs:",
      componentIds
    );

    console.log(
      "Selected components:",
      selectedComponents
    );

    console.log(
      "Total:",
      totalPrice
    );

    console.log(
      "================================"
    );

    try {
      setSaving(true);

      const response =
        await createConfiguration(
          configurationPayload
        );

      console.log(
        "CREATE CONFIGURATION RESPONSE:",
        response
      );

      const configuration =
        response?.configuration ||
        response?.data?.configuration ||
        response?.data ||
        null;

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
        "================================"
      );

      console.error(
        "CREATE CONFIGURATION ERROR:",
        err
      );

      console.error(
        "STATUS:",
        err?.response?.status
      );

      console.error(
        "BACKEND RESPONSE:",
        err?.response?.data
      );

      console.error(
        "BACKEND RESPONSE JSON:",
        JSON.stringify(
          err?.response?.data,
          null,
          2
        )
      );

      console.error(
        "================================"
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to save configuration.";

      setError(message);

      enqueueSnackbar(message, {
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  

  return (
    <Box>
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4">
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
          disabled={saving}
        >
          Back
        </Button>
      </Box>

      {/* ERROR */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      {/* FORM */}

      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        {/* CONFIGURATION NAME */}

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

        {/* COMPONENTS */}

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
                gridTemplateColumns: {
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

                  const selectedValue =
                    selectedComponent
                      ? String(
                          selectedComponent._id ||
                            selectedComponent.id
                        )
                      : "";

                  return (
                    <FormControl
                      key={category}
                      fullWidth
                      disabled={saving}
                    >
                      <InputLabel>
                        {category}
                      </InputLabel>

                      <Select
                        label={category}
                        value={
                          selectedValue
                        }
                        onChange={(
                          event
                        ) =>
                          handleComponentChange(
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
                          (component) => {
                            const id =
                              component._id ||
                              component.id;

                            return (
                              <MenuItem
                                key={String(
                                  id
                                )}
                                value={String(
                                  id
                                )}
                              >
                                {
                                  component.name
                                }{" "}
                                —{" "}
                                {formatCurrency(
                                  Number(
                                    component.price ||
                                      0
                                  )
                                )}
                              </MenuItem>
                            );
                          }
                        )}
                      </Select>
                    </FormControl>
                  );
                }
              )}
            </Box>
          </CardContent>
        </Card>

        {/* PRICE BREAKDOWN */}

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
                      String(
                        component._id ||
                          component.id
                      )
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
                        Number(
                          component.price ||
                            0
                        )
                      )}
                    </Typography>
                  </Box>
                )
              )
            )}

            {/* TOTAL */}

            <Box
              sx={{
                display: "flex",
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
              <Typography variant="h6">
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

        {/* BUTTONS */}

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
              selectedComponents.length !==
                8
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