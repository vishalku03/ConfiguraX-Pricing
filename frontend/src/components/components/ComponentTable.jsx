import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import EditIcon
  from "@mui/icons-material/Edit";

import BlockIcon
  from "@mui/icons-material/Block";

import RestoreIcon
  from "@mui/icons-material/Restore";

import {
  formatCurrency
} from "../../utils/formatters";

import ComponentStatusChip
  from "./ComponentStatusChip";

import EmptyState
  from "../common/EmptyState";

export default function ComponentTable({
  components = [],
  onEdit,
  onDeactivate,
  onActivate
}) {
  if (!components.length) {

    return (
      <Card>
        <EmptyState
          title="No components found"
          description="No components match your current filters."
        />
      </Card>
    );
  }

  return (
    <Card>

      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto"
        }}
      >

        <Table
          sx={{
            minWidth: 850
          }}
        >

          <TableHead>

            <TableRow>

              <TableCell>
                Component
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

              <TableCell
                align="right"
              >
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {components.map(
              (component) => (

                <TableRow
                  key={component.id}
                  hover
                >

                  

                  <TableCell>

                    <Typography
                      fontWeight={600}
                    >
                      {component.name}
                    </Typography>

                    {component.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: 350,
                          mt: 0.5
                        }}
                      >
                        {component.description}
                      </Typography>
                    )}

                  </TableCell>

                  

                  <TableCell>
                    {component.category}
                  </TableCell>

                  

                  <TableCell>

                    <Typography
                      fontWeight={600}
                    >
                      {formatCurrency(
                        component.price
                      )}
                    </Typography>

                  </TableCell>

                 

                  <TableCell>

                    <ComponentStatusChip
                      isActive={
                        component.isActive
                      }
                    />

                  </TableCell>

                  

                  <TableCell
                    align="right"
                  >

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          "flex-end",
                        gap: 1
                      }}
                    >

                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={
                          <EditIcon />
                        }
                        onClick={() =>
                          onEdit?.(
                            component
                          )
                        }
                      >
                        Edit
                      </Button>

                      {component.isActive ? (

                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          startIcon={
                            <BlockIcon />
                          }
                          onClick={() =>
                            onDeactivate?.(
                              component
                            )
                          }
                        >
                          Deactivate
                        </Button>

                      ) : (

                        <Button
                          size="small"
                          color="success"
                          variant="outlined"
                          startIcon={
                            <RestoreIcon />
                          }
                          onClick={() =>
                            onActivate?.(
                              component
                            )
                          }
                        >
                          Activate
                        </Button>

                      )}

                    </Box>

                  </TableCell>

                </TableRow>

              )
            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Card>
  );
}