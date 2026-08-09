import {
  Box,
  Divider,
  Typography
} from "@mui/material";

import {
  formatCurrency
} from "../../utils/formatters";

export default function ConfigurationSummary({
  name,
  selectedItems = [],
  total = 0
}) {
  return (
    <Box>

      <Typography
        variant="h6"
        fontWeight={700}
      >
        {name || "New Configuration"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {selectedItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            py: 1
          }}
        >
          <Box>

            <Typography
              variant="body2"
              fontWeight={600}
            >
              {item.category}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {item.name}
            </Typography>

          </Box>

          <Typography
            variant="body2"
            fontWeight={600}
          >
            {formatCurrency(
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