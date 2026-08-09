import {
  Box,
  Divider,
  Typography
} from "@mui/material";

import {
  formatCurrency
} from "../../utils/formatters";

export default function PriceBreakdown({
  items = [],
  total = 0
}) {
  return (
    <Box>

      <Typography
        variant="h6"
        fontWeight={700}
      >
        Price Breakdown
      </Typography>

      <Divider sx={{ my: 2 }} />

      {items.map((item) => (
        <Box
          key={
            `${item.category}-${
              item.componentId ||
              item.id
            }`
          }
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            gap: 2,
            py: 1
          }}
        >

          <Typography variant="body2">
            {item.category}
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
          >
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

        <Typography fontWeight={700}>
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

    </Box>
  );
}