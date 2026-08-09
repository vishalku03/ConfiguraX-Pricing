import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from "@mui/material";

import {
  formatCurrency
} from "../../utils/formatters";

export default function ConfigurationPreview({
  name,
  items = [],
  total = 0,
  onEdit,
  onConfirm,
  loading = false
}) {
  return (
    <Card>

      <CardContent
        sx={{
          p: {
            xs: 2,
            md: 3
          }
        }}
      >

        <Typography variant="h5">
          {name}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Review the quotation
          before saving.
        </Typography>

        <Divider sx={{ my: 2 }} />

        {items.map((item) => (
          <Box
            key={
              item.id ||
              item.componentId
            }
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              gap: 2,
              py: 1.25
            }}
          >

            <Box>

              <Typography
                fontWeight={600}
              >
                {item.category}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {item.name}
              </Typography>

            </Box>

            <Typography fontWeight={600}>
              {formatCurrency(
                item.priceAtQuotation ??
                  item.price
              )}
            </Typography>

          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between"
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
            {formatCurrency(total)}
          </Typography>

        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: 1.5,
            mt: 3
          }}
        >

          <Button
            variant="outlined"
            onClick={onEdit}
            disabled={loading}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Confirm & Save"}
          </Button>

        </Box>

      </CardContent>

    </Card>
  );
}