import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination as MuiPagination,
  Select,
  Typography
} from "@mui/material";

export default function Pagination({
  page = 1,
  totalPages = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50]
}) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",
        gap: 2,
        flexWrap: "wrap",
        px: 2,
        py: 2
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {totalItems}{" "}
        {totalItems === 1
          ? "record"
          : "records"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap"
        }}
      >

        <FormControl
          size="small"
          sx={{
            minWidth: 110
          }}
        >
          <InputLabel>
            Per page
          </InputLabel>

          <Select
            label="Per page"
            value={pageSize}
            onChange={(event) =>
              onPageSizeChange(
                Number(
                  event.target.value
                )
              )
            }
          >
            {pageSizeOptions.map(
              (size) => (
                <MenuItem
                  key={size}
                  value={size}
                >
                  {size}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <MuiPagination
          count={Math.max(
            totalPages,
            1
          )}
          page={page}
          onChange={(_, value) =>
            onPageChange(value)
          }
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />

      </Box>
    </Box>
  );
}