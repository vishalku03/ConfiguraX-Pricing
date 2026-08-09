import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useSnackbar } from "notistack";

import {
  getConfigurations,
} from "../../services/configurationService";

import {
  formatCurrency,
  formatDate,
} from "../../utils/formatters";

import EmptyState from "../../components/common/EmptyState";

export default function ConfigurationsPage() {
  const navigate =
    useNavigate();

  const { enqueueSnackbar } =
    useSnackbar();


  const [items, setItems] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [min, setMin] =
    useState("");

  const [max, setMax] =
    useState("");


  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(10);

  const [totalPages, setTotalPages] =
    useState(1);

  

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const loadConfigurations =
    async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit,
        };

        if (search.trim()) {
          params.search =
            search.trim();
        }

        if (min !== "") {
          params.minPrice =
            Number(min);
        }

        if (max !== "") {
          params.maxPrice =
            Number(max);
        }

        const response =
          await getConfigurations(
            params
          );

       

        const backendItems =
          Array.isArray(
            response?.items
          )
            ? response.items
            : Array.isArray(
                response?.data
              )
            ? response.data
            : [];

        setItems(
          backendItems
        );

        const pagination =
          response?.pagination ||
          {};

        setTotalPages(
          Number(
            pagination.totalPages ||
              1
          )
        );
      } catch (err) {
        console.error(
          "Failed to load configurations:",
          err
        );

        const message =
          err?.response?.data
            ?.message ||
          "Unable to load configurations.";

        setError(message);

        enqueueSnackbar(
          message,
          {
            variant: "error",
          }
        );
      } finally {
        setLoading(false);
      }
    };

  
  useEffect(() => {
    const timer =
      setTimeout(() => {
        loadConfigurations();
      }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [
    search,
    min,
    max,
    page,
  ]);

  const handleSearch =
    (event) => {
      setSearch(
        event.target.value
      );

      setPage(1);
    };

  

  const handleMin =
    (event) => {
      setMin(
        event.target.value
      );

      setPage(1);
    };

  const handleMax =
    (event) => {
      setMax(
        event.target.value
      );

      setPage(1);
    };


  const getCreatedByName =
    (createdBy) => {
      if (!createdBy) {
        return "-";
      }

      if (
        typeof createdBy ===
        "string"
      ) {
        return createdBy;
      }

      return (
        createdBy.name ||
        createdBy.email ||
        "-"
      );
    };

  

  if (
    loading &&
    items.length === 0
  ) {
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

 

  return (
    <Box>
     
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
          gap: 2,
          flexWrap:
            "wrap",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
          >
            Configurations
          </Typography>

          <Typography
            color="text.secondary"
          >
            Search and review saved quotations.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={
            <AddIcon />
          }
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
          sx={{
            mb: 2,
          }}
        >
          {error}
        </Alert>
      )}

     

      <Card
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap:
              "wrap",
          }}
        >
          <TextField
            label="Search"
            value={search}
            onChange={
              handleSearch
            }
            placeholder="Search configuration..."
          />

          <TextField
            label="Min Price"
            type="number"
            value={min}
            onChange={
              handleMin
            }
            inputProps={{
              min: 0,
            }}
          />

          <TextField
            label="Max Price"
            type="number"
            value={max}
            onChange={
              handleMax
            }
            inputProps={{
              min: 0,
            }}
          />

          {loading && (
            <Box
              sx={{
                display:
                  "flex",
                alignItems:
                  "center",
              }}
            >
              <CircularProgress
                size={24}
              />
            </Box>
          )}
        </Box>
      </Card>

     

      <Card
        sx={{
          overflowX:
            "auto",
        }}
      >
        {items.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Configuration
                </TableCell>

                <TableCell>
                  Total
                </TableCell>

                <TableCell>
                  Created
                </TableCell>

                <TableCell>
                  Created By
                </TableCell>

                <TableCell align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map(
                (item) => {
                  const id =
                    item._id ||
                    item.id;

                  return (
                    <TableRow
                      key={id}
                      hover
                    >
                      {/* Name */}
                      <TableCell>
                        <Typography
                          fontWeight={
                            600
                          }
                        >
                          {
                            item.name
                          }
                        </Typography>
                      </TableCell>

                      {/* Total */}
                      <TableCell>
                        {formatCurrency(
                          Number(
                            item.totalPrice ||
                              0
                          )
                        )}
                      </TableCell>

                      {/* Created */}
                      <TableCell>
                        {formatDate(
                          item.createdAt
                        )}
                      </TableCell>

                      {/* Created By */}
                      <TableCell>
                        {getCreatedByName(
                          item.createdBy
                        )}
                      </TableCell>

                      {/* View */}
                      <TableCell align="right">
                        <Button
                          onClick={() =>
                            navigate(
                              `/configurations/${id}`
                            )
                          }
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title="No configurations found"
            description="Create a configuration or change the filters."
          />
        )}
      </Card>

     

      {totalPages > 1 && (
        <Box
          sx={{
            display:
              "flex",
            justifyContent:
              "center",
            mt: 3,
            mb: 3,
          }}
        >
          <Button
            disabled={
              page <= 1
            }
            onClick={() =>
              setPage(
                (current) =>
                  current - 1
              )
            }
          >
            Previous
          </Button>

          <Typography
            sx={{
              display:
                "flex",
              alignItems:
                "center",
              px: 2,
            }}
          >
            Page {page} of{" "}
            {
              totalPages
            }
          </Typography>

          <Button
            disabled={
              page >=
              totalPages
            }
            onClick={() =>
              setPage(
                (current) =>
                  current + 1
              )
            }
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}