
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
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  useSnackbar,
} from "notistack";

import {
  activateComponent,
  deactivateComponent,
  deleteComponent,
  getComponents,
  getComponentPriceHistory,
} from "../../services/componentService";

import {
  formatCurrency,
} from "../../utils/formatters";

import {
  COMPONENT_CATEGORIES,
} from "../../utils/configuration";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";

export default function ComponentsPage() {
  const navigate = useNavigate();

  const {
    enqueueSnackbar,
  } = useSnackbar();

  

  const [items, setItems] =
    useState([]);


  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(10);

  const [totalPages, setTotalPages] =
    useState(1);


  const [target, setTarget] =
    useState(null);

  const [actionType, setActionType] =
    useState(null);

  

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [historyLoading, setHistoryLoading] =
    useState(false);

  const [history, setHistory] =
    useState([]);

  const [historyComponent, setHistoryComponent] =
    useState(null);

  

  const loadComponents =
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

        if (category) {
          params.category =
            category;
        }

        const response =
          await getComponents(
            params
          );

        console.log(
          "GET /components:",
          response
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
          "Failed to load components:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load components."
        );
      } finally {
        setLoading(false);
      }
    };

  

  useEffect(() => {
    const timer =
      setTimeout(() => {
        loadComponents();
      }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [
    search,
    category,
    page,
  ]);

  

  const handleSearchChange = (
    event
  ) => {
    setSearch(
      event.target.value
    );

    setPage(1);
  };

  

  const handleCategoryChange = (
    event
  ) => {
    setCategory(
      event.target.value
    );

    setPage(1);
  };

  
  const handleStatusChange =
    async () => {
      if (!target) {
        return;
      }

      try {
        setLoading(true);

        if (
          actionType ===
          "deactivate"
        ) {
          await deactivateComponent(
            target._id
          );

          enqueueSnackbar(
            "Component deactivated successfully.",
            {
              variant:
                "success",
            }
          );
        }

        if (
          actionType ===
          "activate"
        ) {
          await activateComponent(
            target._id
          );

          enqueueSnackbar(
            "Component activated successfully.",
            {
              variant:
                "success",
            }
          );
        }

        setTarget(null);
        setActionType(null);

        await loadComponents();
      } catch (err) {
        console.error(
          "Component status update failed:",
          err
        );

        enqueueSnackbar(
          err?.response?.data?.message ||
            "Unable to update component status.",
          {
            variant:
              "error",
          }
        );
      } finally {
        setLoading(false);
      }
    };

  

  const handleDelete =
    async () => {
      if (!target) {
        return;
      }

      try {
        setLoading(true);

        await deleteComponent(
          target._id
        );

        enqueueSnackbar(
          "Component deleted successfully.",
          {
            variant:
              "success",
          }
        );

        setTarget(null);
        setActionType(null);

        await loadComponents();
      } catch (err) {
        console.error(
          "Component delete failed:",
          err
        );

        enqueueSnackbar(
          err?.response?.data?.message ||
            "Unable to delete component.",
          {
            variant:
              "error",
          }
        );
      } finally {
        setLoading(false);
      }
    };

  

  const handleHistory =
    async (component) => {
      try {
        setHistoryComponent(
          component
        );

        setHistoryOpen(true);

        setHistoryLoading(
          true
        );

        setHistory([]);

        const response =
          await getComponentPriceHistory(
            component._id
          );

        const historyItems =
          Array.isArray(
            response?.items
          )
            ? response.items
            : Array.isArray(
                response?.data
              )
            ? response.data
            : Array.isArray(
                response?.history
              )
            ? response.history
            : [];

        setHistory(
          historyItems
        );
      } catch (err) {
        console.error(
          "Price history error:",
          err
        );

        enqueueSnackbar(
          err?.response?.data?.message ||
            "Unable to load price history.",
          {
            variant:
              "error",
          }
        );
      } finally {
        setHistoryLoading(
          false
        );
      }
    };

 

  const closeHistory = () => {
    setHistoryOpen(false);
    setHistoryComponent(null);
    setHistory([]);
  };

  

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "-";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }

    return date.toLocaleString(
      "en-IN"
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

      {/* Page Header */}

      <PageHeader
        title="Components"
        subtitle="Manage processor, RAM, storage, GPU and other laptop components."
        actionLabel="Add Component"
        onAction={() =>
          navigate(
            "/components/new"
          )
        }
      />

      {/* Error */}

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

      {/* Search + Filter */}

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
            flexWrap: "wrap",
          }}
        >

          <TextField
            label="Search"
            value={search}
            onChange={
              handleSearchChange
            }
            placeholder="Search component..."
            sx={{
              minWidth: 250,
            }}
          />

          <FormControl
            sx={{
              minWidth: 220,
            }}
          >
            <InputLabel>
              Category
            </InputLabel>

            <Select
              label="Category"
              value={category}
              onChange={
                handleCategoryChange
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              {COMPONENT_CATEGORIES.map(
                (
                  categoryName
                ) => (
                  <MenuItem
                    key={
                      categoryName
                    }
                    value={
                      categoryName
                    }
                  >
                    {
                      categoryName
                    }
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {loading && (
            <Box
              sx={{
                display: "flex",
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

      {/* Components Table */}

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
                  Name
                </TableCell>

                <TableCell>
                  Category
                </TableCell>

                <TableCell>
                  Price
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell align="right">
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {items.map(
                (item) => (
                  <TableRow
                    key={
                      item._id
                    }
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

                    {/* Category */}

                    <TableCell>
                      {
                        item.category
                      }
                    </TableCell>

                    {/* Price */}

                    <TableCell>
                      {formatCurrency(
                        item.price
                      )}
                    </TableCell>

                    {/* Status */}

                    <TableCell>

                      <Chip
                        size="small"
                        label={
                          item.isActive
                            ? "Active"
                            : "Inactive"
                        }
                        color={
                          item.isActive
                            ? "success"
                            : "default"
                        }
                      />

                    </TableCell>

                    {/* Actions */}

                    <TableCell align="right">

                      {/* Edit */}

                      <Button
                        size="small"
                        startIcon={
                          <EditIcon />
                        }
                        onClick={() =>
                          navigate(
                            `/components/${item._id}/edit`
                          )
                        }
                      >
                        Edit
                      </Button>

                      {/* Price History */}

                      <Tooltip
                        title="Price history"
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleHistory(
                              item
                            )
                          }
                        >
                          <HistoryIcon />
                        </IconButton>
                      </Tooltip>

                      {/* Activate */}

                      {!item.isActive && (
                        <Tooltip
                          title="Activate"
                        >
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => {
                              setTarget(
                                item
                              );

                              setActionType(
                                "activate"
                              );
                            }}
                          >
                            <PowerSettingsNewIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      {/* Deactivate */}

                      {item.isActive && (
                        <Button
                          size="small"
                          color="warning"
                          onClick={() => {
                            setTarget(
                              item
                            );

                            setActionType(
                              "deactivate"
                            );
                          }}
                        >
                          Deactivate
                        </Button>
                      )}

                      {/* Delete */}

                      <Tooltip
                        title="Delete component"
                      >
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setTarget(
                              item
                            );

                            setActionType(
                              "delete"
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                    </TableCell>

                  </TableRow>
                )
              )}

            </TableBody>

          </Table>
        ) : (
          <EmptyState
            title="No components found"
            description="Try changing your search or category filter."
          />
        )}

      </Card>

      {/* Pagination */}

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "center",
            mt: 3,
            mb: 3,
          }}
        >
          <Pagination
            count={
              totalPages
            }
            page={page}
            onChange={(
              _event,
              value
            ) =>
              setPage(
                value
              )
            }
            color="primary"
          />
        </Box>
      )}

      {/* Confirmation Dialog */}

      <ConfirmDialog
        open={Boolean(
          target
        )}
        title={
          actionType ===
          "activate"
            ? "Activate component?"
            : actionType ===
              "deactivate"
            ? "Deactivate component?"
            : "Delete component?"
        }
        description={
          target
            ? actionType ===
              "activate"
              ? `Activate "${target.name}"?`
              : actionType ===
                "deactivate"
              ? `Deactivate "${target.name}"? Historical configurations will keep their saved prices.`
              : `Delete "${target.name}"? This action cannot be undone.`
            : ""
        }
        onClose={() => {
          setTarget(null);
          setActionType(null);
        }}
        onConfirm={
          actionType ===
          "delete"
            ? handleDelete
            : handleStatusChange
        }
      />

      {/* Price History */}

      {historyOpen && (
        <Card
          sx={{
            position:
              "fixed",
            inset: 0,
            zIndex: 1400,
            m: {
              xs: 2,
              sm: 5,
            },
            p: 3,
            overflowY:
              "auto",
            boxShadow: 10,
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              mb: 3,
              gap: 2,
            }}
          >

            <Box>

              <Typography
                variant="h6"
              >
                Price History
              </Typography>

              <Typography
                color="text.secondary"
              >
                {
                  historyComponent?.name
                }
              </Typography>

            </Box>

            <Button
              variant="outlined"
              onClick={
                closeHistory
              }
            >
              Close
            </Button>

          </Box>

          {historyLoading ? (
            <Box
              sx={{
                minHeight: 200,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : history.length ? (
            <Table>

              <TableHead>

                <TableRow>

                  <TableCell>
                    Old Price
                  </TableCell>

                  <TableCell>
                    New Price
                  </TableCell>

                  <TableCell>
                    Changed By
                  </TableCell>

                  <TableCell>
                    Date
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {history.map(
                  (
                    record,
                    index
                  ) => (
                    <TableRow
                      key={
                        record._id ||
                        index
                      }
                    >

                      <TableCell>
                        {formatCurrency(
                          Number(
                            record.oldPrice ??
                              record.previousPrice ??
                              0
                          )
                        )}
                      </TableCell>

                      <TableCell>
                        {formatCurrency(
                          Number(
                            record.newPrice ??
                              record.price ??
                              0
                          )
                        )}
                      </TableCell>

                      <TableCell>
                        {
                          record.changedBy
                            ?.name ||
                            record.updatedBy
                              ?.name ||
                            "System"
                        }
                      </TableCell>

                      <TableCell>
                        {formatDate(
                          record.createdAt ||
                            record.updatedAt
                        )}
                      </TableCell>

                    </TableRow>
                  )
                )}

              </TableBody>

            </Table>
          ) : (
            <Typography
              color="text.secondary"
            >
              No price history available.
            </Typography>
          )}

        </Card>
      )}

    </Box>
  );
}