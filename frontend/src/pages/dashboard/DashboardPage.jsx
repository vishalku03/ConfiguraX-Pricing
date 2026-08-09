import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import MemoryIcon from "@mui/icons-material/Memory";
import LaptopIcon from "@mui/icons-material/Laptop";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

import { getDashboardStats } from "../../services/dashboardService";

import { formatCurrency } from "../../utils/formatters";

export default function DashboardPage() {
  const navigate = useNavigate();

 

  const [dashboard, setDashboard] = useState({
    components: 0,
    activeComponents: 0,
    configurations: 0,
    quotedValue: 0,
    recentConfigurations: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getDashboardStats();

        if (!mounted) {
          return;
        }

       
        setDashboard({
          components: Number(
            response?.components || 0
          ),

          activeComponents: Number(
            response?.activeComponents || 0
          ),

          configurations: Number(
            response?.configurations || 0
          ),

          quotedValue: Number(
            response?.quotedValue || 0
          ),

          recentConfigurations:
            Array.isArray(
              response?.recentConfigurations
            )
              ? response.recentConfigurations
              : [],
        });
      } catch (err) {
        console.error(
          "Dashboard loading error:",
          err
        );

        if (!mounted) {
          return;
        }

        setError(
          err?.response?.data?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  

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
     

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4">
            Dashboard
          </Typography>

          <Typography
            color="text.secondary"
          >
            Overview of your pricing system.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate(
              "/configurations/new"
            )
          }
        >
          New Configuration
        </Button>
      </Box>

     
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

     

      <Grid
        container
        spacing={2}
      >
        {/* Components */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <MemoryIcon color="primary" />

              <Typography
                variant="h4"
                sx={{ mt: 1 }}
              >
                {dashboard.components}
              </Typography>

              <Typography
                color="text.secondary"
              >
                Components
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {
                  dashboard.activeComponents
                }{" "}
                active
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Configurations */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <LaptopIcon color="primary" />

              <Typography
                variant="h4"
                sx={{ mt: 1 }}
              >
                {
                  dashboard.configurations
                }
              </Typography>

              <Typography
                color="text.secondary"
              >
                Configurations
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quoted Value */}
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="overline">
                Quoted Value
              </Typography>

              <Typography variant="h4">
                {formatCurrency(
                  dashboard.quotedValue
                )}
              </Typography>

              <Typography
                color="text.secondary"
              >
                Saved quotation totals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

     

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Recent Configurations
          </Typography>

          {dashboard.recentConfigurations
            .slice(0, 5)
            .map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: 2,
                  py: 1.5,
                  borderBottom:
                    "1px solid",
                  borderColor:
                    "divider",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/configurations/${item.id}`
                  )
                }
              >
                <Box>
                  <Typography>
                    {item.name}
                  </Typography>

                  {item.createdBy?.name && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Created by{" "}
                      {
                        item.createdBy.name
                      }
                    </Typography>
                  )}
                </Box>

                <Typography
                  fontWeight={700}
                >
                  {formatCurrency(
                    item.totalPrice
                  )}
                </Typography>
              </Box>
            ))}

          {!dashboard
            .recentConfigurations
            .length && (
            <Typography
              color="text.secondary"
              sx={{ py: 2 }}
            >
              No saved configurations yet.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}