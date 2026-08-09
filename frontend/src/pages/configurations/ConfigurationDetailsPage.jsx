import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

import ArrowBackIcon
  from "@mui/icons-material/ArrowBack";

import {
  getConfigurationById,
} from "../../services/configurationService";

import {
  formatCurrency,
  formatDate,
} from "../../utils/formatters";

export default function ConfigurationDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [item, setItem] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==================================================
  // LOAD CONFIGURATION FROM BACKEND
  // ==================================================

  useEffect(() => {
    let mounted = true;

    const loadConfiguration =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response =
            await getConfigurationById(
              id
            );

          console.log(
            "GET /configurations/:id:",
            response
          );

          /*
           * Backend may return:
           *
           * {
           *   success: true,
           *   configuration: {...}
           * }
           *
           * or:
           *
           * {
           *   success: true,
           *   data: {...}
           * }
           */

          const configuration =
            response?.configuration ||
            response?.data?.configuration ||
            response?.data ||
            null;

          if (!mounted) {
            return;
          }

          if (!configuration) {
            setError(
              "Configuration not found."
            );
            return;
          }

          setItem(
            configuration
          );
        } catch (err) {
          console.error(
            "Failed to load configuration:",
            err
          );

          if (!mounted) {
            return;
          }

          const message =
            err?.response?.data
              ?.message ||
            "Unable to load configuration.";

          setError(message);
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    if (id) {
      loadConfiguration();
    } else {
      setError(
        "Configuration ID is missing."
      );
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  // ==================================================
  // LOADING
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
  // ERROR / NOT FOUND
  // ==================================================

  if (error || !item) {
    return (
      <Box>
        <Button
          startIcon={
            <ArrowBackIcon />
          }
          onClick={() =>
            navigate(
              "/configurations"
            )
          }
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <Alert severity="error">
          {error ||
            "Configuration not found."}
        </Alert>
      </Box>
    );
  }

  // ==================================================
  // NORMALIZE BACKEND DATA
  // ==================================================

  const configurationId =
    item._id ||
    item.id;

  const components =
    Array.isArray(
      item.components
    )
      ? item.components
      : [];

  const totalPrice =
    Number(
      item.totalPrice ||
        components.reduce(
          (sum, component) =>
            sum +
            Number(
              component.priceAtQuotation ||
                component.price ||
                0
            ),
          0
        )
    );

  const createdBy =
    typeof item.createdBy ===
    "object"
      ? item.createdBy?.name ||
        item.createdBy?.email ||
        "System Admin"
      : item.createdBy ||
        "System Admin";

  // ==================================================
  // PAGE
  // ==================================================

  return (
    <Box>

      {/* BACK */}

      <Button
        startIcon={
          <ArrowBackIcon />
        }
        onClick={() =>
          navigate(
            "/configurations"
          )
        }
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      {/* DETAILS */}

      <Card
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >

        {/* NAME */}

        <Typography variant="h4">
          {item.name}
        </Typography>

        {/* ID */}

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Configuration ID:{" "}
          {configurationId}
        </Typography>

        {/* CREATED */}

        <Typography
          color="text.secondary"
        >
          Created:{" "}
          {item.createdAt
            ? formatDate(
                item.createdAt
              )
            : "-"}
          {" · "}
          By: {createdBy}
        </Typography>

        <Divider
          sx={{ my: 3 }}
        />

        {/* COMPONENTS */}

        <Typography
          variant="h6"
          sx={{ mb: 1 }}
        >
          Selected Components
        </Typography>

        {components.length ===
        0 ? (
          <Alert severity="info">
            No components found for
            this configuration.
          </Alert>
        ) : (
          components.map(
            (component, index) => {

              const componentId =
                component.componentId ||
                component._id ||
                component.id ||
                index;

              const price =
                Number(
                  component.priceAtQuotation ||
                    component.price ||
                    0
                );

              return (
                <Box
                  key={
                    String(
                      componentId
                    )
                  }
                  sx={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    gap: 2,
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
                        component.category ||
                        "Component"
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {
                        component.name ||
                        "Unknown component"
                      }
                    </Typography>

                  </Box>

                  <Typography
                    fontWeight={600}
                  >
                    {formatCurrency(
                      price
                    )}
                  </Typography>

                </Box>
              );
            }
          )
        )}

        <Divider
          sx={{ my: 2 }}
        />

        {/* TOTAL */}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >

          <Typography variant="h6">
            Total
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            fontWeight={700}
          >
            {formatCurrency(
              totalPrice
            )}
          </Typography>

        </Box>

      </Card>

    </Box>
  );
}