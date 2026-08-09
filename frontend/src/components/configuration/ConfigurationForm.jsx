import {
  useMemo,
  useState
} from "react";

import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel
} from "@mui/material";

import {
  useSnackbar
} from "notistack";

import {
  COMPONENT_CATEGORIES,
  calculateTotal
} from "../../utils/configuration";

import {
  formatCurrency
} from "../../utils/formatters";

const fieldMap = {

  Processor: "processor",

  RAM: "ram",

  Storage: "storage",

  "Graphics Card": "gpu",

  Display: "display",

  Battery: "battery",

  Keyboard: "keyboard",

  "Operating System": "os"

};

export default function ConfigurationForm({
  availableComponents,
  onSubmit
}) {

  const [name, setName] =
    useState("");

  const [selected, setSelected] =
    useState({});

  const {
    enqueueSnackbar
  } = useSnackbar();

  const options = useMemo(
    () =>
      Object.fromEntries(
        COMPONENT_CATEGORIES.map(
          (category) => [
            category,
            availableComponents.filter(
              (item) =>
                item.category ===
                category
            )
          ]
        )
      ),

    [availableComponents]
  );

  const selectedItems =
    COMPONENT_CATEGORIES
      .map((category) => {

        const id =
          selected[
            fieldMap[category]
          ];

        return availableComponents.find(
          (item) =>
            item.id === id
        );

      })
      .filter(Boolean);

  const total =
    calculateTotal(
      selectedItems
    );

  const submit = () => {

    const missing =
      COMPONENT_CATEGORIES.filter(
        (category) =>
          !selected[
            fieldMap[category]
          ]
      );

    if (!name.trim()) {

      enqueueSnackbar(
        "Configuration name is required",
        {
          variant: "error"
        }
      );

      return;
    }

    if (missing.length) {

      enqueueSnackbar(
        `Select: ${missing.join(", ")}`,
        {
          variant: "error"
        }
      );

      return;
    }


    onSubmit({

      name,

      components:
        selectedItems.map(
          (item) => ({

            componentId:
              item.id,

            category:
              item.category,

            name:
              item.name,

            priceAtQuotation:
              item.price

          })
        )

    });
  };

  return (
    <div className="page-container">

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Create Laptop Configuration
      </Typography>

      <Grid
        container
        spacing={3}
      >

        <Grid
          size={{
            xs: 12,
            md: 8
          }}
        >

          <Card
            sx={{
              p: {
                xs: 2,
                md: 4
              }
            }}
          >

            <TextField
              fullWidth
              label="Configuration Name"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              sx={{ mb: 3 }}
            />

            <Grid
              container
              spacing={2}
            >

              {COMPONENT_CATEGORIES.map(
                (category) => {

                  const key =
                    fieldMap[category];

                  return (
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6
                      }}
                      key={category}
                    >

                      <FormControl
                        fullWidth
                      >

                        <InputLabel>
                          {category}
                        </InputLabel>

                        <Select
                          label={category}
                          value={
                            selected[
                              key
                            ] || ""
                          }
                          onChange={(event) =>
                            setSelected(
                              (previous) => ({
                                ...previous,
                                [key]:
                                  event
                                    .target
                                    .value
                              })
                            )
                          }
                        >

                          <MenuItem value="">
                            Select{" "}
                            {category}
                          </MenuItem>

                          {options[
                            category
                          ].map(
                            (item) => (

                              <MenuItem
                                key={item.id}
                                value={item.id}
                              >
                                {item.name}
                                {" — "}
                                {formatCurrency(
                                  item.price
                                )}
                              </MenuItem>

                            )
                          )}

                        </Select>

                      </FormControl>

                    </Grid>
                  );

                }
              )}

            </Grid>

          </Card>

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >

          <Card
            sx={{
              p: 3,

              position: {
                md: "sticky"
              },

              top: 90
            }}
          >

            <Typography variant="h6">
              Price Breakdown
            </Typography>

            <Divider
              sx={{ my: 2 }}
            />

            {selectedItems.map(
              (item) => (

                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    gap: 2,
                    py: 1
                  }}
                >

                  <Typography
                    variant="body2"
                  >
                    {item.category}
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight={600}
                  >
                    {formatCurrency(
                      item.price
                    )}
                  </Typography>

                </Box>

              )
            )}

            <Divider
              sx={{ my: 2 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between"
              }}
            >

              <Typography
                fontWeight={700}
              >
                Total
              </Typography>

              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
              >
                {formatCurrency(total)}
              </Typography>

            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={submit}
            >
              Save Configuration
            </Button>

          </Card>

        </Grid>

      </Grid>

    </div>
  );
}